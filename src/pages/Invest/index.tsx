import React, { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"

import ExchangeFrom from "components/Exchange/From"
import Tooltip from "components/Tooltip"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"
import { Label, PriceText } from "components/Exchange/styled"

import { selectBasicPoolByAddress } from "state/pools/selectors"

import { useERC20 } from "hooks/useContract"

import { ethers } from "ethers"

import { ErrorText, Container, PriceContainer, InfoRow } from "./styled"
import { getAllowance, isStable } from "utils"
import { useSelector } from "react-redux"
import { AppState } from "state"
import MemberMobile from "components/MemberMobile"

export const useInvest = (): [
  {
    fromAmount: number
    toAmount: number
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    pending: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: number) => void
    setToAmount: (amount: number) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: (v: "deposit" | "withdraw") => void
    setPercentage: (v: number) => void
    setToSelector: (state: boolean) => void
    setFromSelector: (state: boolean) => void
  }
] => {
  const { library } = useWeb3React()

  const [fromAmount, setFromAmount] = useState(0.0)
  const [toAmount, setToAmount] = useState(0.0)
  const [hash, setHash] = useState("")
  const [pending, setPending] = useState(false)
  const [toSelectorOpened, setToSelector] = useState(false)
  const [fromSelectorOpened, setFromSelector] = useState(false)
  const [direction, setDirection] = useState<"deposit" | "withdraw">("deposit")

  const [toAddress, setToAddress] = useState(
    "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6"
  )
  const [fromAddress, setFromAddress] = useState(
    "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6"
  )

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
    (amount: number): void => setFromAmount(amount),
    []
  )

  const setToAmountCallback = useCallback(
    (amount: number): void => setToAmount(amount),
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

  const handleFromChange = useCallback((v: number) => {
    try {
      const am = parseFloat(v.toString()) || 0.0
      setFromAmount(am)

      setToAmount(am * 1)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleToChange = useCallback((v: number) => {
    try {
      const am = parseFloat(v.toString()) || 0.0
      setToAmount(am)
      setFromAmount(am * 1)
    } catch (e) {
      console.log(e)
    }
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
    },
    {
      setFromAmount: handleFromChange,
      setToAmount: handleToChange,
      setToAddress: setToAddressCallback,
      setFromAddress: setFromAddressCallback,
      setDirection: handleDirectionChange,
      setPercentage: handlePercentageChange,
      setToSelector: setToSelectorCallback,
      setFromSelector: setFromSelectorCallback,
    },
  ]
}

export default function Invest() {
  const { account, library } = useWeb3React()
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useInvest()

  const [pending, setPending] = useState(false)
  const [allowance, setAllowance] = useState("0")

  const [error, setError] = useState("")

  const { poolAddress } = useParams<{ poolAddress: string }>()
  const poolData = useSelector((state: AppState) =>
    selectBasicPoolByAddress(state, poolAddress)
  )

  const [fromToken, fromData, fromBalance] = useERC20(
    poolData.parameters.baseToken
  )
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

  // allowance watcher
  useEffect(() => {
    if (
      !fromToken ||
      !account ||
      !library ||
      !poolData ||
      direction === "withdraw"
    )
      return
    ;(async () => {
      const allowance = await getAllowance(
        account,
        poolData.parameters.baseToken,
        poolData.address,
        library
      )
      setAllowance(allowance.toString())
    })()
  }, [fromToken, account, library, poolData, direction])

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
  console.log(fromBalance.toString())

  const price = getPrice()

  const priceTemplate =
    price === "0" ? (
      <Flex ai="center">
        <PriceText color="#5A6071">not available</PriceText>
        <Tooltip id="0"></Tooltip>
      </Flex>
    ) : (
      <Flex ai="center">
        <PriceText color="#5A6071">
          1 {fromData?.symbol} = {toBalance.div(fromBalance).toString()}{" "}
          {fromData?.symbol}
        </PriceText>
        <PriceText color="#5A6071">(~1.00$)</PriceText>
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
        address={poolData.parameters.baseToken}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
        isAlloved
        onSelect={() => {}}
        isStable
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
        symbol={poolData.ticker}
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
    <Container>
      <MemberMobile data={poolData} />
      <Flex dir="column" full>
        <InfoRow
          label="Investor available Funds"
          value={`0 ${poolData.ticker}`}
        />
        <InfoRow
          label="Your available Funds"
          value={`80,017 ${poolData.ticker}`}
        />
        <InfoRow
          label="Locked in positions"
          value={`(55%) 100,000 ${poolData.ticker}`}
        />
        <InfoRow
          label="Free Liquidity"
          value={`(55%) 19,983 ${poolData.ticker}`}
          white
        />
      </Flex>

      {error.length ? <ErrorText>{error}</ErrorText> : form}
    </Container>
  )
}
