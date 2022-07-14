import { Flex } from "theme"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import IconButton from "components/IconButton"
import ExchangeInput from "components/Exchange/ExchangeInput"
import RiskyInvestInput from "components/Exchange/RiskyInvestInput"
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
  InfoCard,
  InfoRow,
  InfoGrey,
  InfoDropdown,
  InfoWhite,
} from "components/Exchange/styled"

import useWithdrawInvestmentProposal from "./useWithdrawInvestmentProposal"
import { useMemo } from "react"
import SwapPrice from "components/SwapPrice"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

function WithdrawInvestmentProposal() {
  const { poolAddress, proposalId } = useParams()
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
    },
  ] = useWithdrawInvestmentProposal(poolAddress, proposalId)

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
          ? `Stake ${to.symbol}`
          : `Unstake ${from.symbol}`}
      </Button>
    )
  }, [direction, from.symbol, to.symbol, fromAmount, handleSubmit, toAmount])

  const lastWithdraw = useMemo(() => {
    return (
      <Flex gap="4">
        <InfoGrey>0 {from.symbol}</InfoGrey>
      </Flex>
    )
  }, [from.symbol])

  const lastWithdrawContent = useMemo(() => {
    return (
      <>
        <InfoRow>
          <InfoGrey>Feb 12,2021</InfoGrey>
          <Flex gap="4">
            <InfoWhite>0</InfoWhite>
            <InfoGrey>{from.symbol}</InfoGrey>
          </Flex>
        </InfoRow>
      </>
    )
  }, [from.symbol])

  const fullness = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Fullness:</InfoGrey>
        <Flex gap="4">
          <InfoWhite>0 {from.symbol}</InfoWhite>
          <InfoGrey>/0 {from.symbol}</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [from.symbol])

  const averageLpPrice = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Average LP price:</InfoGrey>
        <Flex gap="4">
          <InfoWhite>1 {from.symbol} = 5.96 USD</InfoWhite>
        </Flex>
      </InfoRow>
    )
  }, [from.symbol])

  const expirationDate = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Expiration date:</InfoGrey>
        <Flex gap="4">
          <InfoWhite>JUN 12,2022, 20:00</InfoWhite>
        </Flex>
      </InfoRow>
    )
  }, [])

  const form = (
    <Card>
      <CardHeader>
        <Flex>
          <Title active>Withdraw</Title>
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
        {fullness}
        {averageLpPrice}
        {expirationDate}
        <InfoDropdown
          left={<InfoGrey>Last withdraw Jun 12,2022</InfoGrey>}
          right={lastWithdraw}
        >
          {lastWithdrawContent}
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
    </>
  )
}

const WithdrawInvestmentProposalWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <WithdrawInvestmentProposal />
    </GraphProvider>
  )
}

export default WithdrawInvestmentProposalWithProvider
