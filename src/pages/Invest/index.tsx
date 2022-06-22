import { useMemo } from "react"
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
import TokenIcon from "components/TokenIcon"
import SwapPrice from "components/SwapPrice"

import { useERC20 } from "hooks/useContract"

import { createClient, Provider as GraphProvider } from "urql"
import { cutDecimalPlaces, fromBig, shortenAddress } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"
import LockedIcon from "assets/icons/LockedIcon"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
  InfoCard,
  InfoRow,
  InfoGrey,
  InfoWhite,
  InfoDropdown,
} from "components/Exchange/styled"

import useInvest from "./useInvest"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const Position = ({ position }) => {
  const [, data] = useERC20(position.address)

  return (
    <InfoRow>
      <Flex>
        <TokenIcon address={position.address} size={15} />
        <InfoGrey>{data?.name}</InfoGrey>
      </Flex>
      <Flex gap="4">
        <InfoWhite>{fromBig(cutDecimalPlaces(position.amount))}</InfoWhite>
        <InfoGrey>{data?.symbol}</InfoGrey>
      </Flex>
    </InfoRow>
  )
}

const Invest = () => {
  const { poolAddress } = useParams<{
    poolAddress: string
  }>()

  const [
    { from, to },
    {
      info,
      allowance,
      isWalletPrompting,
      isSlippageOpen,
      slippage,
      gasPrice,
      swapPrice,
      swapPriceUSD,
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
        <SecondaryButton size="large" onClick={updateAllowance} fz={22} full>
          <Flex>
            <Flex ai="center">Unlock Token {from.symbol}</Flex>
            <Flex m="-3px 0 0 4px">
              <LockedIcon />
            </Flex>
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
        {direction === "deposit" ? `Buy ${to.symbol}` : `Sell ${from.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const freeLiquidity = useMemo(() => {
    if (!info.freeLiquidity.lp) return <InfoGrey>Loading</InfoGrey>

    if (typeof info.freeLiquidity.lp === "number")
      return <InfoGrey>Unlimited</InfoGrey>

    return (
      <Flex gap="4">
        <InfoWhite>
          {fromBig(cutDecimalPlaces(info.freeLiquidity.lp))} LP
        </InfoWhite>
        <InfoGrey>({fromBig(info.freeLiquidity.percent)}%)</InfoGrey>
      </Flex>
    )
  }, [info])

  const availableToInvest = useMemo(() => {
    if (!info.availableToInvest.amount) return <InfoGrey>Loading</InfoGrey>

    return (
      <Flex gap="4">
        <InfoWhite>
          {fromBig(cutDecimalPlaces(info.availableToInvest.amount))}
        </InfoWhite>
        <InfoGrey>{info.symbol}</InfoGrey>
      </Flex>
    )
  }, [info])

  const minInvestAmount = useMemo(() => {
    if (!info.minInvestAmount.amount) return <InfoGrey>Loading</InfoGrey>

    return (
      <Flex gap="4">
        <InfoWhite>
          {fromBig(cutDecimalPlaces(info.minInvestAmount.amount))}
        </InfoWhite>
        <InfoGrey>{info.symbol}</InfoGrey>
      </Flex>
    )
  }, [info])

  const totalPositionSize = useMemo(() => {
    return (
      <Flex gap="4">
        <InfoWhite>
          {fromBig(cutDecimalPlaces(info.fundPositions.total))}
        </InfoWhite>
        <InfoGrey>{info.symbol}</InfoGrey>
      </Flex>
    )
  }, [info])

  const positions = useMemo(() => {
    return info.fundPositions.positions.map((p) => (
      <Position key={p.address} position={p} />
    ))
  }, [info])

  const form = (
    <Card>
      <CardHeader>
        <Title active>Swap</Title>
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

      <SwapPrice
        fromSymbol={from.symbol}
        toSymbol={to.symbol}
        tokensCost={swapPrice}
        usdCost={swapPriceUSD}
        gasPrice={gasPrice}
      />

      <Flex p="16px 0 0" full>
        {button}
      </Flex>

      <InfoCard gap="12">
        <InfoRow>
          <InfoGrey>Free Liquidity</InfoGrey>
          {freeLiquidity}
        </InfoRow>
        <InfoRow>
          <InfoGrey>Available to invest</InfoGrey>
          {availableToInvest}
        </InfoRow>
        <InfoRow>
          <InfoGrey>Min invest amount</InfoGrey>
          {minInvestAmount}
        </InfoRow>
        <InfoDropdown
          left={<InfoGrey>Total fund positions: </InfoGrey>}
          right={totalPositionSize}
        >
          {positions}
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
