import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { BigNumber, ethers } from "ethers"
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
import {
  multiplyBignumbers,
  getFreeLiquidity,
  getSumOfBignumbersArray,
  percentageOfBignumbers,
  divideBignumbers,
} from "utils/formulas"
import { usePoolPrice } from "state/pools/hooks"
import { SwapDirection } from "constants/types"
import useAlert, { AlertType } from "hooks/useAlert"
import { ExchangeForm } from "constants/interfaces_v2"
import useGasTracker from "hooks/useGasTracker"

interface UseInvestProps {
  poolAddress: string | undefined
  initialDirection: SwapDirection
}

interface InvestInfo {
  symbol: string
  freeLiquidity: {
    lp: number | BigNumber | undefined
    percent: BigNumber
  }
  availableToInvest: {
    amount: BigNumber | undefined
  }
  minInvestAmount: {
    amount: BigNumber | undefined
  }
  fundPositions: {
    total: BigNumber
    positions: { address: string; amount: BigNumber }[]
  }
}

interface UseInvestResponse {
  info: InvestInfo
  error: string
  isWalletPrompting: boolean
  isSlippageOpen: boolean
  allowance?: BigNumber
  gasPrice: string
  swapPrice: BigNumber
  swapPriceUSD: BigNumber
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
  const [showAlert] = useAlert()
  const [transactionOptions, getGasPrice] = useGasTracker()

  const { priceBase, priceUSD } = usePoolPrice(poolAddress)
  const [gasPrice, setGasPrice] = useState("0")
  const [swapPriceUSD, setSwapPriceUSD] = useState(BigNumber.from("0"))
  const [swapPrice, setSwapPrice] = useState(BigNumber.from("0"))
  const [isAdmin, setIsAdmin] = useState(false)
  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
  const [slippage, setSlippage] = useState("0.10")
  const [direction, setDirection] = useState<SwapDirection>(initialDirection)
  const [baseTokenPrice, setBasePrice] = useState(BigNumber.from("0"))
  const [totalPosition, setTotalPosition] = useState(BigNumber.from("0"))
  const [lpTokenPrice, setLpPrice] = useState(BigNumber.from("0"))
  const [lpTokenBalance, setLPBalance] = useState(BigNumber.from("0"))
  const [allowance, setAllowance] = useState<BigNumber | undefined>()
  const [isWalletPrompting, setWalletPrompting] = useState(false)
  const [isSlippageOpen, setSlippageOpen] = useState(false)
  const [positions, setPositions] = useState<
    InvestInfo["fundPositions"]["positions"]
  >([])
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
        price: priceUSD.eq("0") ? baseTokenPrice : lpTokenPrice,
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
        price: priceUSD.eq("0") ? baseTokenPrice : lpTokenPrice,
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

  const baseSymbol = useMemo(() => {
    if (!baseTokenData) return ""

    return baseTokenData.symbol
  }, [baseTokenData])

  const freeLiquidityLP = useMemo(() => getFreeLiquidity(poolInfo), [poolInfo])

  const freeLiquidityPercent = useMemo(() => {
    if (!freeLiquidityLP || !poolInfo || typeof freeLiquidityLP === "number")
      return BigNumber.from("0")

    return percentageOfBignumbers(
      freeLiquidityLP,
      poolInfo.parameters.totalLPEmission
    )
  }, [freeLiquidityLP, poolInfo])

  const availableToInvest = useMemo(() => {
    if (!leverageInfo) return

    return leverageInfo.freeLeverageBase
  }, [leverageInfo])

  const minInvestAmount = useMemo(() => {
    if (!poolInfo) return

    return poolInfo.parameters.minimalInvestment
  }, [poolInfo])

