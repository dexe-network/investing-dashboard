import { useState, useEffect, useCallback, useMemo } from "react"
import { ethers } from "ethers"
import { parseTransactionError } from "utils"

import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"

import Icon from "components/Icon"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { SwapDirection } from "constants/types"

import { divideBignumbers, multiplyBignumbers } from "utils/formulas"

import {
  IDivestAmounts,
  IProposalInvestTokens,
} from "interfaces/ITraderPoolRiskyProposal"
import {
  IDivestAmountsAndCommissions,
  IPoolInvestTokens,
} from "interfaces/ITraderPool"

import useAlert, { AlertType } from "hooks/useAlert"
import { useRiskyProposal } from "hooks/useRiskyProposals"
import { usePoolContract } from "hooks/usePool"
import {
  useBasicPoolContract,
  useERC20,
  useRiskyProposalContract,
  useTraderPoolContract,
} from "hooks/useContract"
import { RiskyForm } from "constants/interfaces_v2"
import usePoolPrice from "hooks/usePoolPrice"
import useRiskyPrice from "hooks/useRiskyPrice"
import useGasTracker from "state/gas/hooks"

const useInvestInvestmentProposal = (
  poolAddress?: string,
  proposalId?: string
): [
  {
    formWithDirection: RiskyForm
    isSlippageOpen: boolean
    fromBalance: BigNumber
    toBalance: BigNumber
    inPrice: BigNumber
    outPrice: BigNumber
    oneTokenCost: BigNumber
    usdTokenCost: BigNumber
    gasPrice: string
    fromAmount: string
    toAmount: string
    slippage: string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    direction: SwapDirection
  },
  {
    setFromAmount: (amount: string) => void
    setSlippageOpen: (state: boolean) => void
    setToAmount: (amount: string) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: () => void
    setToSelector: (state: boolean) => void
    setFromSelector: (state: boolean) => void
    setSlippage: (slippage: string) => void
    handlePercentageChange: (percentage: BigNumber) => void
    handleFromChange: (amount: string) => void
    handleSubmit: () => void
  }
] => {
  const { account } = useWeb3React()
  const [showAlert] = useAlert()
  const [, getGasPrice] = useGasTracker()

  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))
  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
  const [slippage, setSlippage] = useState("0.10")
  const [isSlippageOpen, setSlippageOpen] = useState(false)
  const [toSelectorOpened, setToSelector] = useState(false)
  const [fromSelectorOpened, setFromSelector] = useState(false)
  const [direction, setDirection] = useState<SwapDirection>("deposit")
  const [oneTokenCost, setOneTokenCost] = useState(BigNumber.from("0"))
  const [usdTokenCost, setUSDTokenCost] = useState(BigNumber.from("0"))
  const [gasPrice, setGasPrice] = useState("0.00")

  const [baseAmountReceived, setBaseAmountReceived] = useState(
    BigNumber.from("0")
  )
  const [positionAmountReceived, setPositionAmountReceived] = useState(
    BigNumber.from("0")
  )

  const [toAddress, setToAddress] = useState("")
  const [fromAddress, setFromAddress] = useState("")

  const handleDirectionChange = useCallback(() => {
    setDirection(direction === "deposit" ? "withdraw" : "deposit")
  }, [direction])

  const traderPool = useTraderPoolContract(poolAddress)
  const basicPool = useBasicPoolContract(poolAddress)
  const [proposalPool] = useRiskyProposalContract(poolAddress)
  const proposal = useRiskyProposal(poolAddress, proposalId)
  const [, poolInfo] = usePoolContract(poolAddress)
  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )

  const [, toData] = useERC20(proposal?.proposalInfo.token)

  const { priceUSD: poolPriceUSD, priceBase: poolPriceBase } =
    usePoolPrice(poolAddress)
  const { priceUSD: riskyPriceUSD, priceBase: riskyPriceBase } = useRiskyPrice(
    poolAddress,
    proposalId
  )

  const addTransaction = useTransactionAdder()

  const poolIcon = (
    <Icon
      size={27}
      source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
      address={poolAddress}
    />
  )

  const exchangeForm = useMemo(() => {
    return {
      deposit: {
        from: {
          address: undefined,
          amount: fromAmount,
          balance: fromBalance,
          price: inPrice,
          symbol: poolInfo?.ticker,
          decimals: 18,
          icon: poolIcon,
        },
        to: {
          address: proposal?.proposalInfo.token,
          amount: toAmount,
          balance: toBalance,
          price: outPrice,
          symbol: `${toData?.symbol}-LP`,
          decimals: toData?.decimals,
          icon: undefined,
          info: {
            stakeLimit: proposal?.proposalInfo.proposalLimits.investLPLimit,
            tokens: [
              poolInfo?.parameters.baseToken || "",
              proposal?.proposalInfo.token || "",
            ],
            amounts: [baseAmountReceived, positionAmountReceived],
          },
        },
      },
      withdraw: {
        from: {
          address: proposal?.proposalInfo.token,
          amount: fromAmount,
          balance: fromBalance,
          price: inPrice,
          symbol: `${toData?.symbol}-LP`,
          decimals: toData?.decimals,
          icon: undefined,
          info: {
            stakeLimit: proposal?.proposalInfo.proposalLimits.investLPLimit,
          },
        },
        to: {
          address: undefined,
          amount: toAmount,
          balance: toBalance,
          price: outPrice,
          symbol: poolInfo?.ticker,
          decimals: 18,
          icon: poolIcon,
        },
      },
    }
  }, [
    baseAmountReceived,
    positionAmountReceived,
    fromAmount,
    toAmount,
    fromBalance,
    toBalance,
    inPrice,
    outPrice,
    poolIcon,
    poolInfo,
    proposal,
    toData,
  ])

  const formWithDirection = exchangeForm[direction]

  const getLPBalance = useCallback(async () => {
    if (!traderPool || !account) return

    const lpAvailable: BigNumber = await traderPool?.balanceOf(account)

    if (direction === "deposit") {
      setFromBalance(lpAvailable)
    } else {
      setToBalance(lpAvailable)
    }
  }, [account, direction, traderPool])

  const getLP2Balance = useCallback(async () => {
    if (!proposalPool || !account) return

    const balance = await proposalPool?.balanceOf(
      account,
      Number(proposalId) + 1
    )

    if (direction === "deposit") {
      setToBalance(balance)
    } else {
      setFromBalance(balance)
    }
  }, [account, direction, proposalId, proposalPool])

  const getInvestTokens = useCallback(
    async (
      amount: BigNumber
    ): Promise<[IDivestAmountsAndCommissions, IProposalInvestTokens]> => {
      const divests: IDivestAmountsAndCommissions =
        await traderPool?.getDivestAmountsAndCommissions(account, amount)

      const invests: IProposalInvestTokens =
        await proposalPool?.getInvestTokens(
          Number(proposalId) + 1,
          divests.receptions.baseAmount
        )
      return [divests, invests]
    },
    [account, proposalId, proposalPool, traderPool]
  )

  const getDivestTokens = useCallback(
    async (amount: BigNumber): Promise<[IDivestAmounts, IPoolInvestTokens]> => {
      const divests: IDivestAmounts = await proposalPool?.getDivestAmounts(
        [Number(proposalId) + 1],
        [amount]
      )

      const invests: IPoolInvestTokens = await traderPool?.getInvestTokens(
        divests.baseAmount
      )

      return [divests, invests]
    },
    [proposalId, proposalPool, traderPool]
  )

  const estimateDepositGasPrice = useCallback(async () => {
    const amount = BigNumber.from(fromAmount)

    if (!basicPool || amount.isZero()) return

    const [divests, invests] = await getInvestTokens(amount)

    return await basicPool.estimateGas.investProposal(
      Number(proposalId) + 1,
      amount,
      divests.receptions.receivedAmounts,
      invests.positionAmount
    )
  }, [basicPool, fromAmount, getInvestTokens, proposalId])

  const estimateWithdrawGasPrice = useCallback(async () => {
    const amount = BigNumber.from(fromAmount)

    if (!basicPool || amount.isZero()) return

    const [divests, invests] = await getDivestTokens(amount)

    return await basicPool.estimateGas.reinvestProposal(
      Number(proposalId) + 1,
      amount,
      invests.receivedAmounts,
      divests.receivedAmounts[0]
    )
  }, [basicPool, fromAmount, getDivestTokens, proposalId])

  const estimateGas = useCallback(async () => {
    if (direction === "deposit") {
      return await estimateDepositGasPrice()
    } else {
      return await estimateWithdrawGasPrice()
    }
  }, [direction, estimateDepositGasPrice, estimateWithdrawGasPrice])

  const handleDeposit = useCallback(async () => {
    const amount = BigNumber.from(fromAmount)
    const [divests, invests] = await getInvestTokens(amount)

    const investReceipt = await basicPool?.investProposal(
      Number(proposalId) + 1,
      amount,
      divests.receptions.receivedAmounts,
      invests.positionAmount
    )

    addTransaction(investReceipt, {
      type: TransactionType.DEPOSIT_RISKY_PROPOSAL,
      inputCurrencyAmountRaw: invests.lp2Amount.toString(),
      inputCurrencySymbol: exchangeForm.deposit.to.symbol,
      expectedOutputCurrencyAmountRaw: amount.toString(),
      expectedOutputCurrencySymbol: exchangeForm.deposit.from.symbol,
    })

    return investReceipt
  }, [
    addTransaction,
    basicPool,
    exchangeForm.deposit.from.symbol,
    exchangeForm.deposit.to.symbol,
    fromAmount,
    getInvestTokens,
    proposalId,
  ])

  const handleWithdraw = useCallback(async () => {
    const amount = BigNumber.from(fromAmount)

    const [divests, invests] = await getDivestTokens(amount)

    const withdrawReceipt = await basicPool?.reinvestProposal(
      Number(proposalId) + 1,
      amount,
      invests.receivedAmounts,
      divests.receivedAmounts[0]
    )

    addTransaction(withdrawReceipt, {
      type: TransactionType.WITHDRAW_RISKY_PROPOSAL,
      outputCurrencyAmountRaw: amount.toString(),
      outputCurrencySymbol: exchangeForm.withdraw.from.symbol,
      expectedInputCurrencyAmountRaw: invests.lpAmount.toString(),
      expectedInputCurrencySymbol: exchangeForm.withdraw.to.symbol,
    })

    return withdrawReceipt
  }, [
    addTransaction,
    basicPool,
    exchangeForm.withdraw.from.symbol,
    exchangeForm.withdraw.to.symbol,
    fromAmount,
    getDivestTokens,
    proposalId,
  ])

  const handleSubmit = useCallback(async () => {
    try {
      if (direction === "deposit") {
        const investReceipt = await handleDeposit()
        // TODO: add transaction toast
      }

      if (direction === "withdraw") {
        const withdrawReceipt = await handleWithdraw()
        // TODO: add transaction toast
      }
    } catch (error: any) {
      const errorMessage = parseTransactionError(error)
      showAlert({
        content: errorMessage,
        type: AlertType.warning,
        hideDuration: 10000,
      })
    }
  }, [direction, handleDeposit, handleWithdraw, showAlert])

  const getLpPrice = useCallback(
    (amount: BigNumber) => {
      return multiplyBignumbers([amount, 18], [poolPriceUSD, 18])
    },
    [poolPriceUSD]
  )

  const getLp2Price = useCallback(
    (amount: BigNumber) => {
      return multiplyBignumbers([amount, 18], [riskyPriceUSD, 18])
    },
    [riskyPriceUSD]
  )

  const handleFromChange = useCallback(
    async (v: string) => {
      setFromAmount(v)
      const amount = BigNumber.from(v)

      try {
        if (direction === "deposit") {
          const [, invests] = await getInvestTokens(amount)
          const lpPrice = getLpPrice(amount)
          const lp2Price = getLp2Price(invests.lp2Amount)

          setPositionAmountReceived(invests.positionAmount)
          setBaseAmountReceived(invests.baseAmount)
          setToAmount(invests.lp2Amount.toString())
          setInPrice(lpPrice)
          setOutPrice(lp2Price)
        }
        if (direction === "withdraw") {
          const [, invests] = await getDivestTokens(amount)
          const lpPrice = getLpPrice(invests.lpAmount)
          const lp2Price = getLp2Price(amount)

          setToAmount(invests.lpAmount.toString())
          setInPrice(lp2Price)
          setOutPrice(lpPrice)
        }
      } catch (e) {
        console.log(e)
      }
    },
    [direction, getDivestTokens, getInvestTokens, getLp2Price, getLpPrice]
  )

  const handlePercentageChange = useCallback(
    (percent: BigNumber) => {
      const from = multiplyBignumbers([fromBalance, 18], [percent, 18])
      handleFromChange(from.toString())
    },
    [fromBalance, handleFromChange]
  )

  useEffect(() => {
    ;(async () => {
      try {
        const gasPrice = await estimateGas()
        if (!gasPrice) return

        const gas = getGasPrice(gasPrice.toNumber())
        setGasPrice(gas)
      } catch (e) {}
    })()
  }, [estimateGas, getGasPrice])

  useEffect(() => {
    handleFromChange(fromAmount)
  }, [direction])

  useEffect(() => {
    if (direction === "deposit") {
      setUSDTokenCost(riskyPriceUSD)
      setOneTokenCost(
        divideBignumbers([riskyPriceBase, 18], [poolPriceBase, 18])
      )
    }
    if (direction === "withdraw") {
      setUSDTokenCost(poolPriceUSD)
      setOneTokenCost(
        divideBignumbers([poolPriceBase, 18], [riskyPriceBase, 18])
      )
    }
  }, [direction, poolPriceBase, poolPriceUSD, riskyPriceBase, riskyPriceUSD])

  // get LP balance
  // get LP2 balance
  // update amounts
  useEffect(() => {
    getLPBalance().catch(console.error)
    getLP2Balance().catch(console.error)
  }, [direction, getLP2Balance, getLPBalance])

  // balance updater for both LP and LP2
  useEffect(() => {
    const interval = setInterval(() => {
      getLPBalance().catch(console.error)
      getLP2Balance().catch(console.error)
    }, Number(process.env.REACT_APP_UPDATE_INTERVAL))

    return () => clearInterval(interval)
  }, [getLPBalance, getLP2Balance])

  return [
    {
      formWithDirection,
      isSlippageOpen,
      fromBalance,
      toBalance,
      oneTokenCost,
      usdTokenCost,
      gasPrice,
      inPrice,
      outPrice,
      fromAmount,
      toAmount,
      fromAddress,
      toAddress,
      toSelectorOpened,
      fromSelectorOpened,
      direction,
      slippage,
    },
    {
      setSlippageOpen,
      setFromAmount,
      setToAmount,
      setToAddress,
      setFromAddress,
      setDirection: handleDirectionChange,
      setToSelector,
      setFromSelector,
      setSlippage,
      handlePercentageChange,
      handleFromChange,
      handleSubmit,
    },
  ]
}

export default useInvestInvestmentProposal
