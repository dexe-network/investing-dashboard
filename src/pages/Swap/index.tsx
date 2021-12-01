import { useState, useCallback, useEffect } from "react"
import { Flex } from "theme"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"
import { useWeb3React } from "@web3-react/core"
import {
  useUniswapExchangeTool,
  useDexeExchangeTool,
  useERC20,
} from "hooks/useContract"
import FundsList from "components/FundsList"
import TokenSelector from "modals/TokenSelector"
import TraderMobile from "components/TraderMobile"
import { useParams } from "react-router-dom"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"
import { BigNumber } from "@ethersproject/bignumber"
import { ethers } from "ethers"
import { isStable, formatNumber } from "utils"

import { PriceContainer, Container } from "pages/Invest/styled"
import { HalfBlock } from "pages/Trader/styled"
import {
  Label,
  TooltipIcon,
  PriceText,
  InfoContainer,
} from "components/Exchange/styled"

import tooltip from "assets/icons/tooltip.svg"
import useTokensList from "hooks/useTokensList"

export const useExchange = (): [
  {
    fromAmount: number
    toAmount: number
    toAddress: string
    toSelectorOpened: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: number) => void
    setToAmount: (amount: number) => void
    setToAddress: (address: string) => void
    setDirection: (direction: "deposit" | "withdraw") => void
    setToSelector: (state: boolean) => void
  }
] => {
  const [fromAmount, setFromAmount] = useState(0.0)
  const [toAmount, setToAmount] = useState(0.0)
  const [toAddress, setToAddress] = useState(
    "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6"
  )
  const [toSelectorOpened, setToSelector] = useState(false)
  const [direction, setDirection] = useState<"deposit" | "withdraw">("deposit")

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

  const setDirectionCallback = useCallback(
    (direction: "withdraw" | "deposit"): void => setDirection(direction),
    []
  )

  const setToSelectorCallback = useCallback(
    (v: boolean): void => setToSelector(v),
    []
  )

  return [
    {
      fromAmount,
      toAmount,
      toAddress,
      toSelectorOpened,
      direction,
    },
    {
      setFromAmount: setFromAmountCallback,
      setToAmount: setToAmountCallback,
      setToAddress: setToAddressCallback,
      setDirection: setDirectionCallback,
      setToSelector: setToSelectorCallback,
    },
  ]
}

export default function Swap() {
  // INPUT HANDLERS
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useExchange()
  const [list] = useTokensList()
  const { account, library } = useWeb3React()
  const [pending, setPending] = useState(false)
  const [toBalance, setToBalance] = useState(BigNumber.from(0))
  const [hash, setHash] = useState("")

  const { poolAddress } = useParams<{ poolAddress: string }>()
  const rate = 1

  const exchangeTool = useUniswapExchangeTool()
  const exchange = useDexeExchangeTool()
  const [fromToken, fromData, fromBalance] = useERC20(
    "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6"
  )
  const [toToken, toData] = useERC20(toAddress)

  useEffect(() => {
    if (!list.length) return

    if (!toAddress && list.length) {
      setToAddress(list[0].address)
    }
  }, [list, setToAddress, toAddress])

  useEffect(() => {
    if (!hash || !library) return
    ;(async () => {
      try {
        const data = await library.waitForTransaction(hash)
        console.log(data)

        setPending(false)
        setHash("")
      } catch (e) {
        console.log(e)
      }
    })()
  }, [hash, library])

  const handleDirectionChange = () => {
    if (direction === "deposit") {
      setDirection("withdraw")
    } else {
      setDirection("deposit")
    }
  }

  const handlePercentageChange = (percent) => {
    const parsedAmount = fromBalance.div(100).mul(percent)

    if (parsedAmount._isBigNumber) {
      const fromPrice = parseFloat(
        ethers.utils.formatUnits(parsedAmount, fromData?.decimals)
      )
      setFromAmount(fromPrice)
      setToAmount(fromPrice * rate)
    }
  }

  const handleFromChange = (v) => {
    try {
      const am = parseFloat(v) || 0.0
      setFromAmount(am)

      setToAmount(am * rate)
    } catch (e) {
      console.log(e)
    }
  }

  const handleToChange = (v) => {
    try {
      const am = parseFloat(v) || 0.0
      setToAmount(am)
      setFromAmount(am * rate)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = () => {
    // const path = [fromAddress, toAddress]
    const path = [
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
      "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DEXE
    ]

    try {
      const params = [
        poolAddress,
        ethers.utils
          .parseUnits(fromAmount.toString(), fromData?.decimals)
          .toHexString(),
        BigNumber.from("7000000000000000000").toHexString(),
        path,
        Math.round((new Date().getTime() + 2 * 24 * 60 * 60 * 1000) / 1000),
      ]
      console.log(params)
      ;(async () => {
        const receipt = await exchange?.swapExactTokensForTokens(
          params[0],
          params[1],
          params[2],
          params[3],
          params[4],
          {
            from: account,
          }
        )
        setHash(receipt.hash)
      })()
      ;(async () => {
        const dataIn = await exchangeTool?.getAmountsIn(params[2], params[3])
        const dataOut = await exchangeTool?.getAmountsOut(params[2], params[3])
        console.log(dataIn, dataOut)
      })()
    } catch (e) {
      console.log(e)
    }
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

  const priceTemplate = (
    <Flex m="0 -10px 0 0" p="13px 0 10px" ai="center">
      <PriceText color="#F7F7F7">
        1.00 {toData?.symbol} = {"1.00 "}
        {fromData?.symbol}
      </PriceText>
      <PriceText color="#999999">(~{"1.00"}$)</PriceText>
      <TooltipIcon src={tooltip} />
    </Flex>
  )

  const button = getButton()

  const formTemplate = (
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
        address={toAddress}
        symbol={toData?.symbol}
        decimal={toData?.decimals}
        onChange={handleToChange}
        onSelect={() => setToSelector(true)}
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
      <TokenSelector
        tokensList={list}
        onSelect={setToAddress}
        isOpen={toSelectorOpened}
        onRequestClose={() => setToSelector(false)}
      />
      <HalfBlock>
        <Flex dir="column" full>
          <FundsList />
          <TraderMobile />
        </Flex>
      </HalfBlock>
      <HalfBlock>
        <InfoContainer>
          <Label>Total funds</Label>
          <Label>
            {formatNumber(
              ethers.utils
                .formatUnits(fromBalance, fromData?.decimals)
                .toString(),
              isStable(poolAddress) ? 3 : 5
            )}{" "}
            {fromData?.symbol}
          </Label>
        </InfoContainer>
        <InfoContainer>
          <Label>Locked In positions</Label>
          <Label>(0%) 0 {fromData?.symbol}</Label>
        </InfoContainer>
        {formTemplate}
      </HalfBlock>
    </Container>
  )
}
