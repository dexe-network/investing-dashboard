import React, { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { useSelector } from "react-redux"

import Payload from "components/Payload"
import ExchangeInput from "components/Exchange/ExchangeInput"
import ExchangeDivider from "components/Exchange/Divider"
import CircularProgress from "components/CircularProgress"
import IconButton from "components/IconButton"
import Button, { SecondaryButton } from "components/Button"
import TransactionSlippage from "components/TransactionSlippage"
import Icon from "components/Icon"
import Header from "components/Header/Layout"
import TransactionError from "modals/TransactionError"

import { PriceFeed, TraderPool } from "abi"
import useContract, { useERC20 } from "hooks/useContract"
import { PoolType } from "constants/interfaces_v2"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { createClient, Provider as GraphProvider } from "urql"
import {
  calcSlippage,
  cutDecimalPlaces,
  getAllowance,
  parseTransactionError,
  shortenAddress,
} from "utils"
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

import { usePoolContract } from "hooks/usePool"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import useCustomInvest from "./useInvest"

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

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )

  const addTransaction = useTransactionAdder()

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
      handleFromChange(from.toString())
    }

    if (direction === "withdraw") {
      const to = getDividedBalance(toBalance, 18, percent)
      handleToChange(to.toString())
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
    const amount = cutDecimalPlaces(v, fromData?.decimals)
    setFromAmount(amount.toString())

    const fetchAndUpdateTo = async () => {
      const tokens = await traderPool?.getInvestTokens(amount.toHexString())
      const receivedAmounts = cutDecimalPlaces(tokens.lpAmount)
      setToAmount(receivedAmounts.toString())

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        poolInfo?.parameters.baseToken,
        amount.toHexString()
      )
      setInPrice(fromPrice[0])

      const priceOut = fromPrice[0].div(amount).mul(receivedAmounts)
      setOutPrice(priceOut)
    }

    fetchAndUpdateTo().catch(console.error)
  }

  const handleToChange = (v) => {
    const amount = cutDecimalPlaces(v)
    setToAmount(amount.toString())

    const fetchAndUpdateFrom = async () => {
      const tokens = await traderPool?.getDivestAmountsAndCommissions(
        account,
        amount.toHexString()
      )
      const neededAmounts = cutDecimalPlaces(tokens.receptions.baseAmount)
      setFromAmount(neededAmounts.toString())

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        poolInfo?.parameters.baseToken,
        neededAmounts.toHexString()
      )
      setOutPrice(fromPrice[0])

      const priceIn = fromPrice[0].div(neededAmounts).mul(amount)

      setInPrice(priceIn)
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
    }, Number(process.env.REACT_APP_UPDATE_INTERVAL))

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
    <ExchangeInput
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
    <ExchangeInput
      customIcon={
        <Icon
          size={27}
          address={poolAddress}
          source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
        />
      }
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
            size={12}
            filled
            media={settings}
            onClick={() => setSlippageOpen(!isSlippageOpen)}
          />
          <IconButton size={10} filled media={close} onClick={() => {}} />
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

const InvestV2 = () => {
  const { poolAddress } = useParams<{
    poolAddress: string
  }>()

  const [
    { from, to },
    {
      allowance,
      isWalletPrompting,
      isSlippageOpen,
      slippage,
      error,
      direction,
      updateAllowance,
      setSlippageOpen,
      setSlippage,
      setError,
      setWalletPrompting,
      handleDirectionChange,
      handlePercentageChange,
      handleFromChange,
      handleSubmit,
    },
  ] = useCustomInvest({
    poolAddress,
    initialDirection: "deposit",
  })

  const isAllowanceNeeded =
    direction === "deposit" && !!allowance && allowance.lt(from.amount)

  const getButton = () => {
    if (from.amount === "0") {
      return (
        <SecondaryButton
          theme="disabled"
          size="large"
          onClick={() => {}}
          fz={22}
          full
        >
          Enter amount to swap
        </SecondaryButton>
      )
    }

    if (from.balance.lt(from.amount)) {
      return (
        <SecondaryButton theme="disabled" size="large" fz={22} full>
          Insufficient balance
        </SecondaryButton>
      )
    }

    if (isAllowanceNeeded) {
      return (
        <SecondaryButton size="large" onClick={updateAllowance} fz={22} full>
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
        {`Swap ${to.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <Card>
      <CardHeader>
        <Title>Swap</Title>
        <IconsGroup>
          <CircularProgress />
          <IconButton
            size={12}
            filled
            media={settings}
            onClick={() => setSlippageOpen(!isSlippageOpen)}
          />
          <IconButton size={10} filled media={close} onClick={() => {}} />
        </IconsGroup>
      </CardHeader>

      <ExchangeInput
        price={from.price}
        amount={from.amount}
        balance={from.balance}
        address={from.address}
        symbol={from.symbol}
        decimal={from.decimals}
        customIcon={from.icon}
        onChange={handleFromChange}
        isLocked={isAllowanceNeeded}
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      <ExchangeInput
        price={to.price}
        amount={to.amount}
        balance={to.balance}
        address={to.address}
        symbol={to.symbol}
        decimal={to.decimals}
        customIcon={to.icon}
      />

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
      <Header>{shortenAddress(poolAddress)}</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Payload
          isOpen={isWalletPrompting}
          toggle={() => setWalletPrompting(false)}
        />
        <TransactionError isOpen={!!error.length} toggle={() => setError("")}>
          {error}
        </TransactionError>
        {form}
      </Container>
    </>
  )
}

const InvestWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestV2 />
    </GraphProvider>
  )
}

export default InvestWithProvider