  const info = {
    symbol: baseSymbol,
    freeLiquidity: {
      lp: freeLiquidityLP,
      percent: freeLiquidityPercent,
    },
    availableToInvest: {
      amount: availableToInvest,
    },
    minInvestAmount: {
      amount: minInvestAmount,
    },
    fundPositions: {
      total: totalPosition,
      positions: positions,
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
      const approveResponse = await baseToken.approve(
        poolAddress,
        amount,
        transactionOptions
      )
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
    handleValidate,
    fromAmount,
    transactionOptions,
    addTransaction,
    fetchAndUpdateAllowance,
  ])

  const getPriceUSD = useCallback(
    async (token: string, amount: BigNumber) => {
      if (!priceFeed) return

      return (
        await priceFeed.getNormalizedPriceOutUSD(token, amount.toHexString())
      )[0]
    },
    [priceFeed]
  )

  const updateBasePrice = useCallback(
    async (amount: BigNumber) => {
      if (!priceFeed || !poolInfo) return

      const basePrice = await getPriceUSD(poolInfo.parameters.baseToken, amount)
      setBasePrice(basePrice)
    },
    [priceFeed, poolInfo, getPriceUSD]
  )

  const updateLpPrice = useCallback(
    async (amount: BigNumber) => {
      const lpPrice = multiplyBignumbers([amount, 18], [priceUSD, 18])
      setLpPrice(lpPrice)
    },
    [priceUSD]
  )

