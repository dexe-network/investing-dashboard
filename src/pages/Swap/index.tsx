import { useCallback, useMemo } from "react"
import { Flex } from "theme"
import { useParams, useNavigate } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import SwapPrice from "components/SwapPrice"
import IconButton from "components/IconButton"
import ExchangeInput from "components/Exchange/ExchangeInput"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"
import Payload from "components/Payload"
import TransactionError from "modals/TransactionError"

import { createClient, Provider as GraphProvider } from "urql"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"
import plus from "assets/icons/plus.svg"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
  InfoCard,
  InfoRow,
  InfoGrey,
  InfoDropdown,
  InfoWhite,
} from "components/Exchange/styled"

import { SwapPriceBody } from "./styled"

import useSwap from "./useSwap"
import { cutDecimalPlaces, fromBig } from "utils"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const Swap = () => {
  const navigate = useNavigate()
  const { poolType, poolToken, inputToken, outputToken } = useParams()
  const [
    { from, to },
    {
      direction,
      gasPrice,
      error,
      receivedAfterSlippage,
      priceImpact,
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
  ] = useSwap({
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

  const symbol = useMemo(() => {
    if (direction === "deposit") {
      return to.symbol ? (
        to.symbol
      ) : (
        <PulseSpinner color="#181E2C" size={14} loading />
      )
    }

    return from.symbol ? (
      from.symbol
    ) : (
      <PulseSpinner color="#181E2C" size={14} loading />
    )
  }, [direction, from.symbol, to.symbol])

  const button = useMemo(() => {
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
      <Button
        size="large"
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={handleSubmit}
        fz={22}
        full
      >
        {direction === "deposit" ? (
          <Flex gap="6">Buy token {symbol}</Flex>
        ) : (
          <Flex gap="6">Sell token {symbol}</Flex>
        )}
      </Button>
    )
  }, [from.amount, to.amount, direction, handleSubmit, symbol])

  const fundPNL = useMemo(() => {
    return (
      <Flex gap="4">
        <InfoWhite>+12.72 ISDX</InfoWhite>
        <InfoGrey>(+37.18%)</InfoGrey>
      </Flex>
    )
  }, [])

  const fundPNLContent = useMemo(() => {
    return (
      <>
        <InfoRow>
          <InfoGrey>in USD</InfoGrey>
          <InfoGrey>+1260 USD (+27.18%) </InfoGrey>
        </InfoRow>
        <InfoRow>
          <InfoGrey>Trader P&L</InfoGrey>
          <Flex gap="4">
            <InfoWhite>2.11 ISDX </InfoWhite>
            <InfoGrey>(+14%)</InfoGrey>
          </Flex>
        </InfoRow>
        <InfoRow>
          <InfoGrey>in USD</InfoGrey>
          <InfoGrey>+1260 USD (+27.18%) </InfoGrey>
        </InfoRow>
      </>
    )
  }, [])

  const averagePrice = useMemo(() => {
    if (direction === "deposit") {
      return (
        <InfoRow>
          <InfoGrey>Average buying price</InfoGrey>
          <Flex gap="4">
            <InfoWhite>0.01289</InfoWhite>
            <InfoGrey>WBNB</InfoGrey>
          </Flex>
        </InfoRow>
      )
    }

    return (
      <InfoRow>
        <InfoGrey>Average selling price</InfoGrey>
        <Flex gap="4">
          <InfoWhite>0.01289 </InfoWhite>
          <InfoGrey>WBNB</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [direction])

  const expectedOutput = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Expected Output:</InfoGrey>
        <Flex gap="4">
          <InfoWhite>
            {fromBig(cutDecimalPlaces(to.amount, to.decimals, false, 6))}
          </InfoWhite>
          <InfoGrey>{to.symbol}</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [to.amount, to.decimals, to.symbol])

  const priceImpactUI = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Price Impact:</InfoGrey>
        <Flex gap="4">
          <InfoWhite>{priceImpact}%</InfoWhite>
        </Flex>
      </InfoRow>
    )
  }, [priceImpact])

  const expectedOutputWithSlippage = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Received after slippage ({slippage}%)</InfoGrey>
        <Flex gap="4">
          <InfoWhite>
            {fromBig(cutDecimalPlaces(receivedAfterSlippage, 18, false, 6))}
          </InfoWhite>
          <InfoGrey>{to.symbol}</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [receivedAfterSlippage, slippage, to.symbol])

  const form = (
    <Card>
      <CardHeader>
        <Flex>
          <Title active>Swap</Title>
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

      {inputToken !== "0x" && outputToken !== "0x" && (
        <SwapPrice
          fromSymbol={from.symbol}
          toSymbol={to.symbol}
          tokensCost={oneTokenCost}
          usdCost={oneUSDCost}
          gasPrice={gasPrice}
          isExpandable
        >
          <SwapPriceBody>
            {expectedOutput}
            {priceImpactUI}
            {expectedOutputWithSlippage}
          </SwapPriceBody>
        </SwapPrice>
      )}

      <Flex full p="16px 0 0">
        {button}
      </Flex>

      <InfoCard gap="12">
        <InfoDropdown left={<InfoGrey>Fund P&L</InfoGrey>} right={fundPNL}>
          {fundPNLContent}
        </InfoDropdown>
        {averagePrice}
      </InfoCard>

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
      <Swap />
    </GraphProvider>
  )
}
