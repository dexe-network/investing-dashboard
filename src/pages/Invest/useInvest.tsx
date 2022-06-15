import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { BigNumber } from "ethers"
import { usePoolContract, useTraderPool } from "hooks/usePool"
import Icon from "components/Icon"
import {
  calcSlippage,
  cutDecimalPlaces,
  getAllowance,
  parseTransactionError,
  isTxMined,
  formatBigNumber,
  getMaxLPInvestAmount,
} from "utils"
import { useWeb3React } from "@web3-react/core"
import { useERC20, usePriceFeedContract } from "hooks/useContract"
import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { getDividedBalance } from "utils/formulas"
import { usePoolPrice } from "state/pools/hooks"
import { SwapDirection } from "constants/types"
import useAlert, { AlertType } from "hooks/useAlert"
import { ExchangeForm } from "constants/interfaces_v2"

interface UseInvestProps {
  poolAddress: string | undefined
  initialDirection: SwapDirection
}

interface UseInvestResponse {
  error: string
  isWalletPrompting: boolean
  isSlippageOpen: boolean
  allowance?: BigNumber
  slippage: string
  direction: SwapDirection
  updateAllowance: () => void
  setWalletPrompting: Dispatch<SetStateAction<boolean>>
  setSlippageOpen: Dispatch<SetStateAction<boolean>>
  setSlippage: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string>>
  handleDirectionChange: () => void
  handlePercentageChange: (percent: any) => void
  handleFromChange: (v: string) => void
  handleSubmit: () => void
}

