import { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"

import SwapPrice from "components/SwapPrice"
import IconButton from "components/IconButton"
import ExchangeTo from "components/Exchange/To"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { BorderedButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"

import useContract, { useERC20 } from "hooks/useContract"

import { createClient, Provider as GraphProvider } from "urql"
import { PriceFeed } from "abi"
import { getDividedBalance } from "utils/formulas"
import { formatBigNumber } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

import { Container, Card, CardHeader, Title, IconsGroup } from "./styled"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import { useBasicPool } from "state/pools/hooks"

const basicPoolsClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/volodymyrzolotukhin/dexe-chapel-basic-pool",
})

export const useSwap = (): [
  {
    fromAmount: number | string
    toAmount: number | string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    pending: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: number | string) => void
    setToAmount: (amount: number | string) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: () => void
    setPercentage: (v: number) => void
    setToSelector: (state: boolean) => void
    setFromSelector: (state: boolean) => void
  }
] => {
  const { library } = useWeb3React()

  const [fromAmount, setFromAmount] = useState(0.0)
  const [toAmount, setToAmount] = useState(0.0)
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
    (amount: number | string): void =>
      setFromAmount(parseFloat(amount.toString()) || 0.0),
    []
  )

  const setToAmountCallback = useCallback(
    (amount: number | string): void =>
      setToAmount(parseFloat(amount.toString()) || 0.0),
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
    },
  ]
}

function Swap() {
  const history = useHistory()
  const [
    { fromAmount, toAmount, direction },
    { setFromAmount, setToAmount, setDirection },
  ] = useSwap()

  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))

  const [isSlippageOpen, setSlippageOpen] = useState(false)

  const { poolAddress, outputTokenAddress } = useParams()

  const [traderPool, poolData, , poolInfoData] = useBasicPool(poolAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [, fromData] = useERC20(poolData?.baseToken)
  const [, toData] = useERC20(outputTokenAddress)

  // read and update balances
  useEffect(() => {
    if (
      !poolInfoData ||
      !poolInfoData.baseAndPositionBalances ||
      !poolInfoData.baseAndPositionBalances.length ||
      !poolInfoData.openPositions ||
      !poolInfoData.openPositions.length ||
      !outputTokenAddress
    )
      return

    const positionIndex = poolInfoData.openPositions
      .map((address) => address.toLocaleLowerCase())
      .indexOf(outputTokenAddress.toLocaleLowerCase())
    setFromBalance(poolInfoData.baseAndPositionBalances[0])
    if (positionIndex !== -1) {
      setToBalance(poolInfoData.baseAndPositionBalances[positionIndex + 1])
    }
  }, [poolInfoData, outputTokenAddress])

  const handleSubmit = async () => {
    if (direction === "deposit") {
      ;(async () => {
        try {
          const from = poolData?.baseToken
          const to = outputTokenAddress
          const amount = ethers.utils.parseUnits(fromAmount.toString(), 18)

          const exchange = await traderPool?.getExchangeFromExactAmount(
            from,
            to,
            amount,
            []
          )
          const receipt = await traderPool?.exchangeFromExact(
            from,
            to,
            amount,
            exchange,
            []
          )
          console.log(receipt)
        } catch (e) {
          console.log(e)
        }
      })()
    } else {
      ;(async () => {
        try {
          // const amountOutBn = ethers.utils.parseUnits(toAmount.toString(), 18)
          // console.log(amountOutBn)
          // const divest = await traderPool?.getDivestAmountsAndCommissions(
          //   account,
          //   amountOutBn.toHexString()
          // )
          // const divestResult = await traderPool?.divest(
          //   amountOutBn.toHexString(),
          //   divest.receptions.receivedAmounts,
          //   divest.commissions.dexeDexeCommission
          // )
          // console.log("withdraw: ", divestResult)
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }

  const handlePercentageChange = (percent) => {
    if (direction === "deposit") {
      const from = getDividedBalance(fromBalance, fromData?.decimals, percent)
      handleFromChange(from)
    } else {
      const to = getDividedBalance(toBalance, toData?.decimals, percent)
      handleToChange(to)
    }
  }

  const handleFromChange = (v) => {
    setFromAmount(v)

    const fetchAndUpdateTo = async () => {
      const from = poolData?.baseToken
      const to = outputTokenAddress
      const amount = ethers.utils.parseUnits(v.toString(), 18)

      const exchange = await traderPool?.getExchangeFromExactAmount(
        from,
        to,
        amount,
        []
      )
      const outAmount = formatBigNumber(exchange, 18, 8)

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        from,
        amount,
        []
      )
      const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
        to,
        exchange,
        []
      )
      setToAmount(outAmount)
      setInPrice(fromPrice)
      setOutPrice(toPrice)
      console.log(fromPrice)
      console.log(toPrice)
    }

    fetchAndUpdateTo().catch(console.error)
  }

  const handleToChange = (v) => {
    setToAmount(v)
    const fetchAndUpdateFrom = async () => {
      const from = poolData?.baseToken
      const to = outputTokenAddress
      const amount = ethers.utils.parseUnits(v.toString(), 18)

      const exchange = await traderPool?.getExchangeToExactAmount(
        from,
        to,
        amount,
        []
      )

      const outAmount = formatBigNumber(exchange, 18, 8)

      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        to,
        amount,
        []
      )
      const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
        from,
        exchange,
        []
      )
      setFromAmount(outAmount)
      setInPrice(fromPrice)
      setOutPrice(toPrice)
    }

    fetchAndUpdateFrom().catch(console.error)
  }

  const getButton = () => {
    const amountIn = ethers.utils.parseUnits(fromAmount.toString(), 18)
    const amountOut = ethers.utils.parseUnits(toAmount.toString(), 18)

    const isAmountInValid = direction === "deposit" && amountIn.gt(fromBalance)
    const isAmountOutValid = direction === "withdraw" && amountOut.gt(toBalance)

    if (isAmountInValid || isAmountOutValid) {
      return <BorderedButton size="big">Inufficient funds</BorderedButton>
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
          : `Sell ${toData?.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <Card>
      <CardHeader>
        <Title>Open new trade</Title>
        <IconsGroup>
          <CircularProgress />
          <IconButton
            media={settings}
            onClick={() => setSlippageOpen(!isSlippageOpen)}
          />
          <IconButton media={close} onClick={() => {}} />
        </IconsGroup>
      </CardHeader>

      <ExchangeFrom
        price={inPrice}
        amount={fromAmount}
        balance={fromBalance}
        address={poolData?.baseToken}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
        isStable
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      <ExchangeTo
        price={outPrice}
        priceChange24H={0}
        amount={toAmount}
        balance={BigNumber.from(toBalance)}
        address={outputTokenAddress}
        symbol={toData?.symbol}
        decimal={toData?.decimals}
        isPool
        onSelect={() => history.push(`/select-token/whitelist/${poolAddress}`)}
        onChange={handleToChange}
      />

      <Flex p="16px 0" full>
        <SwapPrice />
      </Flex>

      {button}

      <TransactionSlippage
        isOpen={isSlippageOpen}
        toggle={(v) => setSlippageOpen(v)}
      />
    </Card>
  )

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {form}
    </Container>
  )
}

export default function SwapWithProvider() {
  return (
    <GraphProvider value={basicPoolsClient}>
      <Swap />
    </GraphProvider>
  )
}
