import { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"

import SwapPrice from "components/SwapPrice"
import IconButton from "components/IconButton"
import ExchangeInput from "components/Exchange/ExchangeInput"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"
import TransactionError from "modals/TransactionError"

import useContract, { useERC20 } from "hooks/useContract"
import { useTraderPool, usePoolContract } from "hooks/usePool"
import { ExchangeType } from "constants/interfaces_v2"

import { createClient, Provider as GraphProvider } from "urql"
import { PriceFeed } from "abi"
import { getDividedBalance, getPriceImpact } from "utils/formulas"
import { calcSlippage, isAddress, parseTransactionError } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"
import plus from "assets/icons/plus.svg"

import { selectPriceFeedAddress } from "state/contracts/selectors"
import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { TradeType, SwapDirection } from "constants/types"

import useSwapV2 from "./useSwap"
import Payload from "components/Payload"

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
    direction: SwapDirection
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
  const [direction, setDirection] = useState<SwapDirection>("deposit")

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

  const { poolType, poolToken, inputToken, outputToken } = useParams()

  const traderPool = useTraderPool(poolToken)
  const [, poolInfoData, refresh] = usePoolContract(poolToken)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [, fromToken] = useERC20(poolInfoData?.parameters.baseToken)
  const [, toToken] = useERC20(outputToken)

  const fromData = direction === "deposit" ? fromToken : toToken
  const toData = direction === "deposit" ? toToken : fromToken

  const handleProposalRedirect = () => {
    if (poolType === "INVEST_POOL") {
      navigate(`/create-invest-proposal/${poolToken}`)
    } else {
      navigate(`/create-risky-proposal/${poolToken}/0x/1`)
    }
  }

  // TODO: check last changed input (from || to)
  const handleSubmit = async () => {
    if (direction === "deposit") {
      ;(async () => {
        try {
          const from = poolInfoData?.parameters.baseToken
          const to = outputToken
          const amount = BigNumber.from(fromAmount)

          const exchange = await traderPool?.getExchangeAmount(
            from,
            to,
            amount.toHexString(),
            [],
            ExchangeType.FROM_EXACT
          )

          const sl = 1 - parseFloat(slippage) / 100
          const exchangeWithSlippage = calcSlippage(exchange[0], 18, sl)

          const transactionResponse = await traderPool?.exchange(
            from,
            to,
            amount.toHexString(),
            exchangeWithSlippage.toHexString(),
            [],
            ExchangeType.FROM_EXACT
          )

          addTransaction(transactionResponse, {
            type: TransactionType.SWAP,
            tradeType: TradeType.EXACT_INPUT,
            inputCurrencyId: from,
            inputCurrencyAmountRaw: amount.toHexString(),
            expectedOutputCurrencyAmountRaw: exchange[0].toHexString(),
            outputCurrencyId: to,
            minimumOutputCurrencyAmountRaw: exchangeWithSlippage.toHexString(),
          })
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
          const from = outputToken
          const to = poolInfoData?.parameters.baseToken
          const amount = BigNumber.from(fromAmount)

          const exchange = await traderPool?.getExchangeAmount(
            from,
            to,
            amount.toHexString(),
            [],
            ExchangeType.FROM_EXACT
          )

          const sl = 1 - parseFloat(slippage) / 100
          const exchangeWithSlippage = calcSlippage(exchange[0], 18, sl)

          const transactionResponse = await traderPool?.exchange(
            from,
            to,
            amount.toHexString(),
            exchangeWithSlippage.toHexString(),
            [],
            ExchangeType.FROM_EXACT
          )

          addTransaction(transactionResponse, {
            type: TransactionType.SWAP,
            tradeType: TradeType.EXACT_OUTPUT,
            inputCurrencyId: from,
            outputCurrencyAmountRaw: amount.toHexString(),
            expectedInputCurrencyAmountRaw: exchange[0].toHexString(),
            outputCurrencyId: to,
            minimumInputCurrencyAmountRaw: exchangeWithSlippage.toHexString(),
          })
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
    handleFromChange(from.toString())
  }

  const handleFromChange = useCallback(
    (v: string) => {
      setFromAmount(v)

      const fetchAndUpdateTo = async () => {
        const amount = BigNumber.from(v)

        const exchange = await traderPool?.getExchangeAmount(
          fromAddress,
          toAddress,
          amount.toHexString(),
          [],
          ExchangeType.FROM_EXACT
        )
        const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
          fromAddress,
          amount.toHexString()
        )
        const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
          toAddress,
          exchange[0].toHexString()
        )
        setToAmount(exchange[0].toString())
        setInPrice(fromPrice[0])
        setOutPrice(toPrice[0])

        updatePriceImpact(fromPrice[0], toPrice[0])
      }

      if (!isAddress(fromAddress) || !isAddress(toAddress)) return

      fetchAndUpdateTo().catch(console.error)
    },
    [traderPool, priceFeed, fromAddress, toAddress, setFromAmount, setToAmount]
  )

  const handleToChange = useCallback(
    (v: string) => {
      setToAmount(v)

      const fetchAndUpdateFrom = async () => {
        const amount = BigNumber.from(v)

        const exchange = await traderPool?.getExchangeAmount(
          fromAddress,
          toAddress,
          amount.toHexString(),
          [],
          ExchangeType.TO_EXACT
        )

        const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
          toAddress,
          amount
        )
        const toPrice = await priceFeed?.getNormalizedPriceOutUSD(
          fromAddress,
          exchange[0]
        )
        setFromAmount(exchange[0].toString())
        setInPrice(fromPrice[0])
        setOutPrice(toPrice[0])

        updatePriceImpact(fromPrice[0], toPrice[0])
      }

      if (!isAddress(fromAddress) || !isAddress(toAddress)) return
      fetchAndUpdateFrom().catch(console.error)
    },
    [traderPool, priceFeed, fromAddress, toAddress, setFromAmount, setToAmount]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      refresh()
    }, Number(process.env.REACT_APP_UPDATE_INTERVAL))

    return () => clearInterval(interval)
  }, [refresh])

  // watch and update from/to addresses
  useEffect(() => {
    if (!outputToken || !poolInfoData) return

    if (
      direction === "deposit" &&
      fromAddress !== poolInfoData.parameters.baseToken
    ) {
      setFromAddress(poolInfoData.parameters.baseToken)
      setToAddress(outputToken)
      setFromAmount(toAmount)
      setToAmount(fromAmount)
    }

    if (direction === "withdraw" && fromAddress !== outputToken) {
      setToAddress(poolInfoData.parameters.baseToken)
      setFromAddress(outputToken)
      setFromAmount(toAmount)
      setToAmount(fromAmount)
    }
  }, [
    direction,
    outputToken,
    poolInfoData,
    fromAddress,
    fromAmount,
    toAmount,
    setFromAmount,
    setToAmount,
  ])

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
  }, [poolInfoData, outputToken, direction])

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
      .indexOf((outputToken || "").toLocaleLowerCase())

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
  }, [poolInfoData, outputToken, direction])

  // read and update prices
  useEffect(() => {
    if (!traderPool || !priceFeed || !fromAddress || !toAddress) return

    const amount = ethers.utils.parseUnits("1", 18)

    const fetchAndUpdatePrices = async () => {
      const tokensCost = await traderPool?.getExchangeAmount(
        fromAddress,
        toAddress,
        amount.toHexString(),
        [],
        ExchangeType.TO_EXACT
      )
      const usdCost = await priceFeed?.getNormalizedPriceOutUSD(
        toAddress,
        amount.toHexString()
      )
      setTokenCost(tokensCost[0])
      setUSDCost(usdCost[0])
    }

    if (!isAddress(fromAddress) || !isAddress(toAddress)) return
    fetchAndUpdatePrices().catch(console.error)
  }, [traderPool, priceFeed, fromAddress, toAddress])

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

      <ExchangeInput
        price={inPrice}
        amount={fromAmount}
        balance={fromBalance}
        address={fromAddress}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onSelect={() =>
          navigate(`/select-token/${poolType}/${poolToken}/from/${outputToken}`)
        }
        onChange={handleFromChange}
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      <ExchangeInput
        price={outPrice}
        amount={toAmount}
        priceImpact={priceImpact}
        balance={toBalance}
        address={toAddress}
        symbol={toData?.symbol}
        decimal={toData?.decimals}
        onSelect={() =>
          navigate(`/select-token/${poolType}/${poolToken}/to/${inputToken}`)
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
      <Header>{poolInfoData?.name}</Header>
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

const SwapV2 = () => {
  const navigate = useNavigate()
  const { poolType, poolToken, inputToken, outputToken } = useParams()
  const [
    { from, to },
    {
      error,
      oneTokenCost,
      oneUSDCost,
      isSlippageOpen,
      isWalletPrompting,
      slippage,
      setError,
      setWalletPrompting,
      setSlippage,
      setSlippageOpen,
      handleFromChange,
      handleToChange,
      handleSubmit,
      handlePercentageChange,
    },
  ] = useSwapV2({
    pool: poolToken,
    from: inputToken,
    to: outputToken,
  })

  const handleDirectionChange = useCallback(() => {
    navigate(
      `/pool/swap/${poolType}/${poolToken}/${to.address}/${from.address}`
    )
  }, [from, navigate, poolToken, poolType, to])

  const handleProposalRedirect = () => {
    if (poolType === "INVEST_POOL") {
      navigate(`/create-invest-proposal/${poolToken}`)
    } else {
      navigate(`/create-risky-proposal/${poolToken}/0x/1`)
    }
  }

  const getButton = () => {
    if (from.amount === "0" || to.amount === "0") {
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
      <Button size="large" theme="primary" onClick={handleSubmit} fz={22} full>
        Swap
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

      <ExchangeInput
        price={from.price}
        amount={from.amount}
        balance={from.balance}
        address={from.address}
        symbol={from.symbol}
        decimal={from.decimals}
        onSelect={() =>
          navigate(`/select-token/${poolType}/${poolToken}/from/${outputToken}`)
        }
        onChange={handleFromChange}
      />

      <ExchangeDivider
        direction="deposit"
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
        onSelect={() =>
          navigate(`/select-token/${poolType}/${poolToken}/to/${inputToken}`)
        }
        onChange={handleToChange}
      />

      <SwapPrice
        fromSymbol={from.symbol}
        toSymbol={to.symbol}
        tokensCost={oneTokenCost}
        usdCost={oneUSDCost}
      />

      <Flex full p="16px 0 0">
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
      <Header>Swap</Header>
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

export default function SwapWithProvider() {
  return (
    <GraphProvider value={poolsClient}>
      <SwapV2 />
    </GraphProvider>
  )
}