// useInvest hook posibilities
// @param poolAddress: string
// @param direction: deposit | withdraw
const useInvest = ({
  poolAddress,
  initialDirection,
}: UseInvestProps): [ExchangeForm, UseInvestResponse] => {
  const { account, library } = useWeb3React()
  const traderPool = useTraderPool(poolAddress)
  const [leverageInfo, poolInfo] = usePoolContract(poolAddress)
  const addTransaction = useTransactionAdder()
  const [baseToken, baseTokenData, baseTokenBalance, updateBaseToken] =
    useERC20(poolInfo?.parameters.baseToken)
  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )
  const priceFeed = usePriceFeedContract()
  const [showAlert, hideAlert] = useAlert()

  const poolPrice = usePoolPrice(poolAddress)
  const [isAdmin, setIsAdmin] = useState(false)
  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
  const [slippage, setSlippage] = useState("0.10")
  const [direction, setDirection] = useState<SwapDirection>(initialDirection)
  const [baseTokenPrice, setBasePrice] = useState(BigNumber.from("0"))
  const [lpTokenPrice, setLpPrice] = useState(BigNumber.from("0"))
  const [lpTokenBalance, setLPBalance] = useState(BigNumber.from("0"))
  const [allowance, setAllowance] = useState<BigNumber | undefined>()
  const [isWalletPrompting, setWalletPrompting] = useState(false)
  const [isSlippageOpen, setSlippageOpen] = useState(false)
  const [positions, setPositions] = useState<string[]>([])
  const [error, setError] = useState("")

  const poolIcon = (
    <Icon
      m="0"
      size={27}
      address={poolAddress}
      source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
    />
  )

  const form = {
    deposit: {
      from: {
        address: poolInfo?.parameters.baseToken || "",
        amount: fromAmount,
        balance: baseTokenBalance,
        symbol: baseTokenData?.symbol,
        decimals: baseTokenData?.decimals,
        price: baseTokenPrice,
      },
      to: {
        address: "",
        amount: toAmount,
        balance: lpTokenBalance,
        symbol: poolInfo?.ticker,
        decimals: 18,
        icon: poolIcon,
        price: poolPrice.eq("0") ? baseTokenPrice : lpTokenPrice,
      },
    },
    withdraw: {
      from: {
        address: "",
        amount: fromAmount,
        balance: lpTokenBalance,
        symbol: poolInfo?.ticker,
        decimals: 18,
        icon: poolIcon,
        price: poolPrice.eq("0") ? baseTokenPrice : lpTokenPrice,
      },
      to: {
        address: poolInfo?.parameters.baseToken || "",
        amount: toAmount,
        balance: baseTokenBalance,
        symbol: baseTokenData?.symbol,
        decimals: baseTokenData?.decimals,
        price: baseTokenPrice,
      },
    },
  }

  const formWithDirection = form[direction]

  const handleValidate = useCallback(() => {
    if (!poolInfo || !baseTokenData || !leverageInfo) return false

    const amountIn = BigNumber.from(fromAmount)
    const amountOut = BigNumber.from(toAmount)

    // check if min invest amount valid
    if (
      direction === "deposit" &&
      amountIn.lt(poolInfo.parameters.minimalInvestment)
    ) {
      showAlert({
        type: AlertType.warning,
        content: `Minimum investment amount is ${formatBigNumber(
          poolInfo.parameters.minimalInvestment
        )} ${baseTokenData.symbol}, please increase your investment amount.`,
      })
      return false
    }

    // check if trader and has positions (close positions before divest)
    if (direction === "withdraw" && isAdmin && !!positions.length) {
      showAlert({
        type: AlertType.warning,
        content:
          "To withdraw funds from the pool, you must close all positions",
      })
      return false
    }
    // check if leverage enought to deposit
    if (
      direction === "deposit" &&
      !isAdmin &&
      amountIn.gt(leverageInfo.freeLeverageBase)
    ) {
      showAlert({
        type: AlertType.warning,
        content: (
          <>
            {`Amount of invested tokens exceeds trader leverage. Maximum invest amount is:`}
            <br />
            {`${formatBigNumber(leverageInfo.freeLeverageBase)} ${
              baseTokenData.symbol
            }`}
          </>
        ),
      })
      return false
    }
    // check if emission is enought to deposit
    if (
      direction === "deposit" &&
      poolInfo.parameters.totalLPEmission.gt("0")
    ) {
      const maxLPInvestAmount = getMaxLPInvestAmount(
        poolInfo.lpSupply,
        poolInfo.parameters.totalLPEmission
      )

      if (maxLPInvestAmount.lt(amountOut)) {
        showAlert({
          type: AlertType.warning,
          content: (
            <>
              {`Amount of received LP tokens exceeds total Emission. Maximum LP amount is:`}
              <br />
              {`${formatBigNumber(maxLPInvestAmount)} ${poolInfo.ticker}`}
            </>
          ),
        })
        return false
      }
    }
    return true
  }, [
    poolInfo,
    baseTokenData,
    leverageInfo,
    fromAmount,
    toAmount,
    direction,
    isAdmin,
    positions,
    showAlert,
  ])

  const fetchAndUpdateAllowance = useCallback(async () => {
    if (!account || !library || !poolAddress || !poolInfo) return

    const allowance = await getAllowance(
      account,
      poolInfo?.parameters.baseToken,
      poolAddress,
      library
    )
    setAllowance(allowance)
  }, [account, library, poolAddress, poolInfo])

  const fetchAndUpdateBalance = useCallback(async () => {
    if (!account || !traderPool) return

    const balance: BigNumber = await traderPool?.balanceOf(account)
    setLPBalance(balance)
  }, [account, traderPool])

  const updateAllowance = useCallback(async () => {
    if (!account || !poolAddress || !baseToken) return

    if (!handleValidate()) return

    try {
      setWalletPrompting(true)
      const amount = BigNumber.from(fromAmount)
      const approveResponse = await baseToken.approve(poolAddress, amount)
      setWalletPrompting(false)

      const receipt = await addTransaction(approveResponse, {
        type: TransactionType.APPROVAL,
        tokenAddress: baseToken.address,
        spender: account,
      })

      if (isTxMined(receipt)) {
        fetchAndUpdateAllowance()
      }
    } catch (e) {
      setWalletPrompting(false)
    }
  }, [
    account,
    poolAddress,
    baseToken,
    fromAmount,
    handleValidate,
    addTransaction,
    fetchAndUpdateAllowance,
  ])

  const updateBasePrice = useCallback(
    async (amount: BigNumber) => {
      if (!priceFeed || !poolInfo) return

      const basePrice = await priceFeed.getNormalizedPriceOutUSD(
        poolInfo?.parameters.baseToken,
        amount.toHexString()
      )
      setBasePrice(basePrice[0])
    },
    [priceFeed, poolInfo]
  )

  const updateLpPrice = useCallback(
    async (amount: BigNumber) => {
      const lpPrice = getDividedBalance(amount, 18, poolPrice.toString())
      setLpPrice(lpPrice)
    },
    [poolPrice]
  )

  const handleFromChange = useCallback(
    (v: string) => {
      if (!poolInfo || !priceFeed || !traderPool) return

      const amount = cutDecimalPlaces(v, formWithDirection.from.decimals, false)
      setFromAmount(amount.toString())

      const getInvestTokens = async () => {
        const tokens = await traderPool.getInvestTokens(amount.toHexString())
        const receivedAmounts = cutDecimalPlaces(tokens.lpAmount)

        setPositions(tokens.positions)
        setToAmount(receivedAmounts.toString())
        updateBasePrice(amount)
        updateLpPrice(receivedAmounts)
      }

      const getDivestTokens = async () => {
        const divest = await traderPool.getDivestAmountsAndCommissions(
          account,
          amount.toHexString()
        )
        setPositions(divest.receptions.positions)
        const receivedAmounts = cutDecimalPlaces(divest.receptions.baseAmount)

        setToAmount(receivedAmounts.toString())
        updateBasePrice(receivedAmounts)
        updateLpPrice(amount)
      }

      if (direction === "deposit") {
        getInvestTokens().catch(console.error)
      } else {
        getDivestTokens().catch(console.error)
      }
    },
    [
      poolInfo,
      priceFeed,
      traderPool,
      formWithDirection,
      direction,
      account,
      updateBasePrice,
      updateLpPrice,
    ]
  )

  const updateFrom = useCallback(() => {
    handleFromChange(fromAmount)
  }, [fromAmount, handleFromChange])

  const handleDirectionChange = useCallback(() => {
    if (direction === "deposit") {
      setDirection("withdraw")
    } else {
      setDirection("deposit")
    }
  }, [direction])

  const handlePercentageChange = useCallback(
    (percent) => {
      if (!baseTokenBalance || !baseTokenData) return

      if (direction === "deposit") {
        const from = getDividedBalance(
          baseTokenBalance,
          baseTokenData?.decimals,
          percent
        )
        handleFromChange(from.toString())
      }

      if (direction === "withdraw") {
        const to = getDividedBalance(lpTokenBalance, 18, percent)
        handleFromChange(to.toString())
      }
    },
    [
      baseTokenBalance,
      baseTokenData,
      direction,
      handleFromChange,
      lpTokenBalance,
    ]
  )

  const runUpdate = useCallback(() => {
    fetchAndUpdateAllowance().catch(console.error)
    fetchAndUpdateBalance().catch(console.error)
    updateBaseToken()
  }, [fetchAndUpdateAllowance, fetchAndUpdateBalance, updateBaseToken])

  const handleDeposit = useCallback(async () => {
    if (!poolAddress || !poolInfo || !traderPool) return

    const amount = BigNumber.from(fromAmount)
    const invest = await traderPool.getInvestTokens(amount.toHexString())

    const sl = 1 - parseFloat(slippage) / 100

    const amountsWithSlippage = invest.receivedAmounts.map((position) =>
      calcSlippage(position, 18, sl)
    )

    const depositResponse = await traderPool.invest(
      amount.toHexString(),
      amountsWithSlippage
    )
    setWalletPrompting(false)

    const receipt = await addTransaction(depositResponse, {
      type: TransactionType.DEPOSIT_LIQUIDITY_STAKING,
      poolAddress: poolAddress,
      currencyId: poolInfo?.parameters.baseToken,
      amount: amount.toHexString(),
    })

    if (isTxMined(receipt)) {
      runUpdate()
    }
  }, [
    fromAmount,
    poolAddress,
    poolInfo,
    slippage,
    traderPool,
    runUpdate,
    addTransaction,
  ])

  const handleWithdraw = useCallback(async () => {
    if (!account || !poolAddress || !poolInfo || !traderPool) return

    const amount = BigNumber.from(fromAmount)
    const divest = await traderPool.getDivestAmountsAndCommissions(
      account,
      amount.toHexString()
    )
    const withdrawResponse = await traderPool.divest(
      amount.toHexString(),
      divest.receptions.receivedAmounts,
      divest.commissions.dexeDexeCommission
    )
    setWalletPrompting(false)
    const receipt = await addTransaction(withdrawResponse, {
      type: TransactionType.WITHDRAW_LIQUIDITY_STAKING,
      poolAddress: poolAddress,
      currencyId: poolInfo?.parameters.baseToken,
      amount: amount.toHexString(),
    })

    if (isTxMined(receipt)) {
      runUpdate()
    }
  }, [
    account,
    poolAddress,
    poolInfo,
    traderPool,
    fromAmount,
    addTransaction,
    runUpdate,
  ])

  const handleSubmit = useCallback(async () => {
    if (!handleValidate()) return

    setWalletPrompting(true)

    const handleError = (error) => {
      setWalletPrompting(false)

      if (!!error && !!error.data && !!error.data.message) {
        setError(error.data.message)
      } else {
        const errorMessage = parseTransactionError(error.toString())
        !!errorMessage && setError(errorMessage)
      }
    }

    if (direction === "deposit") {
      handleDeposit().catch(handleError)
    } else {
      handleWithdraw().catch(handleError)
    }
  }, [direction, handleDeposit, handleValidate, handleWithdraw])

  // fetch allowance on mount
  useEffect(() => {
    fetchAndUpdateAllowance().catch(console.error)
  }, [fetchAndUpdateAllowance])

  // fetch balance on mount
  useEffect(() => {
    fetchAndUpdateBalance().catch(console.error)
  }, [fetchAndUpdateBalance])

  // global updater
  useEffect(() => {
    const interval = setInterval(() => {
      runUpdate()
    }, Number(process.env.REACT_APP_UPDATE_INTERVAL))

    return () => clearInterval(interval)
  }, [runUpdate])

  // update from tokens amount on direction change
  useEffect(() => {
    updateFrom()
  }, [direction])

  // fetch is account have admin permission
  useEffect(() => {
    if (!traderPool || !account) return
    ;(async () => {
      const isAdmin = await traderPool.isTraderAdmin(account)
      setIsAdmin(isAdmin)
    })()
  }, [traderPool, account])

  return [
    formWithDirection,
    {
      error,
      isWalletPrompting,
      isSlippageOpen,
      allowance,
      slippage,
      direction,
      updateAllowance,
      setWalletPrompting,
      setSlippageOpen,
      setSlippage,
      setError,
      handleDirectionChange,
      handlePercentageChange,
      handleFromChange,
      handleSubmit,
    },
  ]
}

export default useInvest
