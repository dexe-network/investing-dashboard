import { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"

import IconButton from "components/IconButton"
import ExchangeTo from "components/Exchange/To"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"
import TransactionError from "modals/TransactionError"

import useContract, { useERC20 } from "hooks/useContract"

import { PriceFeed, TraderPool } from "abi"
import { getDividedBalance } from "utils/formulas"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

import { selectPriceFeedAddress } from "state/contracts/selectors"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"
import { useRiskyProposal } from "hooks/useRiskyProposals"
import { usePool } from "state/pools/hooks"

export const useRiskyInvest = (): [
  {
    fromAmount: string
    toAmount: string
    slippage: string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    pending: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: string) => void
    setToAmount: (amount: string) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: () => void
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

  const setSlippageCallback = useCallback(
    (slippage: string): void => setSlippage(slippage),
    []
  )

  const setToAddressCallback = useCallback(
    (address: string): void => setToAddress(address),
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

function InvestRiskyProposal() {
  const [
    { fromAmount, toAmount, direction, slippage },
    { setFromAmount, setToAmount, setDirection, setSlippage },
  ] = useRiskyInvest()

  const [fromAddress, setFromAddress] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))

  const [isSlippageOpen, setSlippageOpen] = useState(false)

  const { poolAddress, index } = useParams()

  const traderPool = useContract(poolAddress, TraderPool)
  const proposal = useRiskyProposal(poolAddress, index)
  const [, , , poolInfo] = usePool(poolAddress)
  console.log(proposal)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [, fromData] = useERC20(fromAddress)
  const [, toData] = useERC20(toAddress)

  // TODO: check last changed input (from || to)
  const handleSubmit = async () => {}

  const handlePercentageChange = (percent) => {
    const from = getDividedBalance(fromBalance, fromData?.decimals, percent)
    handleFromChange(from)
  }

  const handleFromChange = (v: string) => {
    setFromAmount(v)

    const fetchAndUpdateTo = async () => {
      const amount = BigNumber.from(v)

      const exchange = await traderPool?.getExchangeFromExactAmount(
        fromAddress,
        toAddress,
        amount.toHexString(),
        []
      )
      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        fromAddress,
        amount.toHexString()
      )
      const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
        toAddress,
        exchange.minAmountOut.toHexString()
      )
      setToAmount(exchange.minAmountOut.toString())
      setInPrice(fromPrice.amountOut)
      setOutPrice(toPrice.amountOut)
    }

    fetchAndUpdateTo().catch(console.error)
  }

  const handleToChange = (v: string) => {
    setToAmount(v)

    const fetchAndUpdateFrom = async () => {
      const amount = BigNumber.from(v)

      const exchange = await traderPool?.getExchangeToExactAmount(
        fromAddress,
        toAddress,
        amount.toHexString(),
        []
      )

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        toAddress,
        amount
      )
      const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
        fromAddress,
        exchange.maxAmountIn
      )
      setFromAmount(exchange.maxAmountIn.toString())
      setInPrice(fromPrice.amountOut)
      setOutPrice(toPrice.amountOut)
    }

    fetchAndUpdateFrom().catch(console.error)
  }

  const getButton = () => {
    if (fromAmount === "0" || toAmount === "0") {
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

    return (
      <Button
        size="large"
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={handleSubmit}
        fz={22}
        full
      >
        {direction === "deposit"
          ? `Buy ${toData?.symbol}`
          : `Sell ${fromData?.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <Card>
      <CardHeader>
        <Flex>
          <Title>Swap</Title>
        </Flex>
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

      <ExchangeFrom
        price={inPrice}
        amount={fromAmount}
        balance={fromBalance}
        symbol={poolInfo?.ticker}
        decimal={18}
        onChange={handleFromChange}
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      <ExchangeTo
        price={outPrice}
        amount={toAmount}
        balance={toBalance}
        address={toAddress}
        symbol={toData?.symbol}
        decimal={toData?.decimals}
        onChange={handleToChange}
      />

      {button}

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
      <Header>Invest risky proposal</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {form}
      </Container>
    </>
  )
}

export default InvestRiskyProposal
