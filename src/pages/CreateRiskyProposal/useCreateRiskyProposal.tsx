import { useCallback, useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"

import { BigNumber, ethers } from "ethers"
import getTime from "date-fns/getTime"
import { addDays } from "date-fns/esm"

import { useTraderPool } from "hooks/usePool"
import {
  useBasicPoolContract,
  useRiskyProposalContract,
} from "hooks/useContract"

import getReceipt from "utils/getReceipt"

import { shortTimestamp, parseTransactionError } from "utils"

const useCreateRiskyProposal = (
  poolAddress?: string,
  tokenAddress?: string
): [
  {
    error: string
    isSubmiting: boolean
    baseTokenPrice?: BigNumber
    lpAvailable?: BigNumber
    lpAmount: string
    timestampLimit: number
    investLPLimit: string
    maxTokenPriceLimit: string
    instantTradePercentage: number
  },
  {
    setSubmiting: (value: boolean) => void
    setError: (value: string) => void
    setLpAmount: (value: string) => void
    setTimestampLimit: (timestamp: number) => void
    setInvestLPLimit: (value: string) => void
    setMaxTokenPriceLimit: (value: string) => void
    setInstantTradePercentage: (percent: number) => void
    handleSubmit: () => void
  }
] => {
  const { account, library } = useWeb3React()
  const initialTimeLimit = shortTimestamp(getTime(addDays(new Date(), 30)))
  const [riskyProposal] = useRiskyProposalContract(poolAddress)

  const basicTraderPool = useBasicPoolContract(poolAddress)
  const traderPool = useTraderPool(poolAddress)

  const [error, setError] = useState("")
  const [isSubmiting, setSubmiting] = useState(false)
  const [lpAmount, setLpAmount] = useState("")
  const [timestampLimit, setTimestampLimit] = useState(initialTimeLimit)
  const [investLPLimit, setInvestLPLimit] = useState("")
  const [maxTokenPriceLimit, setMaxTokenPriceLimit] = useState("")
  const [instantTradePercentage, setInstantTradePercentage] = useState(0)
  const [baseTokenPrice, setBaseTokenPrice] = useState<BigNumber | undefined>()
  const [lpAvailable, setLpAvailable] = useState<BigNumber | undefined>()

  // fetch base token price
  useEffect(() => {
    if (!riskyProposal || !tokenAddress || tokenAddress.length !== 42) return

    const getCreatingTokensInfo = async () => {
      const tokens = await riskyProposal.getCreationTokens(
        tokenAddress,
        ethers.utils.parseEther("1").toHexString(),
        ethers.utils.parseUnits("100", 27).toHexString(),
        []
      )
      setBaseTokenPrice(tokens.positionTokenPrice)
    }

    getCreatingTokensInfo().catch(console.error)
  }, [riskyProposal, tokenAddress])

  // fetch LP balance
  useEffect(() => {
    if (!traderPool || !account) return

    const getBalance = async () => {
      const lpAvailable: BigNumber = await traderPool.balanceOf(account)
      setLpAvailable(lpAvailable)
    }

    getBalance().catch(console.error)
  }, [traderPool, account])

  const handleSubmit = useCallback(() => {
    if (!basicTraderPool || !traderPool || !riskyProposal || !account) return

    const createRiskyProposal = async () => {
      setSubmiting(true)
      setError("")
      const amount = ethers.utils.parseEther(lpAmount).toHexString()
      const percentage = ethers.utils
        .parseUnits(instantTradePercentage.toString(), 25)
        .toHexString()

      const divests = await traderPool.getDivestAmountsAndCommissions(
        account,
        amount
      )

      const tokens = await riskyProposal.getCreationTokens(
        tokenAddress,
        divests.receptions.baseAmount,
        percentage,
        []
      )

      const createReceipt = await basicTraderPool.createProposal(
        tokenAddress,
        amount,
        [
          timestampLimit,
          ethers.utils.parseUnits(investLPLimit, 18).toHexString(),
          ethers.utils.parseUnits(maxTokenPriceLimit, 18).toHexString(),
        ],
        percentage,
        divests.receptions.receivedAmounts,
        tokens[0],
        []
      )
      setSubmiting(false)

      // TODO: add transaction toast
    }

    createRiskyProposal().catch((error) => {
      setSubmiting(false)

      const errorMessage = parseTransactionError(error)
      !!errorMessage && setError(errorMessage)
    })
  }, [
    account,
    basicTraderPool,
    instantTradePercentage,
    investLPLimit,
    lpAmount,
    maxTokenPriceLimit,
    riskyProposal,
    timestampLimit,
    tokenAddress,
    traderPool,
  ])

  return [
    {
      lpAmount,
      error,
      isSubmiting,
      lpAvailable,
      baseTokenPrice,
      timestampLimit,
      investLPLimit,
      maxTokenPriceLimit,
      instantTradePercentage,
    },
    {
      setError,
      setSubmiting,
      setLpAmount,
      setTimestampLimit,
      setInvestLPLimit,
      setMaxTokenPriceLimit,
      setInstantTradePercentage,
      handleSubmit,
    },
  ]
}

export default useCreateRiskyProposal
