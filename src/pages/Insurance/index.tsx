import React, { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"

import ExchangeFrom from "components/Exchange/From"
import Tooltip from "components/Tooltip"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button, { BorderedButton } from "components/Button"
import { Label, PriceText } from "components/Exchange/styled"

import {
  selectBasicPoolByAddress,
  selectInvestPoolByAddress,
} from "state/pools/selectors"

import useContract, { useERC20 } from "hooks/useContract"

import { ethers } from "ethers"

import LockedIcon from "assets/icons/LockedIcon"
import {
  formatDecimalsNumber,
  formatNumber,
  getAllowance,
  isStable,
} from "utils"
import { useSelector } from "react-redux"
import { AppState } from "state"
import MemberMobile from "components/MemberMobile"
import { ERC20, PriceFeed, TraderPool } from "abi"
import {
  ErrorText,
  Container,
  PriceContainer,
  InfoRow,
  SettingsIcon,
  SettingsLabel,
  SettingsCard,
  SettingsTitle,
  SettingsDescription,
  SettingsButton,
  SettingsInput,
  Title,
  WhiteLabel,
  WhiteValue,
  GreyValue,
  GreyValueSm,
} from "./styled"
import Popover from "components/Popover"
import IpfsIcon from "components/IpfsIcon"
import NavTabs from "components/NavTabs"

export const useInsurance = (): [
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

  const [toAddress, setToAddress] = useState("")
  const [fromAddress, setFromAddress] = useState("")

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
    (amount: number): void =>
      setFromAmount(parseFloat(amount.toString()) || 0.0),
    []
  )

  const setToAmountCallback = useCallback(
    (amount: number): void => setToAmount(parseFloat(amount.toString()) || 0.0),
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
      setFromAmount: setFromAmountCallback,
      setToAmount: setToAmountCallback,
      setToAddress: setToAddressCallback,
      setFromAddress: setFromAddressCallback,
      setDirection: handleDirectionChange,
      setPercentage: handlePercentageChange,
      setToSelector: setToSelectorCallback,
      setFromSelector: setFromSelectorCallback,
    },
  ]
}

