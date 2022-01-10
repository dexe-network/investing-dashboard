import React, { useState, useEffect } from "react"
import { Flex } from "theme"
import { useParams } from "react-router-dom"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"

import ExchangeFrom from "components/Exchange/From"
import Tooltip from "components/Tooltip"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"

import { Label, PriceText } from "components/Exchange/styled"
import { useExchange } from "pages/Swap"
import { useERC20 } from "hooks/useContract"

import { ethers } from "ethers"

import { ErrorText, Container, PriceContainer } from "./styled"
import { isStable } from "utils"

export default function Invest() {
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useExchange()

  const [pending, setPending] = useState(false)

  const [error, setError] = useState("")

  const { poolAddress } = useParams<{ poolAddress: string }>()

  const [fromToken, fromData, fromBalance] = useERC20(poolAddress)
  const [toToken, toData, toBalance] = useERC20(
    "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6"
  )
  const handleSubmit = async () => {
    // TODO: write invest page submit function
  }

  const handlePercentageChange = (percent) => {
    // TODO: write percentage change function
  }

  const handleDirectionChange = () => {
    if (direction === "deposit") {
      setDirection("withdraw")
    } else {
      setDirection("deposit")
    }
  }

  const handleFromChange = (v) => {
    // TODO: write fromChange function
  }

  const handleToChange = (v) => {
    // TODO: write handle to change function
  }

  const getPrice = () => {
    return "0"
  }

  const getButton = () => {
    if (!fromToken || pending) {
      return (
        <Button theme="disabled" fz={22} full>
          <Flex>
            {"loading "}
            <Flex p="0 0 0 15px">
              <PulseSpinner color="#03FF89" size={15} loading />
            </Flex>
          </Flex>
        </Button>
      )
    }

    if (
      direction === "deposit" &&
      ethers.utils
        .parseUnits(fromAmount.toString(), fromData?.decimals)
        .gt(fromBalance)
    ) {
      return (
        <Button theme="disabled" fz={22} full>
          Inufficient funds
        </Button>
      )
    }

    if (
      direction === "withdraw" &&
      ethers.utils.parseUnits(toAmount.toString(), 18).gt(toBalance)
    ) {
      return (
        <Button theme="disabled" fz={22} full>
          Inufficient funds
        </Button>
      )
    }

    if (fromBalance.toString() === "0") {
      return (
        <Button
          onClick={handleSubmit}
          theme={direction === "deposit" ? "primary" : "warn"}
          fz={22}
          full
        >
          {direction === "deposit"
            ? `Buy ${fromData?.symbol}`
            : `Sell ${fromData?.symbol}`}
        </Button>
      )
    }

    if (fromBalance.toString() === "0") {
      return (
        <Button theme="disabled" fz={22} full>
          not available
        </Button>
      )
    }

    return (
      <Button
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={handleSubmit}
        fz={22}
        full
      >
        {direction === "deposit"
          ? `Buy ${fromData?.symbol}`
          : `Sell ${fromData?.symbol}`}
      </Button>
    )
  }

  const price = getPrice()

  const priceTemplate =
    price === "0" ? (
      <Flex m="0 -10px 0 0" p="13px 0 10px" ai="center">
        <PriceText color="#F7F7F7">not available</PriceText>
        <Tooltip id="0"></Tooltip>
      </Flex>
    ) : (
      <Flex m="0 -10px 0 0" p="13px 0 10px" ai="center">
        <PriceText color="#F7F7F7">
          1 {fromData?.symbol} = {toBalance.div(fromBalance).toString()}{" "}
          {fromData?.symbol}
        </PriceText>
        <PriceText color="#999999">
          (~{isStable(poolAddress) ? "1.00" : "1.00"}$)
        </PriceText>
        <Tooltip id="0"></Tooltip>
      </Flex>
    )

  const button = getButton()

  const form = (
    <div>
      <ExchangeFrom
        price={0}
        amount={fromAmount}
        balance={fromBalance}
        address={poolAddress}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
        isAlloved
        onSelect={() => {}}
        isStable={isStable(poolAddress)}
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      <ExchangeTo
        price={0}
        priceChange24H={0}
        amount={toAmount}
        balance={toBalance}
        address={poolAddress}
        symbol={fromData?.symbol}
        decimal={18}
        isPool
        onChange={handleToChange}
        onSelect={() => {}}
      />

      <PriceContainer>
        <Label>Price: </Label>
        {!fromData ? <StageSpinner size={12} loading /> : priceTemplate}
      </PriceContainer>

      {button}
    </div>
  )

  return (
    <Container ai="center" jc="center" full>
      {/* <TokenSelector
        isOpen={tokenSelectOpened}
        onRequestClose={() => setModalOpened(false)}
      /> */}

      {error.length ? <ErrorText>{error}</ErrorText> : form}
    </Container>
  )
}
