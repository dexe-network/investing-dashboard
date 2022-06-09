import { Flex } from "theme"
import { useParams } from "react-router-dom"

import Payload from "components/Payload"
import ExchangeInput from "components/Exchange/ExchangeInput"
import ExchangeDivider from "components/Exchange/Divider"
import CircularProgress from "components/CircularProgress"
import IconButton from "components/IconButton"
import Button, { SecondaryButton } from "components/Button"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"
import TransactionError from "modals/TransactionError"
import TermsAndConditions from "modals/TermsAndConditions"

import { createClient, Provider as GraphProvider } from "urql"
import { shortenAddress } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"
import LockedIcon from "assets/icons/LockedIcon"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"

import useInvest from "./useInvest"
import usePrivacyPolicyAgreed from "hooks/usePrivacyPolicy"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const Invest = () => {
  const { poolAddress } = useParams<{
    poolAddress: string
  }>()

  const [
    { from, to },
    {
      allowance,
      isWalletPrompting,
      isSlippageOpen,
      slippage,
      error,
      direction,
      updateAllowance,
      setSlippageOpen,
      setSlippage,
      setError,
      setWalletPrompting,
      handleDirectionChange,
      handlePercentageChange,
      handleFromChange,
      handleSubmit,
    },
  ] = useInvest({
    poolAddress,
    initialDirection: "deposit",
  })

  const {
    privacyPolicyAgreed,
    showPrivacyAgreement,
    setShowPrivacyAgreement,
    agreePrivacyPolicy,
  } = usePrivacyPolicyAgreed()

  const isAllowanceNeeded =
    direction === "deposit" && !!allowance && allowance.lt(from.amount)

  const getButton = () => {
    if (from.amount === "0") {
      return (
        <SecondaryButton
          theme="disabled"
          size="large"
          onClick={() => {}}
          fz={22}
          full
        >
          Enter amount to swap
        </SecondaryButton>
      )
    }

    if (from.balance.lt(from.amount)) {
      return (
        <SecondaryButton theme="disabled" size="large" fz={22} full>
          Insufficient balance
        </SecondaryButton>
      )
    }

    if (isAllowanceNeeded) {
      return (
        <SecondaryButton
          size="large"
          onClick={
            privacyPolicyAgreed
              ? updateAllowance
              : () => setShowPrivacyAgreement(true)
          }
          fz={22}
          full
        >
          <Flex>
            Unlock token <LockedIcon />
          </Flex>
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
        {`Swap ${to.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <Card>
      <CardHeader>
        <Title>Swap</Title>
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
        price={from.price}
        amount={from.amount}
        balance={from.balance}
        address={from.address}
        symbol={from.symbol}
        decimal={from.decimals}
        customIcon={from.icon}
        onChange={handleFromChange}
        isLocked={isAllowanceNeeded}
      />

      <ExchangeDivider
        direction={direction}
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
        customIcon={to.icon}
      />

      <Flex p="16px 0 0" full>
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
      <Header>{shortenAddress(poolAddress)}</Header>
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
      <TermsAndConditions
        isOpen={showPrivacyAgreement}
        toggle={() => setShowPrivacyAgreement(false)}
        onAgree={() => agreePrivacyPolicy(updateAllowance)}
      />
    </>
  )
}

const InvestWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <Invest />
    </GraphProvider>
  )
}

export default InvestWithProvider