export default function Insurance() {
  const { account, library } = useWeb3React()
  const [
    {
      fromAmount,
      toAmount,
      toAddress,
      fromAddress,
      toSelectorOpened,
      direction,
    },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useInsurance()

  const [pending, setPending] = useState(false)
  const [slippage, setSlippage] = useState(2)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [allowance, setAllowance] = useState("-1")
  const [toBalance, setToBalance] = useState("0")
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))

  const [error, setError] = useState("")

  const [fromToken, fromData, fromBalance] = useERC20(
    "0xa651edbbf77e1a2678defae08a33c5004b491457"
  )

  const handleSubmit = async () => {
    // TODO: handle stake
  }

  const handlePercentageChange = (percent) => {
    if (direction === "deposit") {
      try {
        const from = parseFloat(
          ethers.utils
            .formatUnits(
              fromBalance.mul(percent),
              (fromData?.decimals || 18) + 18
            )
            .toString()
        )
        setFromAmount(from)
        setToAmount(formatDecimalsNumber(from * 10))
      } catch (e) {
        console.log(e)
      }
    } else {
      const to = parseFloat(
        ethers.utils
          .formatUnits(BigNumber.from(toBalance).mul(percent), 36)
          .toString()
      )
      setToAmount(to)
      setFromAmount(formatDecimalsNumber(to / 10))
    }
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
    setFromAmount(v)
    setToAmount(formatDecimalsNumber(v * 10))
  }

  const handleToChange = (v) => {
    // TODO: write handle to change function
    setToAmount(v)
    setFromAmount(formatDecimalsNumber(v / 10))
  }

  const approve = () => {
    if (!fromToken) return
    ;(async () => {
      try {
        const amountInBN = ethers.utils.parseUnits(fromAmount.toString(), 18)
        // const receipt = await fromToken.approve(poolData.address, amountInBN)
        // console.log(receipt)
      } catch (e) {
        console.log(e)
      }
    })()
  }

  // allowance watcher
  useEffect(() => {
    if (!fromToken || !account || !library || direction === "withdraw") return
    ;(async () => {
      //   const allowance = await getAllowance(
      //     account,
      //     poolData.parameters.baseToken,
      //     poolData.address,
      //     library
      //   )
      setAllowance("0")
    })()
  }, [fromToken, account, library, direction])

  // INPUT LISTENERS

  // // in token amount listener
  // useEffect(() => {
  //   if (!traderPool) return
  // }, [traderPool, fromAmount, account, poolData.lpPrice, setToAmount])

  // // out token amount listener
  // useEffect(() => {
  //   if (!traderPool) return
  // }, [traderPool, toAmount, account, poolData.lpPrice, setFromAmount])

  // get LP tokens balance
  useEffect(() => {
    ;(async () => {
      setToBalance("0")
    })()
  }, [account])

  // get exchange rates of LP
  //   useEffect(() => {
  //     if (!priceFeed || !usdAddress || !poolData.parameters.baseToken) return
  //     ;(async () => {
  //       try {
  //         const baseTokenPrice = await priceFeed.getNormalizedPriceOutUSD(
  //           poolData.parameters.baseToken,
  //           ethers.utils.parseUnits("1", 18).toString(),
  //           []
  //         )
  //         setInPrice(ethers.utils.formatEther(baseTokenPrice).toString())
  //         setOutPrice(
  //           (parseFloat(inPrice) * parseFloat(poolData.lpPrice)).toString()
  //         )
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     })()
  //   }, [
  //     priceFeed,
  //     usdAddress,
  //     poolData.parameters.baseToken,
  //     inPrice,
  //     poolData.lpPrice,
  //   ])

  const getButton = () => {
    try {
      const amountIn = ethers.utils.parseUnits(fromAmount.toString(), 18)

      if (!fromToken || pending || allowance === "-1") {
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
        (direction === "deposit" && amountIn.gt(fromBalance)) ||
        (direction === "deposit" && fromBalance.toString() === "0")
      ) {
        return <BorderedButton size="big">Inufficient funds</BorderedButton>
      }

      if (
        (direction === "withdraw" &&
          ethers.utils.parseUnits(toAmount.toString(), 18).gt(toBalance)) ||
        (direction === "withdraw" && toBalance.toString() === "0")
      ) {
        return <BorderedButton size="big">Inufficient funds</BorderedButton>
      }

      if (direction === "deposit" && BigNumber.from(allowance).lt(amountIn)) {
        return (
          <BorderedButton onClick={approve} size="big">
            Unlock Token {fromData?.symbol}{" "}
            <Flex p="0 0 3px 5px">
              <LockedIcon />
            </Flex>
          </BorderedButton>
        )
      }
    } catch (e) {
      console.log(e)
    }
    return (
      <Button
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={handleSubmit}
        fz={22}
        full
      >
        {direction === "deposit" ? `Stake DEXE` : `Unstake DEXE`}
      </Button>
    )
  }

  const button = getButton()

  const settings = (
    <Popover
      contentHeight={300}
      isOpen={isSettingsOpen}
      toggle={() => setSettingsOpen(false)}
      title="Transaction settings"
    >
      <SettingsCard>
        <SettingsDescription>
          Your tranzaction will revert if the price changes unfavorably by more
          than this percentage
        </SettingsDescription>
        <Flex p="20px 0" jc="space-evenly" full>
          <SettingsInput
            type="number"
            defaultValue={slippage}
            onChange={(v) => setSlippage(parseFloat(v.target.value) || 2)}
            placeholder="Select slippage"
          />
          <SettingsButton>AUTO</SettingsButton>
        </Flex>
        {/* <SettingsDescription>
          Please, enter a valid slippage percentage{" "}
        </SettingsDescription> */}
      </SettingsCard>
    </Popover>
  )

  const form = (
    <div>
      <ExchangeFrom
        price={inPrice}
        amount={fromAmount}
        balance={fromBalance}
        address={fromAddress}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
        onSelect={() => {}}
        isStable
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      <ExchangeTo
        price={outPrice}
        priceChange24H={0}
        amount={toAmount}
        balance={BigNumber.from(toBalance)}
        address={toAddress}
        symbol={`DEXE-LP`}
        decimal={18}
        isPool
        onChange={handleToChange}
      />
      <Flex p="20px 0" full>
        {button}
      </Flex>
    </div>
  )

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Title>Insurance</Title>
      <NavTabs
        tabs={[
          { name: "Management", component: null },
          { name: "Proposals", component: null },
          { name: "Voting", component: null },
        ]}
      ></NavTabs>
      <Flex p="20px 0 0" full jc="space-between">
        <WhiteLabel>Total stake</WhiteLabel>
        <Flex>
          <WhiteValue>3000</WhiteValue> <GreyValue>DEXE</GreyValue>
        </Flex>
      </Flex>
      <Flex full jc="space-between">
        <WhiteLabel>Insurance amount</WhiteLabel>
        <Flex>
          <WhiteValue>30,000</WhiteValue> <GreyValue>DEXE</GreyValue>
        </Flex>
      </Flex>
      <Flex m="0 0 auto" full jc="space-between">
        <GreyValueSm>In USD</GreyValueSm>
        <Flex>
          <GreyValueSm>220,200.00</GreyValueSm>
        </Flex>
      </Flex>
      {settings}

      {error.length ? <ErrorText>{error}</ErrorText> : form}
    </Container>
  )
}
