import React, { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { useSelector } from "react-redux"

import Payload from "components/Payload"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import CircularProgress from "components/CircularProgress"
import IconButton from "components/IconButton"
import ExchangeTo from "components/Exchange/To"
import Button, { SecondaryButton } from "components/Button"
import TransactionSlippage from "components/TransactionSlippage"
import IpfsIcon from "components/IpfsIcon"
import Header from "components/Header/Layout"
import TransactionError from "modals/TransactionError"

import { PriceFeed, TraderPool } from "abi"
import useContract, { useERC20 } from "hooks/useContract"
import { PoolType } from "constants/interfaces_v2"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { createClient, Provider as GraphProvider } from "urql"
import { calcSlippage, getAllowance, parseTransactionError } from "utils"
import { getDividedBalance, getPriceImpact } from "utils/formulas"
import getReceipt from "utils/getReceipt"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"
import LockedIcon from "assets/icons/LockedIcon"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"

import {
  ErrorText,
  PriceContainer,
  InfoRow,
  SettingsIcon,
  SettingsLabel,
  SettingsCard,
  SettingsTitle,
  SettingsDescription,
  SettingsButton,
  SettingsInput,
} from "./styled"
import { usePoolContract } from "hooks/usePool"

export const useInvest = (): [
  {
    fromAmount: string
    toAmount: string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    slippage: string
    pending: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: string) => void
    setToAmount: (amount: string) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: (v: "deposit" | "withdraw") => void
    setPercentage: (v: number) => void
    setToSelector: (state: boolean) => void
    setFromSelector: (state: boolean) => void
    setSlippage: (slippage: string) => void
  }
] => {
  const { library } = useWeb3React()

  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
  const [slippage, setSlippage] = useState("0.10")
  const [hash, setHash] = useState("")
  const [pending, setPending] = useState(false)
  const [toSelectorOpened, setToSelector] = useState(false)
  const [fromSelectorOpened, setFromSelector] = useState(false)
  const [direction, setDirection] = useState<"deposit" | "withdraw">("deposit")

  const [toAddress, setToAddress] = useState("")
  const [fromAddress, setFromAddress] = useState("")

  useEffect(() => {
    if (!hash || !library) return
    ;(async () => {
      try {
        await library.waitForTransaction(hash)

        setPending(false)
        setHash("")
      } catch (e) {
        console.log(e)
      }
    })()
  }, [hash, library])

  const setFromAmountCallback = useCallback(
    (amount: string): void => setFromAmount(amount),
    []
  )

  const setToAmountCallback = useCallback(
    (amount: string): void => setToAmount(amount),
    []
  )

  const setToAddressCallback = useCallback(
    (address: string): void => setToAddress(address),
    []
  )

  const setSlippageCallback = useCallback(
    (slippage: string): void => setSlippage(slippage),
    []
  )

  const setFromAddressCallback = useCallback(
    (address: string): void => setFromAddress(address),
    []
  )

  const setToSelectorCallback = useCallback(
    (v: boolean): void => setToSelector(v),
    []
  )

  const setFromSelectorCallback = useCallback(
    (v: boolean): void => setFromSelector(v),
    []
  )

  const handleDirectionChange = useCallback(() => {
    if (direction === "deposit") {
      setDirection("withdraw")
    } else {
      setDirection("deposit")
    }
  }, [direction])

  const handlePercentageChange = useCallback((v: number) => {
    // TODO: decide how to know balance
    console.log(v)
  }, [])

  return [
    {
      fromAmount,
      toAmount,
      fromAddress,
      toAddress,
      toSelectorOpened,
      fromSelectorOpened,
      direction,
      pending,
      slippage,
    },
    {
      setFromAmount: setFromAmountCallback,
      setToAmount: setToAmountCallback,
      setToAddress: setToAddressCallback,
      setFromAddress: setFromAddressCallback,
      setDirection: handleDirectionChange,
      setPercentage: handlePercentageChange,
      setToSelector: setToSelectorCallback,
      setFromSelector: setFromSelectorCallback,
      setSlippage: setSlippageCallback,
    },
  ]
}

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

