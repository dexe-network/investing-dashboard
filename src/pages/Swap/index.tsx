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
import Header from "components/Header/Layout"
import TransactionError from "modals/TransactionError"

import useContract, { useERC20 } from "hooks/useContract"

import { createClient, Provider as GraphProvider } from "urql"
import { PriceFeed } from "abi"
import { getDividedBalance, getPriceImpact } from "utils/formulas"
import { calcSlippage, isAddress, parseTransactionError } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"
import plus from "assets/icons/plus.svg"

import { selectPriceFeedAddress } from "state/contracts/selectors"
import { usePool } from "state/pools/hooks"
import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"
import getReceipt from "utils/getReceipt"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"

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
  const { library } = useWeb3React()
  const [
    { fromAmount, toAmount, direction, slippage },
    { setFromAmount, setToAmount, setDirection, setSlippage },
  ] = useSwap()

  const addTransaction = useTransactionAdder()

  const [error, setError] = useState("")
  const [fromAddress, setFromAddress] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))
  const [oneTokenCost, setTokenCost] = useState(BigNumber.from("0"))
  const [oneUSDCost, setUSDCost] = useState(BigNumber.from("0"))

  const [priceImpact, setPriceImpact] = useState("0")
  const [isSlippageOpen, setSlippageOpen] = useState(false)

  const { poolType, poolAddress, outputTokenAddress } = useParams()

  const [traderPool, poolData, , poolInfoData, updatePoolData] =
    usePool(poolAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [, fromData] = useERC20(fromAddress)
  const [, toData] = useERC20(toAddress)

  const isToAddressTokenValid = isAddress(outputTokenAddress || "")

  // watch and update from/to addresses
  useEffect(() => {
    if (!outputTokenAddress || !poolData || !poolData.baseToken) return

    if (direction === "deposit") {
      setFromAddress(poolData.baseToken)
      setToAddress(outputTokenAddress)
    }

    if (direction === "withdraw") {
      setToAddress(poolData.baseToken)
      setFromAddress(outputTokenAddress)
    }

    handleFromChange(toAmount)
  }, [direction, outputTokenAddress, poolData])

  // read and update pool base tokens balance
  useEffect(() => {
    if (
      !poolInfoData ||
      !poolInfoData.baseAndPositionBalances ||
      !poolInfoData.baseAndPositionBalances.length
    )
      return

    const baseTokenBalance = poolInfoData.baseAndPositionBalances[0]

    if (direction === "deposit") {
      setFromBalance(baseTokenBalance)
    }

    if (direction === "withdraw") {
      setToBalance(baseTokenBalance)
    }
  }, [poolInfoData, outputTokenAddress, direction])

  // read and update position balance
  useEffect(() => {
    if (
      !poolInfoData ||
      !poolInfoData.openPositions ||
      !poolInfoData.openPositions.length
    )
      return

    // find position index
    const positionIndex = poolInfoData.openPositions
      .map((address) => address.toLocaleLowerCase())
      .indexOf((outputTokenAddress || "").toLocaleLowerCase())

    const positionTokenBalance =
      positionIndex !== -1
        ? poolInfoData.baseAndPositionBalances[positionIndex + 1]
        : BigNumber.from("0")

    if (direction === "deposit") {
      setToBalance(positionTokenBalance)
    }

    if (direction === "withdraw") {
      setFromBalance(positionTokenBalance)
    }
  }, [poolInfoData, outputTokenAddress, direction])

  // read and update prices
  useEffect(() => {
    if (!traderPool || !priceFeed || !fromAddress || !toAddress) return

    const amount = ethers.utils.parseUnits("1", 18)

    const fetchAndUpdatePrices = async () => {
      const tokensCost = await traderPool?.getExchangeToExactAmount(
        fromAddress,
        toAddress,
        amount.toHexString(),
        []
      )
      const usdCost = await priceFeed?.getNormalizedPriceOutUSD(
        toAddress,
        amount.toHexString()
      )
      setTokenCost(tokensCost.maxAmountIn)
      setUSDCost(usdCost.amountOut)
    }

    fetchAndUpdatePrices().catch(console.error)
  }, [traderPool, priceFeed, fromAddress, toAddress])

  const handleProposalRedirect = () => {
    if (poolType === "INVEST_POOL") {
      navigate(`/create-invest-proposal/${poolAddress}`)
    } else {
      navigate(`/create-risky-proposal/${poolAddress}/0x/1`)
    }
  }

  // TODO: check last changed input (from || to)
  const handleSubmit = async () => {
    if (direction === "deposit") {
      ;(async () => {
        try {
          const from = poolData?.baseToken
          const to = outputTokenAddress
          const amount = BigNumber.from(fromAmount)

          const exchange = await traderPool?.getExchangeFromExactAmount(
            from,
            to,
            amount.toHexString(),
            []
          )

          const sl = 1 - parseFloat(slippage) / 100
          const exchangeWithSlippage = calcSlippage(
            exchange.minAmountOut,
            18,
            sl
          )

          const transactionResponse = await traderPool?.exchangeFromExact(
            from,
            to,
            amount.toHexString(),
            exchangeWithSlippage.toHexString(),
            []
          )
          const receipt = await getReceipt(library, transactionResponse.hash)
          addTransaction(receipt, { type: TransactionType.SWAP })

          updatePoolData()
        } catch (error: any) {
          if (!!error && !!error.data && !!error.data.message) {
            setError(error.data.message)
          } else {
            const errorMessage = parseTransactionError(error.toString())
            !!errorMessage && setError(errorMessage)
          }
        }
      })()
    } else {
      ;(async () => {
        try {
          const from = outputTokenAddress
          const to = poolData?.baseToken
          const amount = BigNumber.from(fromAmount)

          const exchange = await traderPool?.getExchangeFromExactAmount(
            from,
            to,
            amount.toHexString(),
            []
          )

          const sl = 1 - parseFloat(slippage) / 100
          const exchangeWithSlippage = calcSlippage(
            exchange.minAmountOut,
            18,
            sl
          )

          const transactionResponse = await traderPool?.exchangeFromExact(
            from,
            to,
            amount.toHexString(),
            exchangeWithSlippage.toHexString(),
            []
          )
          await getReceipt(library, transactionResponse.hash)
          updatePoolData()
        } catch (error: any) {
          if (!!error && !!error.data && !!error.data.message) {
            setError(error.data.message)
          } else {
            const errorMessage = parseTransactionError(error.toString())
            !!errorMessage && setError(errorMessage)
          }
        }
      })()
    }
  }

  const updatePriceImpact = (from: BigNumber, to: BigNumber) => {
    const f = ethers.utils.formatUnits(from, 18)
    const t = ethers.utils.formatUnits(to, 18)

    const result = getPriceImpact(parseFloat(f), parseFloat(t))
    setPriceImpact(result.toFixed(4))
  }

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

      updatePriceImpact(fromPrice.amountOut, toPrice.amountOut)
    }

    if (!isToAddressTokenValid) return

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

      updatePriceImpact(fromPrice.amountOut, toPrice.amountOut)
    }

    if (!isToAddressTokenValid) return
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
          <IconButton
            size={9}
            filled
            media={plus}
            onClick={handleProposalRedirect}
          />
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
        address={fromAddress}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onSelect={
          direction === "withdraw"
            ? () => navigate(`/select-token/${poolType}/${poolAddress}`)
            : undefined
        }
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
        priceImpact={priceImpact}
        balance={toBalance}
        address={toAddress}
        symbol={toData?.symbol}
        decimal={toData?.decimals}
        onSelect={
          direction === "deposit"
            ? () => navigate(`/select-token/${poolType}/${poolAddress}`)
            : undefined
        }
        onChange={handleToChange}
      />

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
    <>
      <Header>{poolData?.name}</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {form}
      </Container>
      <TransactionError isOpen={!!error.length} toggle={() => setError("")}>
        {error}
      </TransactionError>
    </>
  )
}

export default function SwapWithProvider() {
  return (
    <GraphProvider value={poolsClient}>
      <Swap />
    </GraphProvider>
  )
}
