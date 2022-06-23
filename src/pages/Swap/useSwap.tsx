import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ExchangeForm, ExchangeType } from "constants/interfaces_v2"
import {
  useERC20,
  usePriceFeedContract,
  useTraderPoolContract,
} from "hooks/useContract"
import { BigNumber, ethers } from "ethers"
import { usePoolContract } from "hooks/usePool"
import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import {
  calcSlippage,
  isAddress,
  isTxMined,
  parseTransactionError,
} from "utils"
import { multiplyBignumbers } from "utils/formulas"
import { TradeType } from "constants/types"
import useGasTracker from "state/gas/hooks"

interface UseSwapProps {
  pool: string | undefined
  from: string | undefined
  to: string | undefined
}

interface UseSwapResponse {
  gasPrice: string
  error: string
  oneTokenCost: BigNumber
  oneUSDCost: BigNumber
  slippage: string
  isSlippageOpen: boolean
  isWalletPrompting: boolean
  baseToken: string | undefined
  setError: Dispatch<SetStateAction<string>>
  setSlippage: Dispatch<SetStateAction<string>>
  setWalletPrompting: Dispatch<SetStateAction<boolean>>
  setSlippageOpen: Dispatch<SetStateAction<boolean>>
  handleFromChange: (v: string) => void
  handleToChange: (v: string) => void
  handleSubmit: () => void
  handlePercentageChange: (p: BigNumber) => void
}