function Invest() {
  const { account, library } = useWeb3React()
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction, slippage },
    {
      setFromAmount,
      setToAmount,
      setToAddress,
      setDirection,
      setToSelector,
      setSlippage,
    },
  ] = useInvest()

  const [error, setError] = useState("")
  const [isSubmiting, setSubmiting] = useState(false)
  const [isSlippageOpen, setSlippageOpen] = useState(false)
  const [allowance, setAllowance] = useState("-1")
  const [priceImpact, setPriceImpact] = useState("0")
  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))

  const { poolAddress } = useParams<{
    poolAddress: string
    poolType: PoolType
  }>()
  const [, poolInfo] = usePoolContract(poolAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const traderPool = useContract(poolAddress, TraderPool)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const [fromToken, fromData, fromBalance, updateFromBalance] = useERC20(
    poolInfo?.parameters.baseToken
  )

  const addTransaction = useTransactionAdder()

  const updatePriceImpact = (from: BigNumber, to: BigNumber) => {
    const f = ethers.utils.formatUnits(from, 18)
    const t = ethers.utils.formatUnits(to, 18)

    const result = getPriceImpact(parseFloat(f), parseFloat(t))
    setPriceImpact(result.toFixed(4))
  }

  const updateToBalance = async () => {
    const balance: BigNumber = await traderPool?.balanceOf(account)
    setToBalance(balance)
  }

  const fetchAndUpdateAllowance = async () => {
    const allowance = await getAllowance(
      account,
      poolInfo?.parameters.baseToken,
      poolAddress,
      library
    )
    setAllowance(allowance.toString())
  }

  const handleSubmit = async () => {
    setSubmiting(true)
    if (direction === "deposit") {
      const deposit = async () => {
        const amount = BigNumber.from(fromAmount)
        const invest = await traderPool?.getInvestTokens(amount.toHexString())

        const sl = 1 - parseFloat(slippage) / 100

        const amountsWithSlippage = invest.receivedAmounts.map((position) =>
          calcSlippage(position, 18, sl)
        )

        const depositResponse = await traderPool?.invest(
          amount.toHexString(),
          amountsWithSlippage
        )

        addTransaction(depositResponse, {
          type: TransactionType.DEPOSIT_LIQUIDITY_STAKING,
          poolAddress: poolAddress,
          currencyId: poolInfo?.parameters.baseToken,
          amount: amount.toHexString(),
        })

        setSubmiting(false)
        await getReceipt(library, depositResponse.hash)

        updateFromBalance()
        await updateToBalance()
      }

      deposit().catch((error) => {
        setSubmiting(false)

        if (!!error && !!error.data && !!error.data.message) {
          setError(error.data.message)
        } else {
          const errorMessage = parseTransactionError(error.toString())
          !!errorMessage && setError(errorMessage)
        }
      })
    } else {
      const withdraw = async () => {
        const amount = BigNumber.from(toAmount)
        const divest = await traderPool?.getDivestAmountsAndCommissions(
          account,
          amount.toHexString()
        )
        const withdrawResponse = await traderPool?.divest(
          amount.toHexString(),
          divest.receptions.receivedAmounts,
          divest.commissions.dexeDexeCommission
        )

        addTransaction(withdrawResponse, {
          type: TransactionType.WITHDRAW_LIQUIDITY_STAKING,
          poolAddress: poolAddress,
          currencyId: poolInfo?.parameters.baseToken,
          amount: amount.toHexString(),
        })

        setSubmiting(false)
      }

      withdraw().catch(console.error)
    }
  }

  const handlePercentageChange = (percent) => {
    if (direction === "deposit") {
      const from = getDividedBalance(fromBalance, fromData?.decimals, percent)
      handleFromChange(from)
    }

    if (direction === "withdraw") {
      const to = getDividedBalance(toBalance, 18, percent)
      handleToChange(to)
    }
  }

  const handleDirectionChange = () => {
    if (direction === "deposit") {
      setDirection("withdraw")
    } else {
      setDirection("deposit")
    }
  }

  const handleFromChange = (v: string) => {
    setFromAmount(v)

    const fetchAndUpdateTo = async () => {
      const amount = BigNumber.from(v)

      const tokens = await traderPool?.getInvestTokens(amount.toHexString())
      setToAmount(tokens.lpAmount.toString())

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        poolInfo?.parameters.baseToken,
        amount.toHexString()
      )
      setInPrice(fromPrice.amountOut)

      const priceOut = fromPrice.amountOut.div(amount).mul(tokens.lpAmount)
      setOutPrice(priceOut)

      updatePriceImpact(fromPrice.amountOut, priceOut)
    }

    fetchAndUpdateTo().catch(console.error)
  }

  const handleToChange = (v) => {
    setToAmount(v)

    const fetchAndUpdateFrom = async () => {
      const amount = BigNumber.from(v)

      const tokens = await traderPool?.getDivestAmountsAndCommissions(
        account,
        amount.toHexString()
      )
      setFromAmount(tokens.receptions.baseAmount)

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        poolInfo?.parameters.baseToken,
        tokens.receptions.baseAmount.toHexString()
      )
      setOutPrice(fromPrice.amountOut)

      const priceIn = fromPrice.amountOut
        .div(tokens.receptions.baseAmount)
        .mul(amount)

      setInPrice(priceIn)

      updatePriceImpact(fromPrice.amountOut, priceIn)
    }

    fetchAndUpdateFrom().catch(console.error)
  }

  const approve = () => {
    if (!fromToken) return
    setSubmiting(true)

    const approveToken = async () => {
      const amount = BigNumber.from(fromAmount)
      const approveResponse = await fromToken.approve(poolAddress, amount)
      setSubmiting(false)

      addTransaction(approveResponse, {
        type: TransactionType.APPROVAL,
        tokenAddress: fromToken.address,
        spender: account,
      })

      const receipt = await getReceipt(library, approveResponse.hash)
      if (receipt !== null && receipt.logs.length) {
        await fetchAndUpdateAllowance()
      }
    }

    approveToken().catch(console.error)
  }

  // allowance watcher
  useEffect(() => {
    if (
      !fromToken ||
      !account ||
      !library ||
      !poolInfo ||
      direction === "withdraw"
    )
      return

    const allowanceInterval = setInterval(() => {
      fetchAndUpdateAllowance().catch(console.error)
    }, 1000 * 20)

    fetchAndUpdateAllowance().catch(console.error)

    return () => clearInterval(allowanceInterval)
  }, [fromToken, account, library, poolInfo, direction])

  // get LP tokens balance
  useEffect(() => {
    if (!traderPool || !fromData) return

    updateToBalance().catch(console.error)
  }, [traderPool, fromData, account])

  const getButton = () => {
    if (fromAmount === "0") {
      return (
        <SecondaryButton
          theme="disabled"
          size="large"
          onClick={handleSubmit}
          fz={22}
          full
        >
          Enter amount to swap
        </SecondaryButton>
      )
    }

    if (direction === "deposit" && fromBalance.lt(fromAmount)) {
      return (
        <SecondaryButton theme="disabled" size="large" fz={22} full>
          Insufficient balance
        </SecondaryButton>
      )
    }

    if (direction === "withdraw" && toBalance.lt(toAmount)) {
      return (
        <SecondaryButton theme="disabled" size="large" fz={22} full>
          Insufficient balance
        </SecondaryButton>
      )
    }

    if (direction === "deposit" && BigNumber.from(allowance).lt(fromAmount)) {
      return (
        <SecondaryButton size="large" onClick={approve} fz={22} full>
          <Flex>
            Unlock token <LockedIcon />
          </Flex>
        </SecondaryButton>
      )
    }

    return (
      <Button
        size="large"
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={handleSubmit}
        fz={22}
        full
      >
        {direction === "deposit"
          ? `Buy ${poolInfo?.ticker}`
          : `Sell ${poolInfo?.ticker}`}
      </Button>
    )
  }

  const button = getButton()

  const from = (
    <ExchangeFrom
      price={inPrice}
      amount={fromAmount}
      balance={fromBalance}
      address={poolInfo?.parameters.baseToken}
      symbol={fromData?.symbol}
      decimal={fromData?.decimals}
      onChange={handleFromChange}
    />
  )

  const to = (
    <ExchangeTo
      customIcon={
        <IpfsIcon size={27} hash={poolInfo?.parameters.descriptionURL} />
      }
      priceImpact={priceImpact}
      price={outPrice}
      amount={toAmount}
      balance={toBalance}
      address={poolAddress}
      symbol={poolInfo?.ticker}
      decimal={18}
      onChange={handleToChange}
    />
  )

  const form = (
    <Card>
      <CardHeader>
        <Title>Buy LP token</Title>
        <IconsGroup>
          <CircularProgress />
          <IconButton
            media={settings}
            onClick={() => setSlippageOpen(!isSlippageOpen)}
          />
          <IconButton media={close} onClick={() => {}} />
        </IconsGroup>
      </CardHeader>
      {direction === "deposit" ? from : to}

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      {direction === "deposit" ? to : from}

      <Flex p="16px 0 0" full>
        {button}
      </Flex>

      <TransactionSlippage
        slippage={slippage}
        onChange={setSlippage}
        isOpen={isSlippageOpen}
        toggle={(v) => setSlippageOpen(v)}
      />
    </Card>
  )

  return (
    <>
      <Header>{poolInfo?.name}</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Payload isOpen={isSubmiting} toggle={() => setSubmiting(false)} />
        {form}
      </Container>
      <TransactionError isOpen={!!error.length} toggle={() => setError("")}>
        {error}
      </TransactionError>
    </>
  )
}

const InvestWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <Invest />
    </GraphProvider>
  )
}

export default InvestWithProvider
