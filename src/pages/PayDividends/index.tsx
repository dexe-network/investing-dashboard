import { Flex } from "theme"
import { useNavigate, useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import IconButton from "components/IconButton"
import ExchangeInput from "components/Exchange/ExchangeInput"
import RiskyInvestInput from "components/Exchange/RiskyInvestInput"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"
import TokenSelect from "modals/TokenSelect"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

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

import usePayDividends from "./usePayDividends"
import { useMemo, useState } from "react"
import SwapPrice from "components/SwapPrice"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

function PayDividends() {
  const { poolAddress, proposalId, tokenAddress } = useParams()
  const navigate = useNavigate()
  const [isOpen, setTokenSelectOpen] = useState(false)
  const [
    {
      form: { from, to },
      isSlippageOpen,
      oneTokenCost,
      usdTokenCost,
      gasPrice,
      fromAmount,
      toAmount,
      direction,
      slippage,
    },
    {
      setDirection,
      setSlippageOpen,
      setSlippage,
      handleFromChange,
      handleSubmit,
      handlePercentageChange,
      handleDividendTokenSelect,
    },
  ] = usePayDividends(poolAddress, proposalId)

  const openTokenSelect = () => {
    setTokenSelectOpen(true)
  }

  const closeTokenSelect = () => {
    setTokenSelectOpen(false)
  }

  const button = useMemo(() => {
    if (!from.address) {
      return (
        <SecondaryButton theme="disabled" size="large" fz={22} full>
          Select token
        </SecondaryButton>
      )
    }

    if (fromAmount === "0" || toAmount === "0") {
      return (
        <SecondaryButton
          theme="disabled"
          size="large"
          onClick={handleSubmit}
          fz={22}
          full
        >
          Enter amount
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
        Pay dividends
      </Button>
    )
  }, [direction, from.address, fromAmount, handleSubmit, toAmount])

  const lastDividends = useMemo(() => {
    return (
      <Flex gap="4">
        <InfoGrey>0 DEXE</InfoGrey>
      </Flex>
    )
  }, [])

  const lastDividendsContent = useMemo(() => {
    return (
      <>
        <InfoRow>
          <InfoGrey>Feb 12,2021</InfoGrey>
          <Flex gap="4">
            <InfoWhite>0</InfoWhite>
            <InfoGrey>DEXE</InfoGrey>
          </Flex>
        </InfoRow>
      </>
    )
  }, [])

  const proposalTVL = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Proposal TVL</InfoGrey>
        <Flex gap="4">
          <InfoWhite>0 DEXE</InfoWhite>
          <InfoGrey>($0)</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [])

  const APR = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>APR after dividend</InfoGrey>
        <Flex gap="4">
          <InfoWhite>13.32%</InfoWhite>
          <InfoGrey>($134)</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [])

  const form = (
    <Card>
      <CardHeader>
        <Flex>
          <Title active>Pay dividends</Title>
        </Flex>
        <IconsGroup>
          <CircularProgress />
          <IconButton size={10} filled media={close} onClick={() => {}} />
        </IconsGroup>
      </CardHeader>

      <ExchangeInput
        price={from.price}
        amount={from.amount}
        balance={from.balance}
        address={from.address}
        symbol={from.symbol}
        customIcon={from.icon}
        decimal={from.decimals}
        onChange={handleFromChange}
        onSelect={openTokenSelect}
      />

      <ExchangeDivider
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      <ExchangeInput
        price={to.price}
        amount={to.amount}
        balance={to.balance}
        address={to.address}
        symbol={to.symbol}
        customIcon={to.icon}
        decimal={to.decimals}
      />

      <Flex full p="16px 0 0">
        {button}
      </Flex>

      <InfoCard gap="12">
        {proposalTVL}
        {APR}
        <InfoDropdown
          left={<InfoGrey>Last paid dividend Jun 12,2022</InfoGrey>}
          right={lastDividends}
        >
          {lastDividendsContent}
        </InfoDropdown>
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
      <Header>Withdraw funds</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {form}
      </Container>
      <TokenSelect
        onSelect={handleDividendTokenSelect}
        isOpen={isOpen}
        onClose={closeTokenSelect}
      />
    </>
  )
}

const PayDividendsWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <PayDividends />
    </GraphProvider>
  )
}

export default PayDividendsWithProvider
