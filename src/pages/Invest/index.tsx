import React, { useState, useEffect, useReducer, useCallback } from "react"
import { Flex } from "theme"
import { useParams } from "react-router-dom"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"

import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"
import tooltip from "assets/icons/tooltip.svg"

import { Label, TooltipIcon, PriceText } from "components/Exchange/styled"
import { useExchange } from "pages/Swap"
import { useSelectPoolByAddress } from "state/pools/hooks"
import {
  usePoolUpgradeable,
  useTraderPoolUpgradeable,
  useUniswapExchangeTool,
  useERC20,
} from "hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { add } from "date-fns/esm"
import { getUnixTime } from "date-fns"

import { ethers } from "ethers"

import { ErrorText, ApproveButton, Container, PriceContainer } from "./styled"
import { useSelectPrices } from "state/rates/hooks"
import { isStable } from "utils"

export default function Invest() {
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useExchange()

  const [hash, setHash] = useState("")
  const [pending, setPending] = useState(false)
  const [allowance, setAllowance] = useState(BigNumber.from(0))

  const [error, setError] = useState("")

  const rates = useSelectPrices()
  const { account, library } = useWeb3React()
  const exchangeTool = useUniswapExchangeTool()

  const { poolAddress } = useParams<{ poolAddress: string }>()
  const poolData = useSelectPoolByAddress(poolAddress)

  const pool = usePoolUpgradeable(poolAddress)

  const [
    traderPool,
    fromAddress,
    tvl,
    userPoolData,
    refreshTo,
  ] = useTraderPoolUpgradeable(poolAddress, pool?.ownerAddress)
  const [fromToken, fromData, fromBalance, refreshFrom] = useERC20(fromAddress)
  const isAlloved =
    direction === "deposit" &&
    ethers.utils
      .parseUnits(fromAmount.toString(), fromData?.decimals)
      .gt(allowance) &&
    direction === "deposit"

  const isOwner =
    poolData?.ownerAddress.toLocaleLowerCase() === account?.toLocaleLowerCase()

  // check allowance
  useEffect(() => {
    if (!fromToken || typeof account !== "string" || account.length !== 42)
      return
    ;(async () => {
      try {
        const data = await fromToken.allowance(account, poolAddress)
        setAllowance(data)
      } catch (e) {
        // console.log(e, e.message)
        // TODO: set error unable to check allovance
      }
    })()
  }, [fromToken, account, poolAddress])

  const swapTokens = async () => {
    const multiplier = BigNumber.from(10).pow(6)

    const amount = BigNumber.from(1000).mul(multiplier)

    const deadline = getUnixTime(
      add(new Date(), {
        minutes: 10,
      })
    )

    const receipt = await exchangeTool?.swapETHForExactTokens(
      amount.toHexString(),
      [
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      ],
      account,
      deadline,
      {
        from: account,
        value: amount,
      }
    )

    console.log(receipt)
  }

  const approve = async () => {
    const receipt = await fromToken?.approve(
      poolAddress,
      ethers.utils
        .parseUnits(fromAmount.toString(), fromData?.decimals)
        .toHexString(),
      {
        from: account,
      }
    )
    console.log(receipt)
  }

  useEffect(() => {
    if (!hash || !library) return
    ;(async () => {
      try {
        await library.waitForTransaction(hash)

        setPending(false)
        setHash("")
        refreshFrom()
        refreshTo()
      } catch (e) {
        console.log(e)
      }
    })()
  }, [hash, library, refreshFrom, refreshTo])

  const handleSubmit = async () => {
    setPending(true)
    if (direction === "deposit") {
      try {
        const receipt = await pool?.deposit(
          ethers.utils.parseUnits(fromAmount.toString(), fromData?.decimals),
          {
            from: account,
          }
        )
        setHash(receipt.hash)

        alert(`Deposited ${fromData?.symbol}`)
      } catch (e) {
        setPending(false)
        console.log(e)
      }
    } else {
      try {
        const receipt = await pool?.withdraw(
          ethers.utils.parseUnits(fromAmount.toString(), fromData?.decimals),
          {
            from: account,
          }
        )

        setHash(receipt.hash)

        alert(`Withdrawn ${fromData?.symbol}`)
      } catch (e) {
        setPending(false)
        console.log(e)
      }
    }
  }

  const handlePercentageChange = (percent) => {
    const parsedAmount = fromBalance.div(100).mul(percent)

    if (parsedAmount._isBigNumber) {
      const fromPrice = parseFloat(
        ethers.utils.formatUnits(parsedAmount, fromData?.decimals)
      )
      setFromAmount(fromPrice)
      if (tvl[1].toString() !== "0") {
        setToAmount(fromPrice * parseFloat(tvl[0].div(tvl[1]).toString()))
      } else {
        setToAmount(fromPrice)
      }
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
    try {
      const am = parseFloat(v) || 0.0
      setFromAmount(am)

      if (tvl[1].toString() !== "0") {
        setToAmount(am * parseFloat(tvl[0].div(tvl[1]).toString()))
      } else {
        setToAmount(am)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleToChange = (v) => {
    try {
      const am = parseFloat(v) || 0.0
      setToAmount(am)

      if (tvl[1].toString() !== "0") {
        setFromAmount(am * parseFloat(tvl[0].div(tvl[1]).toString()))
      } else {
        setFromAmount(am)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getPrice = () => {
    if (tvl[1].toString() !== "0") {
      const cap = ethers.utils.formatUnits(tvl[0], fromData?.decimals)
      const sup = ethers.utils.formatUnits(tvl[1], 18)

      return parseFloat(cap) / parseFloat(sup)
    }

    return "0"
  }

  const getButton = () => {
    if (!fromToken || !poolData || pending) {
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
      ethers.utils.parseUnits(toAmount.toString(), 18).gt(userPoolData[2])
    ) {
      return (
        <Button theme="disabled" fz={22} full>
          Inufficient funds
        </Button>
      )
    }

    if (isAlloved) {
      return (
        <ApproveButton onClick={approve}>
          Unlock Token {fromData?.symbol}
        </ApproveButton>
      )
    }

    if (tvl[1].toString() === "0" && isOwner) {
      return (
        <Button
          onClick={handleSubmit}
          theme={direction === "deposit" ? "primary" : "warn"}
          fz={22}
          full
        >
          {direction === "deposit"
            ? `Buy ${poolData?.symbol}`
            : `Sell ${poolData?.symbol}`}
        </Button>
      )
    }

    if (tvl[1].toString() === "0") {
      return (
        <Button theme="disabled" fz={22} full>
          not available
        </Button>
      )
    }

    return (
      <Button
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={swapTokens}
        fz={22}
        full
      >
        {direction === "deposit"
          ? `Buy ${poolData?.symbol}`
          : `Sell ${poolData?.symbol}`}
      </Button>
    )
  }

  const price = getPrice()

  const priceTemplate =
    price === "0" ? (
      <Flex m="0 -10px 0 0" p="13px 0 10px" ai="center">
        <PriceText color="#F7F7F7">
          {isOwner ? "Deposit to start" : "Pool is closed"}
        </PriceText>
        <TooltipIcon src={tooltip} />
      </Flex>
    ) : (
      <Flex m="0 -10px 0 0" p="13px 0 10px" ai="center">
        <PriceText color="#F7F7F7">
          1 {poolData?.symbol} = {tvl[0].div(tvl[1]).toString()}{" "}
          {fromData?.symbol}
        </PriceText>
        <PriceText color="#999999">
          (~{isStable(fromAddress) ? "1.00" : "1.00"}$)
        </PriceText>
        <TooltipIcon src={tooltip} />
      </Flex>
    )

  const button = getButton()

  const form = (
    <div>
      <ExchangeFrom
        price={0}
        amount={fromAmount}
        balance={fromBalance}
        address={fromAddress}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
        isAlloved={!isAlloved}
        onSelect={() => {}}
        isStable={isStable(fromAddress)}
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
        balance={userPoolData[2]}
        address={poolAddress}
        symbol={poolData?.symbol}
        decimal={18}
        isPool
        onChange={handleToChange}
        onSelect={() => {}}
      />

      <PriceContainer>
        <Label>Price: </Label>
        {!fromData && !rates ? (
          <StageSpinner size={12} loading />
        ) : (
          priceTemplate
        )}
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
