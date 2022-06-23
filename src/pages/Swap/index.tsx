import { useCallback } from "react"
import { Flex } from "theme"
import { useParams, useNavigate } from "react-router-dom"

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
} from "components/Exchange/styled"

import useSwap from "./useSwap"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const Swap = () => {
  const navigate = useNavigate()
  const { poolType, poolToken, inputToken, outputToken } = useParams()
  const [
    { from, to },
    {
      gasPrice,
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

      <SwapPrice
        fromSymbol={from.symbol}
        toSymbol={to.symbol}
        tokensCost={oneTokenCost}
        usdCost={oneUSDCost}
        gasPrice={gasPrice}
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
      <Swap />
    </GraphProvider>
  )
}
