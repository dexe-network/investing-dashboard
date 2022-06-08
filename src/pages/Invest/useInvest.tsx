import {
  Dispatch,
  ReactNode,
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
} from "utils"
import { useWeb3React } from "@web3-react/core"
import { useERC20, usePriceFeedContract } from "hooks/useContract"
import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { getDividedBalance } from "utils/formulas"
import { usePoolPrice } from "state/pools/hooks"
import { SwapDirection } from "constants/types"

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

interface FormElement {
  address: string | undefined
  amount: string
  balance: BigNumber
  symbol?: string
  decimals?: number
  icon?: ReactNode
  price: BigNumber
}

interface Form {
  from: FormElement
  to: FormElement
}

// useInvest hook posibilities
// @param poolAddress: string
// @param direction: deposit | withdraw
const useInvest = ({
  poolAddress,
  initialDirection,
}: UseInvestProps): [Form, UseInvestResponse] => {
  const { account, library } = useWeb3React()
  const traderPool = useTraderPool(poolAddress)
  const [, poolInfo] = usePoolContract(poolAddress)
  const addTransaction = useTransactionAdder()
  const [baseToken, baseTokenData, baseTokenBalance, updateBaseToken] =
    useERC20(poolInfo?.parameters.baseToken)
  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )
  const priceFeed = usePriceFeedContract()
  // getPoolInfo()
  const poolPrice = usePoolPrice(poolAddress)
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
  const [error, setError] = useState("")

  const poolIcon = (
    <Icon
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
        price: lpTokenPrice,
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
        price: lpTokenPrice,
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

    try {
      setWalletPrompting(true)
      const amount = BigNumber.from(fromAmount)
      const approveResponse = await baseToken.approve(poolAddress, amount)
      setWalletPrompting(false)

      addTransaction(approveResponse, {
        type: TransactionType.APPROVAL,
        tokenAddress: baseToken.address,
        spender: account,
      })
    } catch (e) {
      setWalletPrompting(false)
    }
  }, [account, addTransaction, fromAmount, baseToken, poolAddress])

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
      if (!poolPrice) return

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

        setToAmount(receivedAmounts.toString())
        updateBasePrice(amount)
        updateLpPrice(receivedAmounts)
      }

      const getDivestTokens = async () => {
        const divest = await traderPool.getDivestAmountsAndCommissions(
          account,
          amount.toHexString()
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

    addTransaction(depositResponse, {
      type: TransactionType.DEPOSIT_LIQUIDITY_STAKING,
      poolAddress: poolAddress,
      currencyId: poolInfo?.parameters.baseToken,
      amount: amount.toHexString(),
    })
  }, [addTransaction, fromAmount, poolAddress, poolInfo, slippage, traderPool])

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

    addTransaction(withdrawResponse, {
      type: TransactionType.WITHDRAW_LIQUIDITY_STAKING,
      poolAddress: poolAddress,
      currencyId: poolInfo?.parameters.baseToken,
      amount: amount.toHexString(),
    })
  }, [account, addTransaction, poolAddress, poolInfo, fromAmount, traderPool])

  const handleSubmit = useCallback(async () => {
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
  }, [direction, handleDeposit, handleWithdraw])

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
      fetchAndUpdateAllowance().catch(console.error)
      fetchAndUpdateBalance().catch(console.error)
      updateBaseToken()
    }, Number(process.env.REACT_APP_UPDATE_INTERVAL))

    return () => clearInterval(interval)
  }, [fetchAndUpdateAllowance, fetchAndUpdateBalance, updateBaseToken])

  // update from tokens amount on direction change
  useEffect(() => {
    updateFrom()
  }, [direction])

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
