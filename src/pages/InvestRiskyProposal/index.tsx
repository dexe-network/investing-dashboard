import { Flex } from "theme"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import IconButton from "components/IconButton"
import ExchangeInput from "components/Exchange/ExchangeInput"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"

import useInvestRiskyProposal from "./useInvestRiskyProposal"
import { useMemo } from "react"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

function InvestRiskyProposal() {
  const { poolAddress, proposalId } = useParams()
  const [
    {
      formWithDirection,
      isSlippageOpen,
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
    },
  ] = useInvestRiskyProposal(poolAddress, proposalId)

  const button = useMemo(() => {
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
          ? `Buy ${formWithDirection.to.symbol}`
          : `Sell Risky LP`}
      </Button>
    )
  }, [
    direction,
    formWithDirection.to.symbol,
    fromAmount,
    handleSubmit,
    toAmount,
  ])

  const form = (
    <Card>
      <CardHeader>
        <Flex>
          <Title active>Swap</Title>
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

      <ExchangeInput
        price={formWithDirection.from.price}
        amount={formWithDirection.from.amount}
        balance={formWithDirection.from.balance}
        address={formWithDirection.from.address}
        symbol={formWithDirection.from.symbol}
        customIcon={formWithDirection.from.icon}
        decimal={formWithDirection.from.decimals}
        onChange={handleFromChange}
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      <ExchangeInput
        price={formWithDirection.to.price}
        amount={formWithDirection.to.amount}
        balance={formWithDirection.to.balance}
        address={formWithDirection.to.address}
        symbol={formWithDirection.to.symbol}
        customIcon={formWithDirection.to.icon}
        decimal={formWithDirection.to.decimals}
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

const InvestRiskyProposalWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestRiskyProposal />
    </GraphProvider>
  )
}

export default InvestRiskyProposalWithProvider