const useSwap = ({
  pool,
  from,
  to,
}: UseSwapProps): [ExchangeForm, UseSwapResponse] => {
  const [, poolInfo, refreshPoolInfo] = usePoolContract(pool)
  const priceFeed = usePriceFeedContract()
  const traderPool = useTraderPoolContract(pool)
  const addTransaction = useTransactionAdder()
  const [gasTrackerResponse, getGasPrice] = useGasTracker()

  const [, fromToken] = useERC20(from)
  const [, toToken] = useERC20(to)

  const [gasPrice, setGasPrice] = useState("0.00")
  const [error, setError] = useState("")
  const [slippage, setSlippage] = useState("0.10")
  const [isSlippageOpen, setSlippageOpen] = useState(false)
  const [isWalletPrompting, setWalletPrompting] = useState(false)
  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [fromPrice, setFromPrice] = useState(BigNumber.from("0"))
  const [toPrice, setToPrice] = useState(BigNumber.from("0"))
  const [oneTokenCost, setTokenCost] = useState(BigNumber.from("0"))
  const [oneUSDCost, setUSDCost] = useState(BigNumber.from("0"))

  const transactionOptions = useMemo(() => {
    if (!gasTrackerResponse) return
    return {
      gasPrice: ethers.utils.parseUnits(
        gasTrackerResponse.ProposeGasPrice,
        "gwei"
      ),
    }
  }, [gasTrackerResponse])

  const form = {
    from: {
      address: from,
      amount: fromAmount,
      balance: fromBalance,
      symbol: fromToken?.symbol,
      decimals: fromToken?.decimals,
      price: fromPrice,
    },
    to: {
      address: to,
      amount: toAmount,
      balance: toBalance,
      symbol: toToken?.symbol,
      decimals: toToken?.decimals,
      price: toPrice,
    },
  }

  const handleFromChange = useCallback(
    (v: string) => {
      if (!traderPool || !priceFeed) return

      const amount = BigNumber.from(v)
      setFromAmount(amount.toString())

      const fetchAndUpdateTo = async () => {
        const amount = BigNumber.from(v)

        const exchange = await traderPool.getExchangeAmount(
          from,
          to,
          amount.toHexString(),
          [],
          ExchangeType.FROM_EXACT
        )
        const fromPrice = await priceFeed.getNormalizedPriceOutUSD(
          from,
          amount.toHexString()
        )
        const toPrice = await priceFeed.getNormalizedPriceOutUSD(
          to,
          exchange[0].toHexString()
        )

        const receivedAmount = exchange[0]
        setToAmount(receivedAmount.toString())
        setFromPrice(fromPrice[0])
        setToPrice(toPrice[0])
      }

      fetchAndUpdateTo().catch(console.error)
    },
    [from, priceFeed, to, traderPool]
  )

  const handleToChange = useCallback(
    (v: string) => {
      if (!traderPool || !priceFeed) return

      const amount = BigNumber.from(v)
      setToAmount(amount.toString())

      const fetchAndUpdateFrom = async () => {
        const amount = BigNumber.from(v)

        const exchange = await traderPool?.getExchangeAmount(
          from,
          to,
          amount.toHexString(),
          [],
          ExchangeType.TO_EXACT
        )

        const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(to, amount)
        const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
          from,
          exchange[0]
        )
        const givenAmounts = exchange[0]
        setFromAmount(givenAmounts.toString())
        setFromPrice(fromPrice[0])
        setToPrice(toPrice[0])
      }

      fetchAndUpdateFrom().catch(console.error)
    },
    [from, priceFeed, to, traderPool]
  )

  const handlePercentageChange = useCallback(
    (percent: BigNumber) => {
      if (!form.from.decimals) return

      const from = multiplyBignumbers(
        [fromBalance, form.from.decimals],
        [percent, 18]
      )
      handleFromChange(from.toString())
    },
    [form.from.decimals, fromBalance, handleFromChange]
  )

  const getTokenBalance = useCallback(
    (token: string | undefined) => {
      if (!poolInfo) return BigNumber.from("0")

      if (
        token?.toLocaleLowerCase() ===
        poolInfo.parameters.baseToken.toLocaleLowerCase()
      ) {
        return poolInfo.baseAndPositionBalances[0]
      }

      const positionIndex = poolInfo.openPositions
        .map((address) => address.toLocaleLowerCase())
        .indexOf((token || "").toLocaleLowerCase())

      if (positionIndex === -1) return BigNumber.from("0")

      return poolInfo.baseAndPositionBalances[positionIndex + 1]
    },
    [poolInfo]
  )

  const runUpdate = useCallback(() => {
    refreshPoolInfo()
  }, [refreshPoolInfo])

  const getExchangeAmounts = useCallback(
    async (amount: BigNumber) => {
      const exchange = await traderPool?.getExchangeAmount(
        from,
        to,
        amount.toHexString(),
        [],
        ExchangeType.FROM_EXACT
      )

      const sl = 1 - parseFloat(slippage) / 100
      const exchangeWithSlippage = calcSlippage(exchange[0], 18, sl)
      return [exchange, exchangeWithSlippage]
    },
    [from, slippage, to, traderPool]
  )

  const estimateGas = useCallback(async () => {
    if (!traderPool) return

    try {
      const amount = BigNumber.from(fromAmount)
      const exchangeAmounts = await getExchangeAmounts(amount)

      return await traderPool.estimateGas.exchange(
        from,
        to,
        amount.toHexString(),
        exchangeAmounts[1].toHexString(),
        [],
        ExchangeType.FROM_EXACT
      )
    } catch (e) {
      return
    }
  }, [from, fromAmount, getExchangeAmounts, to, traderPool])

  const handleSubmit = useCallback(async () => {
    if (!traderPool) return

    setWalletPrompting(true)
    try {
      const amount = BigNumber.from(fromAmount)
      const exchangeAmounts = await getExchangeAmounts(amount)

      const transactionResponse = await traderPool.exchange(
        from,
        to,
        amount.toHexString(),
        exchangeAmounts[1].toHexString(),
        [],
        ExchangeType.FROM_EXACT,
        transactionOptions
      )

      setWalletPrompting(false)

      const receipt = await addTransaction(transactionResponse, {
        type: TransactionType.SWAP,
        tradeType: TradeType.EXACT_INPUT,
        inputCurrencyId: from,
        inputCurrencyAmountRaw: amount.toHexString(),
        expectedOutputCurrencyAmountRaw: exchangeAmounts[0][0].toHexString(),
        outputCurrencyId: to,
        minimumOutputCurrencyAmountRaw: exchangeAmounts[1].toHexString(),
      })

      if (isTxMined(receipt)) {
        runUpdate()
      }
    } catch (error: any) {
      setWalletPrompting(false)
      if (!!error && !!error.data && !!error.data.message) {
        setError(error.data.message)
      } else {
        const errorMessage = parseTransactionError(error.toString())
        !!errorMessage && setError(errorMessage)
      }
    }
  }, [
    traderPool,
    fromAmount,
    getExchangeAmounts,
    from,
    to,
    transactionOptions,
    addTransaction,
    runUpdate,
  ])

  // read and update prices
  useEffect(() => {
    if (!traderPool || !priceFeed || !from || !to) return

    const amount = ethers.utils.parseUnits("1", 18)

    const fetchAndUpdatePrices = async () => {
      const tokensCost = await traderPool?.getExchangeAmount(
        from,
        to,
        amount.toHexString(),
        [],
        ExchangeType.TO_EXACT
      )
      const usdCost = await priceFeed?.getNormalizedPriceOutUSD(
        to,
        amount.toHexString()
      )
      setTokenCost(tokensCost[0])
      setUSDCost(usdCost[0])
    }

    if (!isAddress(from) || !isAddress(to)) return
    fetchAndUpdatePrices().catch(console.error)
  }, [traderPool, priceFeed, from, to])

  // global updater
  useEffect(() => {
    const interval = setInterval(() => {
      runUpdate()
    }, Number(process.env.REACT_APP_UPDATE_INTERVAL))

    return () => clearInterval(interval)
  }, [runUpdate])

  // balance updater
  useEffect(() => {
    if (!poolInfo) return

    const fromBalanceData = getTokenBalance(from)
    const toBalanceData = getTokenBalance(to)

    setFromBalance(fromBalanceData)
    setToBalance(toBalanceData)
  }, [from, getTokenBalance, poolInfo, to])

  // estimate gas price
  useEffect(() => {
    const amount = BigNumber.from(fromAmount)
    if (amount.isZero()) return
    ;(async () => {
      const gasPrice = await estimateGas()

      if (!gasPrice) return

      const gas = getGasPrice(gasPrice.toNumber())
      setGasPrice(gas)
    })()
  }, [estimateGas, fromAmount, getGasPrice])

  return [
    form,
    {
      gasPrice,
      error,
      oneTokenCost,
      oneUSDCost,
      isWalletPrompting,
      isSlippageOpen,
      slippage,
      baseToken: poolInfo?.parameters.baseToken,
      setError,
      setWalletPrompting,
      setSlippage,
      setSlippageOpen,
      handleSubmit,
      handleFromChange,
      handleToChange,
      handlePercentageChange,
    },
  ]
}

export default useSwap
