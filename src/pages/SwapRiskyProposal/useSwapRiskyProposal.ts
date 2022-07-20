import {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react"
import { ExchangeForm, ExchangeType } from "constants/interfaces_v2"
import { SwapDirection } from "constants/types"
import { BigNumber, ethers } from "ethers"
import { useRiskyProposal } from "hooks/useRiskyProposals"
import { usePoolContract } from "hooks/usePool"
import { useERC20, usePriceFeedContract } from "hooks/useContract"
import { multiplyBignumbers } from "utils/formulas"
import useGasTracker from "state/gas/hooks"

export interface UseSwapRiskyParams {
  poolAddress?: string
  proposalId?: string
  direction?: SwapDirection
}

interface UseSwapRiskyResponse {
  gasPrice: string
  error: string
  oneTokenCost: BigNumber
  oneUSDCost: BigNumber
  slippage: string
  isSlippageOpen: boolean
  isWalletPrompting: boolean
  setError: Dispatch<SetStateAction<string>>
  setSlippage: Dispatch<SetStateAction<string>>
  setWalletPrompting: Dispatch<SetStateAction<boolean>>
  setSlippageOpen: Dispatch<SetStateAction<boolean>>
  handleFromChange: (v: string) => void
  handleToChange: (v: string) => void
  handleSubmit: () => void
  handlePercentageChange: (p: BigNumber) => void
}

const useSwapRiskyProposal = ({
  poolAddress,
  proposalId,
  direction,
}: UseSwapRiskyParams): [ExchangeForm, UseSwapRiskyResponse] => {
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
  const [lastChangedField, setLastChangedField] = useState<"from" | "to">(
    "from"
  )

  const [proposalInfo, proposalPool] = useRiskyProposal(poolAddress, proposalId)
  const [, poolInfo] = usePoolContract(poolAddress)
  const priceFeed = usePriceFeedContract()

  const [, baseToken] = useERC20(poolInfo?.parameters.baseToken)
  const [, positionToken] = useERC20(proposalInfo?.proposalInfo.token)

  const [gasTrackerResponse, getGasPrice] = useGasTracker()

  const form = useMemo(() => {
    if (direction === "withdraw") {
      return {
        from: {
          address: positionToken?.address,
          amount: fromAmount,
          balance: fromBalance,
          symbol: positionToken?.symbol,
          decimals: positionToken?.decimals,
          price: fromPrice,
        },
        to: {
          address: baseToken?.address,
          amount: toAmount,
          balance: toBalance,
          symbol: baseToken?.symbol,
          decimals: baseToken?.decimals,
          price: toPrice,
        },
      }
    }
    return {
      from: {
        address: baseToken?.address,
        amount: fromAmount,
        balance: fromBalance,
        symbol: baseToken?.symbol,
        decimals: baseToken?.decimals,
        price: fromPrice,
      },
      to: {
        address: positionToken?.address,
        amount: toAmount,
        balance: toBalance,
        symbol: positionToken?.symbol,
        decimals: positionToken?.decimals,
        price: toPrice,
      },
    }
  }, [
    baseToken,
    direction,
    fromAmount,
    fromBalance,
    fromPrice,
    positionToken,
    toAmount,
    toBalance,
    toPrice,
  ])

  const getExchangeAmount = useCallback(
    async (from, amount, field) => {
      return (
        await proposalPool?.getExchangeAmount(
          Number(proposalId) + 1,
          from,
          amount,
          [],
          field
        )
      )[0]
    },
    [proposalPool, proposalId]
  )

  const exchange = useCallback(
    async (from, amount, field) => {
      const amountOut = getExchangeAmount(from, amount, field)

      return await proposalPool?.exchange(
        Number(proposalId) + 1,
        from,
        amount,
        amountOut,
        [],
        field
      )
    },
    [getExchangeAmount, proposalId, proposalPool]
  )

  const handleFromChange = useCallback(
    async (v: string) => {
      if (!proposalPool || !priceFeed) return

      const amount = BigNumber.from(v)
      setLastChangedField("from")
      setFromAmount(v)
      try {
        const amountOut = await getExchangeAmount(
          form.from.address,
          amount,
          ExchangeType.FROM_EXACT
        )

        const fromPrice = await priceFeed.getNormalizedPriceOutUSD(
          form.from.address,
          amount
        )
        const toPrice = await priceFeed.getNormalizedPriceOutUSD(
          form.to.address,
          amountOut
        )

        setToAmount(amountOut.toString())
        setFromPrice(fromPrice[0])
        setToPrice(toPrice[0])
      } catch (e) {
        console.log(e)
      }
    },
    [
      proposalPool,
      priceFeed,
      getExchangeAmount,
      form.from.address,
      form.to.address,
    ]
  )

  const handleToChange = useCallback(
    async (v: string) => {
      if (!proposalPool || !priceFeed) return

      const amount = BigNumber.from(v)
      setLastChangedField("to")
      setToAmount(v)
      try {
        const amountOut = await getExchangeAmount(
          form.from.address,
          amount,
          ExchangeType.TO_EXACT
        )

        const fromPrice = await priceFeed.getNormalizedPriceOutUSD(
          form.from.address,
          amountOut
        )
        console.log(fromPrice[0].toString())
        const toPrice = await priceFeed.getNormalizedPriceOutUSD(
          form.to.address,
          amount
        )

        setFromAmount(amountOut.toString())
        setFromPrice(fromPrice[0])
        setToPrice(toPrice[0])
      } catch (e) {
        console.log(e)
      }
    },
    [
      form.from.address,
      form.to.address,
      getExchangeAmount,
      priceFeed,
      proposalPool,
    ]
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

  const estimateGas = useCallback(async () => {
    if (!proposalPool) return

    if (lastChangedField === "from") {
      const amount = BigNumber.from(fromAmount)
      const amountOut = await getExchangeAmount(
        form.from.address,
        amount,
        ExchangeType.FROM_EXACT
      )
      return proposalPool.estimateGas.exchange(
        Number(proposalId) + 1,
        form.from.address,
        amount,
        amountOut,
        [],
        ExchangeType.FROM_EXACT
      )
    }

    const amount = BigNumber.from(toAmount)
    const amountOut = await getExchangeAmount(
      form.from.address,
      amount,
      ExchangeType.TO_EXACT
    )
    return proposalPool.estimateGas.exchange(
      Number(proposalId) + 1,
      form.from.address,
      amount,
      amountOut,
      [],
      ExchangeType.TO_EXACT
    )
  }, [
    form.from.address,
    fromAmount,
    getExchangeAmount,
    lastChangedField,
    proposalId,
    proposalPool,
    toAmount,
  ])

  const handleSubmit = useCallback(() => {}, [])

  const updateSwapPrice = useCallback(
    async (address, amount) => {
      const amountOut = await getExchangeAmount(
        address,
        amount,
        ExchangeType.FROM_EXACT
      )

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        address,
        amount
      )
      setTokenCost(amountOut)
      setUSDCost(fromPrice[0])
    },
    [getExchangeAmount, priceFeed]
  )

  // set balances
  useEffect(() => {
    if (!proposalInfo) return

    setFromBalance(proposalInfo.proposalInfo.balanceBase)
    setToBalance(proposalInfo.proposalInfo.balancePosition)
  }, [proposalInfo])

  // fetch swap price
  useEffect(() => {
    if (direction === "deposit") {
      if (!form.to.address) return

      updateSwapPrice(form.to.address, ethers.utils.parseEther("1")).catch(
        console.log
      )
    }

    if (direction === "withdraw") {
      if (!form.from.address) return

      updateSwapPrice(form.from.address, ethers.utils.parseEther("1")).catch(
        console.log
      )
    }
  }, [direction, form.from.address, form.to.address, updateSwapPrice])

  // estimate gas price
  useEffect(() => {
    const amount = BigNumber.from(fromAmount)
    if (amount.isZero()) return
    ;(async () => {
      try {
        const gasPrice = await estimateGas()

        if (!gasPrice) return

        const gas = getGasPrice(gasPrice.toNumber())
        setGasPrice(gas)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [estimateGas, fromAmount, getGasPrice])

  return [
    form,
    {
      gasPrice,
      oneTokenCost,
      oneUSDCost,
      error,
      setError,
      isWalletPrompting,
      setWalletPrompting,
      slippage,
      setSlippage,
      isSlippageOpen,
      setSlippageOpen,
      handleFromChange,
      handleToChange,
      handlePercentageChange,
      handleSubmit,
    },
  ]
}

export default useSwapRiskyProposal
