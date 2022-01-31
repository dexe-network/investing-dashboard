import { useState, useCallback, useEffect } from "react"
import { Flex } from "theme"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"
import { useWeb3React } from "@web3-react/core"
import { useUniswapExchangeTool, useERC20 } from "hooks/useContract"
import MemberMobile from "components/MemberMobile"
import Tooltip from "components/Tooltip"
import Popover from "components/Popover"
import { useParams } from "react-router-dom"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"
import { BigNumber } from "@ethersproject/bignumber"
import { ethers } from "ethers"
import { isStable, formatNumber } from "utils"

import {
  PriceContainer,
  Container,
  TooltipValue,
  TooltipLabel,
  ExchangeName,
} from "pages/Invest/styled"
import { HalfBlock } from "pages/Trader/styled"
import {
  Label,
  PriceText,
  InfoContainer,
  Value,
} from "components/Exchange/styled"
import useTokensList from "hooks/useTokensList"

export const useSwap = (): [
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

export default function Swap() {
  const { poolAddress } = useParams<{ poolAddress: string }>()

  const [
    {
      pending,
      fromAmount,
      toAmount,
      toAddress,
      fromAddress,
      toSelectorOpened,
      fromSelectorOpened,
      direction,
    },
    {
      setFromAmount,
      setToAmount,
      setToSelector,
      setFromSelector,
      setDirection,
      setPercentage,
    },
  ] = useSwap()

  const [fromToken, fromData, fromBalance] = useERC20(fromAddress)
  const [toToken, toData, toBalance] = useERC20(toAddress)

  const handleSubmit = () => {
    // TODO: create transaction builder
  }

  const getButton = () => {
    // loading state
    if (!fromData || !toData || pending) {
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

    if (direction === "deposit") {
      return (
        <Button theme="disabled" fz={22} full>
          Inufficient balance
        </Button>
      )
    }

    if (
      direction === "withdraw" &&
      toBalance.lt(
        ethers.utils.parseUnits(toAmount.toString(), toData.decimals)
      )
    ) {
      return (
        <Button theme="disabled" fz={22} full>
          Inufficient balance
        </Button>
      )
    }

    return (
      <Button onClick={handleSubmit} theme={"warn"} fz={22} full>
        {`Sell ${toData?.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const tooltip = (
    <Tooltip id="0">
      <Flex p="6.5px 0 6.5px" full>
        <TooltipLabel>Liquiduty Provider Fee</TooltipLabel>
        <TooltipValue>9,997 DAI</TooltipValue>
      </Flex>
      <Flex p="6.5px 0 2px" full>
        <TooltipLabel>Route</TooltipLabel>
        <TooltipValue>DAI {">"} USDT &gt; ETH</TooltipValue>
      </Flex>
      <Flex p="0 0 5px" jc="flex-end" full>
        <ExchangeName>(Pancakeswap)</ExchangeName>
      </Flex>
      <Flex p="6.5px 0 6.5px" full>
        <TooltipLabel>Price Impact</TooltipLabel>
        <TooltipLabel>-0.4%</TooltipLabel>
      </Flex>
      <Flex p="6.5px 0 6.5px" full>
        <TooltipLabel>Minimum Received</TooltipLabel>
        <TooltipValue>3.46364834 ETH</TooltipValue>
      </Flex>
      <Flex p="6.5px 0 6.5px" full>
        <TooltipLabel>Slippage tolerance</TooltipLabel>
        <TooltipValue>0.50%</TooltipValue>
      </Flex>
    </Tooltip>
  )

  const priceTemplate = (
    <Flex ai="center">
      <PriceText color="#C2C3C4">
        1.00 {toData?.symbol} = {"1.00 "}
        {fromData?.symbol}
      </PriceText>
      <PriceText color="#596073">(~{"1.00"}$)</PriceText>
      {tooltip}
    </Flex>
  )

  return (
    <>
      <Popover
        title="Select a token"
        isOpen={fromSelectorOpened}
        toggle={setFromSelector}
        contentHeight={650}
      ></Popover>
      <Popover
        title="Select a token"
        isOpen={toSelectorOpened}
        toggle={setToSelector}
        contentHeight={650}
      ></Popover>
      <Container>
        <HalfBlock>
          <Flex dir="column" full>
            {/* <MemberMobile index={0} /> */}
          </Flex>
          <Flex dir="column" full>
            <InfoContainer>
              <Label>Investor available Funds</Label>
              <Value>0 TRX</Value>
            </InfoContainer>
            <InfoContainer>
              <Label>Your available Funds</Label>
              <Value>80,028 TRX</Value>
            </InfoContainer>
            <InfoContainer>
              <Label>Locked In positions</Label>
              <Value>(0%) 0 TRX</Value>
            </InfoContainer>
          </Flex>
        </HalfBlock>
        <HalfBlock>
          <div>
            <ExchangeFrom
              price={0}
              amount={toAmount}
              balance={toBalance}
              address={toAddress}
              symbol={toData?.symbol}
              decimal={toData?.decimals}
              onChange={setFromAmount}
              isAlloved
              onSelect={() => setFromSelector(true)}
            />
            {/* 
            <ExchangeDivider
              direction={direction}
              changeAmount={(v) => {}}
              changeDirection={() =>
                setDirection(direction === "deposit" ? "withdraw" : "deposit")
              }
            /> */}

            <ExchangeTo
              price="0"
              priceChange24H={0}
              amount={toAmount}
              balance={toBalance}
              address={toAddress}
              symbol={toData?.symbol}
              decimal={toData?.decimals}
              onChange={setToAmount}
              onSelect={() => setToSelector(true)}
            />

            <PriceContainer>
              <Label>Price: </Label>
              {!fromData ? <StageSpinner size={12} loading /> : priceTemplate}
            </PriceContainer>

            {button}
          </div>
        </HalfBlock>
      </Container>
    </>
  )
}