  const handleFromChange = useCallback(
    (v: string) => {
      if (!poolInfo || !priceFeed || !traderPool) return

      const amount = cutDecimalPlaces(v, formWithDirection.from.decimals, false)
      setFromAmount(amount.toString())

      const getInvestTokens = async () => {
        const tokens = await traderPool.getInvestTokens(amount.toHexString())
        const receivedAmounts = cutDecimalPlaces(tokens.lpAmount)
        const total = getSumOfBignumbersArray(tokens.givenAmounts)

        setTotalPosition(total)
        setPositions(
          tokens.positions.map((address, index) => ({
            address,
            amount: tokens.receivedAmounts[index],
          }))
        )
        setToAmount(receivedAmounts.toString())
        updateBasePrice(amount)
        updateLpPrice(receivedAmounts)
      }

      const getDivestTokens = async () => {
        const divest = await traderPool.getDivestAmountsAndCommissions(
          account,
          amount.toHexString()
        )
        const total = getSumOfBignumbersArray(divest.receptions.receivedAmounts)

        setTotalPosition(total)
        setPositions(
          divest.receptions.positions.map((address, index) => ({
            address,
            amount: divest.receptions.givenAmounts[index],
          }))
        )

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
    setPositions([])
    setTotalPosition(BigNumber.from("0"))

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
        const from = multiplyBignumbers(
          [baseTokenBalance, baseTokenData.decimals],
          [percent, 18]
        )
        handleFromChange(from.toString())
      }

      if (direction === "withdraw") {
        const to = multiplyBignumbers([lpTokenBalance, 18], [percent, 18])
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

  const getInvestTokensWithSlippage = useCallback(
    async (amount: BigNumber) => {
      if (!traderPool) return []

      const invest = await traderPool.getInvestTokens(amount.toHexString())

      const sl = 1 - parseFloat(slippage) / 100

      const amountsWithSlippage = invest.receivedAmounts.map((position) =>
        calcSlippage(position, 18, sl)
      )

      return [invest, amountsWithSlippage]
    },
    [slippage, traderPool]
  )

  const handleDeposit = useCallback(async () => {
    if (!poolAddress || !poolInfo || !traderPool) return

    const amount = BigNumber.from(fromAmount)

    const [, amountsWithSlippage] = await getInvestTokensWithSlippage(amount)

    const depositResponse = await traderPool.invest(
      amount.toHexString(),
      amountsWithSlippage,
      transactionOptions
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
    poolAddress,
    poolInfo,
    traderPool,
    fromAmount,
    getInvestTokensWithSlippage,
    transactionOptions,
    addTransaction,
    runUpdate,
  ])

  const getDivestTokens = useCallback(
    async (amount: BigNumber) => {
      if (!traderPool) return
      const divest = await traderPool.getDivestAmountsAndCommissions(
        account,
        amount.toHexString()
      )
      return divest
    },
    [account, traderPool]
  )

  const handleWithdraw = useCallback(async () => {
    if (!account || !poolAddress || !poolInfo || !traderPool) return

    const amount = BigNumber.from(fromAmount)
    const divest = await getDivestTokens(amount)
    const withdrawResponse = await traderPool.divest(
      amount.toHexString(),
      divest.receptions.receivedAmounts,
      divest.commissions.dexeDexeCommission,
      transactionOptions
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
    getDivestTokens,
    transactionOptions,
    addTransaction,
    runUpdate,
  ])

  const handleSubmit = useCallback(async () => {
    if (!handleValidate()) return

    setWalletPrompting(true)

    const handleError = (error) => {
      setWalletPrompting(false)

      const errorMessage = parseTransactionError(error)
      !!errorMessage && setError(errorMessage)
    }

    if (direction === "deposit") {
      handleDeposit().catch(handleError)
    } else {
      handleWithdraw().catch(handleError)
    }
  }, [direction, handleDeposit, handleValidate, handleWithdraw])

  const estimateApproveGas = useCallback(
    async (amount: BigNumber) => {
      if (!baseToken) return
      const approveResponse = await baseToken.estimateGas.approve(
        poolAddress,
        amount
      )
      return approveResponse
    },
    [baseToken, poolAddress]
  )

  const estimateInvestGas = useCallback(
    async (amount: BigNumber) => {
      if (!traderPool) return

      const [, amountsWithSlippage] = await getInvestTokensWithSlippage(amount)
      const depositResponse = await traderPool.estimateGas.invest(
        amount.toHexString(),
        amountsWithSlippage
      )
      return depositResponse
    },
    [getInvestTokensWithSlippage, traderPool]
  )

  const estimateDivestGas = useCallback(
    async (amount: BigNumber) => {
      if (!traderPool) return

      const divest = await getDivestTokens(amount)

      const withdrawResponse = await traderPool.estimateGas.divest(
        amount.toHexString(),
        divest.receptions.receivedAmounts,
        divest.commissions.dexeDexeCommission
      )
      return withdrawResponse
    },
    [getDivestTokens, traderPool]
  )

  const estimateGas = useCallback(async () => {
    if (!handleValidate()) return
    const amount = BigNumber.from(fromAmount)

    if (allowance?.lt(amount)) {
      return await estimateApproveGas(amount)
    }
    if (direction === "deposit") {
      return await estimateInvestGas(amount)
    }

    return await estimateDivestGas(amount)
  }, [
    allowance,
    direction,
    estimateApproveGas,
    estimateDivestGas,
    estimateInvestGas,
    fromAmount,
    handleValidate,
  ])

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

  // set swap token price on direction change
  useEffect(() => {
    setSwapPriceUSD(priceUSD)
    if (direction === "deposit") {
      setSwapPrice(priceBase)
    }
    if (direction === "withdraw") {
      const amount = ethers.utils.parseEther("1")
      setSwapPrice(divideBignumbers([amount, 18], [priceBase, 18]))
    }
  }, [direction, priceBase, priceUSD])

  // estimate gas price on from amount change
  useEffect(() => {
    const amount = BigNumber.from(fromAmount)
    if (!baseToken || amount.isZero()) return
    ;(async () => {
      try {
        const gasPrice = await estimateGas()

        if (!gasPrice) return

        const gas = getGasPrice(gasPrice.toNumber())
        setGasPrice(gas)
      } catch (e) {}
    })()
  }, [
    baseToken,
    estimateApproveGas,
    estimateGas,
    poolAddress,
    fromAmount,
    getGasPrice,
  ])

  return [
    formWithDirection,
    {
      info,
      error,
      isWalletPrompting,
      isSlippageOpen,
      gasPrice,
      swapPrice,
      swapPriceUSD,
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
