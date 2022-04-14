import { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"

import SwapPrice from "components/SwapPrice"
import IconButton from "components/IconButton"
import ExchangeTo from "components/Exchange/To"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"

import useContract, { useERC20 } from "hooks/useContract"

import { createClient, Provider as GraphProvider } from "urql"
import { PriceFeed } from "abi"
import { getDividedBalance } from "utils/formulas"
import { calcSlippage, isAddress } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

import { Container, Card, CardHeader, Title, IconsGroup } from "./styled"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import { usePool } from "state/pools/hooks"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

export const useSwap = (): [
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

function Swap() {
  const navigate = useNavigate()
  const [
    { fromAmount, toAmount, direction, slippage },
    { setFromAmount, setToAmount, setDirection, setSlippage },
  ] = useSwap()

  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))
  const [oneTokenCost, setTokenCost] = useState(BigNumber.from("0"))
  const [oneUSDCost, setUSDCost] = useState(BigNumber.from("0"))

  const [isSlippageOpen, setSlippageOpen] = useState(false)

  const { poolAddress, outputTokenAddress } = useParams()

  const [traderPool, poolData, , poolInfoData] = usePool(poolAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [, fromData] = useERC20(poolData?.baseToken)
  const [, toData] = useERC20(outputTokenAddress)

  const isToAddressTokenValid = isAddress(outputTokenAddress || "")

  // read and update balances
  useEffect(() => {
    if (
      !poolInfoData ||
      !poolInfoData.baseAndPositionBalances ||
      !poolInfoData.baseAndPositionBalances.length ||
      !poolInfoData.openPositions ||
      !poolInfoData.openPositions.length ||
      !outputTokenAddress ||
      !isToAddressTokenValid
    )
      return

    const positionIndex = poolInfoData.openPositions
      .map((address) => address.toLocaleLowerCase())
      .indexOf(outputTokenAddress.toLocaleLowerCase())

    setFromBalance(poolInfoData.baseAndPositionBalances[0])

    if (positionIndex !== -1) {
      setToBalance(poolInfoData.baseAndPositionBalances[positionIndex + 1])
    }
  }, [poolInfoData, outputTokenAddress, isToAddressTokenValid])

  // read and update prices
  useEffect(() => {
    if (
      !traderPool ||
      !priceFeed ||
      !poolData?.baseToken ||
      !outputTokenAddress ||
      !isToAddressTokenValid
    )
      return
    const from = poolData?.baseToken
    const to = outputTokenAddress
    const amount = ethers.utils.parseUnits("1", 18)

    ;(async () => {
      const tokensCost: BigNumber = await traderPool?.getExchangeToExactAmount(
        from,
        to,
        amount.toHexString(),
        []
      )
      const usdCost: BigNumber = await priceFeed?.getNormalizedPriceOutUSD(
        to,
        amount.toHexString(),
        []
      )
      setTokenCost(tokensCost)
      setUSDCost(usdCost)
    })()
  }, [
    traderPool,
    priceFeed,
    outputTokenAddress,
    poolData,
    isToAddressTokenValid,
  ])

  const handleSubmit = async () => {
    if (direction === "deposit") {
      ;(async () => {
        try {
          const from = poolData?.baseToken
          const to = outputTokenAddress
          const amount = BigNumber.from(fromAmount)

          const exchange: BigNumber =
            await traderPool?.getExchangeFromExactAmount(
              from,
              to,
              amount.toHexString(),
              []
            )

          const sl = 1 - parseFloat(slippage) / 100
          const exchangeWithSlippage = calcSlippage(exchange, 18, sl)

          const receipt = await traderPool?.exchangeFromExact(
            from,
            to,
            amount.toHexString(),
            exchangeWithSlippage.toHexString(),
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
          const from = poolData?.baseToken
          const to = outputTokenAddress
          const amount = BigNumber.from(fromAmount)

          const exchange: BigNumber =
            await traderPool?.getExchangeToExactAmount(
              from,
              to,
              amount.toHexString(),
              []
            )

          const sl = 1 + parseFloat(slippage) / 100
          const exchangeWithSlippage = calcSlippage(exchange, 18, sl)

          console.log({
            from,
            to,
            amount: amount.toString(),
            exchange: exchange.toString(),
            exchangeWithSlippage: exchangeWithSlippage.toString(),
          })

          const receipt = await traderPool?.exchangeToExact(
            from,
            to,
            amount.toHexString(),
            exchangeWithSlippage.toHexString(),
            []
          )
          console.log(receipt)
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

  const handleFromChange = (v: string) => {
    setFromAmount(v)

    const fetchAndUpdateTo = async () => {
      const from = poolData?.baseToken
      const to = outputTokenAddress
      const amount = BigNumber.from(v)

      const exchange: BigNumber = await traderPool?.getExchangeFromExactAmount(
        from,
        to,
        amount.toHexString(),
        []
      )
      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        from,
        amount.toHexString(),
        []
      )
      const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
        to,
        exchange.toHexString(),
        []
      )
      setToAmount(exchange.toString())
      setInPrice(fromPrice)
      setOutPrice(toPrice)
    }

    if (!isToAddressTokenValid) return

    fetchAndUpdateTo().catch(console.error)
  }

  const handleToChange = (v: string) => {
    setToAmount(v)
    const fetchAndUpdateFrom = async () => {
      const from = poolData?.baseToken
      const to = outputTokenAddress
      const amount = BigNumber.from(v)

      const exchange = await traderPool?.getExchangeToExactAmount(
        from,
        to,
        amount.toHexString(),
        []
      )

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
      setFromAmount(exchange.toString())
      setInPrice(fromPrice)
      setOutPrice(toPrice)
    }

    if (!isToAddressTokenValid) return
    fetchAndUpdateFrom().catch(console.error)
  }

  const getButton = () => {
    // const amountIn = ethers.utils.parseUnits(fromAmount.toString(), 18)
    // const amountOut = ethers.utils.parseUnits(toAmount.toString(), 18)

    // const isAmountInValid = direction === "deposit" && amountIn.gt(fromBalance)
    // const isAmountOutValid = direction === "withdraw" && amountOut.gt(toBalance)

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

      {direction === "deposit" ? (
        <ExchangeFrom
          price={inPrice}
          amount={fromAmount}
          balance={fromBalance}
          address={poolData?.baseToken}
          symbol={fromData?.symbol}
          decimal={fromData?.decimals}
          onChange={handleFromChange}
        />
      ) : (
        <ExchangeFrom
          price={outPrice}
          amount={toAmount}
          balance={toBalance}
          address={outputTokenAddress}
          symbol={toData?.symbol}
          decimal={toData?.decimals}
          onSelect={() => navigate(`/select-token/whitelist/${poolAddress}`)}
          onChange={handleToChange}
        />
      )}

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      {direction === "deposit" ? (
        <ExchangeTo
          price={outPrice}
          priceChange24H={0}
          amount={toAmount}
          balance={BigNumber.from(toBalance)}
          address={outputTokenAddress}
          symbol={toData?.symbol}
          decimal={toData?.decimals}
          onSelect={() => navigate(`/select-token/whitelist/${poolAddress}`)}
          onChange={handleToChange}
        />
      ) : (
        <ExchangeTo
          price={inPrice}
          priceChange24H={0}
          amount={fromAmount}
          balance={BigNumber.from(fromBalance)}
          address={poolData?.baseToken}
          symbol={fromData?.symbol}
          decimal={fromData?.decimals}
          onChange={handleFromChange}
        />
      )}

      <Flex p="16px 0" full>
        <SwapPrice
          fromSymbol={fromData?.symbol}
          toSymbol={toData?.symbol}
          tokensCost={oneTokenCost}
          usdCost={oneUSDCost}
        />
      </Flex>

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
    <GraphProvider value={poolsClient}>
      <Swap />
    </GraphProvider>
  )
}
