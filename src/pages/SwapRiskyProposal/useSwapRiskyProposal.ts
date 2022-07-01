import { useCallback, useMemo, useState, Dispatch, SetStateAction } from "react"
import { ExchangeForm, ExchangeType } from "constants/interfaces_v2"
import { SwapDirection } from "constants/types"
import { BigNumber } from "ethers"
import { useRiskyProposal } from "hooks/useRiskyProposals"
import { usePoolContract } from "hooks/usePool"
import { useERC20 } from "hooks/useContract"

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

  const riskyInfo = useRiskyProposal(poolAddress, proposalId)
  const [, poolInfo] = usePoolContract(poolAddress)

  const [, baseToken] = useERC20(poolInfo?.parameters.baseToken)
  const [, positionToken] = useERC20(riskyInfo?.proposalInfo.token)

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

  const handleFromChange = useCallback(() => {}, [])
  const handleToChange = useCallback(() => {}, [])
  const handlePercentageChange = useCallback(() => {}, [])
  const estimateGas = useCallback(() => {}, [])
  const handleSubmit = useCallback(() => {}, [])

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
