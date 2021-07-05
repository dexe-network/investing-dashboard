import React, { useState, useEffect, useReducer, useCallback } from "react"
import styled from "styled-components"
import { Flex } from "theme"
import { useParams } from "react-router-dom"

import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"
import tooltip from "assets/icons/tooltip.svg"

import { Label, TooltipIcon, PriceText } from "components/Exchange/styled"

import TokenSelector from "modals/TokenSelector"
import { useSelectPoolByAddress } from "state/pools/hooks"
import { usePoolUpgradeable, useTraderPoolUpgradeable } from "hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { useUniswapExchangeTool, useERC20 } from "hooks/useContract"
import { add } from "date-fns/esm"
import { getUnixTime } from "date-fns"

import { ethers } from "ethers"

import { ErrorText, ApproveButton } from "./styled"

const Container = styled(Flex)`
  height: 100vh;
`

const initialState = {
  from: {
    address: "",
    balance: BigNumber.from(0),
    decimals: 18,
    symbol: "",
    price: BigNumber.from(0), // base token price in $
  },
  to: {
    address: "",
    balance: BigNumber.from(0),
    decimals: 18,
    symbol: "",
    price: BigNumber.from(0), // Pool price in baseTokens price
  },
  direction: "deposit",
  allowance: BigNumber.from(0),
}

export const InvestContext = React.createContext({
  state: initialState,
  setFrom: (n: any, v: any) => {},
  setTo: (n: any, v: any) => {},
})
const reducer = (state, action) => {
  switch (action.type) {
    case "setFrom":
      return {
        ...state,
        from: {
          ...state.from,
          [action.name]: action.value,
        },
      }
    case "setTo":
      return {
        ...state,
        from: {
          ...state.from,
        },
        to: {
          ...state.to,
          [action.name]: action.value,
        },
      }
    case "setDirection":
      return {
        ...state,
        direction: action.direction,
      }
    case "setAllowance":
      return {
        ...state,
        allowance: action.allowance,
      }
  }
}

export default function Invest() {
  const [fromAmount, setFromAmount] = useState(BigNumber.from(0))
  const [toAmount, setToAmount] = useState(BigNumber.from(0))
  const [state, dispatch] = useReducer(reducer, initialState)

  const setFrom = useCallback(
    (n, v) => dispatch({ type: "setFrom", name: n, value: v }),
    []
  )

  const setTo = useCallback(
    (n, v) => dispatch({ type: "setTo", name: n, value: v }),
    []
  )

  const [error, setError] = useState("")

  const [tokenSelectOpened, setModalOpened] = useState(false)
  const { account } = useWeb3React()

  const exchangeTool = useUniswapExchangeTool()

  const { address } = useParams<{ address: string }>()
  const poolData = useSelectPoolByAddress(address)

  const pool = usePoolUpgradeable(address)
  const traderPool = useTraderPoolUpgradeable(address)
  const [baseToken] = useERC20(state.from.address)

  useEffect(() => {
    if (!pool) return

    const getTokenInfo = async () => {
      try {
        const basicToken = await pool.basicToken()
        setFrom("address", basicToken)
      } catch (err) {
        console.log(err)
        setError("Invalid pool address")
      }
    }

    getTokenInfo()
  }, [pool, setFrom])

  useEffect(() => {
    if (!traderPool) return
    const getPoolPrice = async () => {
      try {
        // const tvl = await traderPool.getTotalValueLocked()
        // console.log(tvl)
        // setTo("price", tvl[0].div(tvl[1]))
      } catch (err) {
        console.log(err)
        setError("Price not found in pool")
      }
    }

    getPoolPrice()
  }, [traderPool, setTo])

  useEffect(() => {
    if (!traderPool) return

    const getUserData = async () => {
      try {
        const data = await traderPool.getUserData(account)
        setTo("balance", data[2])
        console.log(data[0].toString(), data[1].toString(), data[2].toString())
      } catch (err) {
        console.log(err)
      }
    }

    getUserData()
  }, [traderPool, account, setTo])

  useEffect(() => {
    if (!poolData) return

    setTo("symbol", poolData.symbol)
  }, [poolData, setTo])

  useEffect(() => {
    setTo("address", address)
  }, [address, setTo])

  useEffect(() => {
    if (!baseToken) return

    const getAllowance = async () => {
      try {
        const allowance = await baseToken.allowance(account, address)
        dispatch({ type: "setAllowance", allowance })
      } catch (e) {
        setError("Unable to get basic token allowance")
      }
    }

    getAllowance()
  }, [baseToken, account, address])

  const swapTokens = async () => {
    const multiplier = BigNumber.from(10).pow(18)

    const amount = BigNumber.from(1000).mul(multiplier)

    const deadline = getUnixTime(
      add(new Date(), {
        minutes: 10,
      })
    )

    const receipt = await exchangeTool?.swapETHForExactTokens(
      amount.toHexString(),
      [
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
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
    const receipt = await baseToken?.approve(
      address,
      fromAmount.toHexString(),
      {
        from: account,
      }
    )

    console.log(receipt)
  }

  const handleSubmit = async () => {
    const res = await pool?.deposit(fromAmount, {
      from: account,
    })
    console.log(res)
  }

  const handlePercentageChange = (percent) => {
    const parsedAmount = state.from.balance.div(100).mul(percent)

    if (parsedAmount._isBigNumber) {
      setFromAmount(parsedAmount)
      setToAmount(parsedAmount.mul(state.to.price))
    }
  }

  const handleDirectionChange = () => {
    if (state.direction === "deposit") {
      dispatch({ type: "setDirection", direction: "withdraw" })
    } else {
      dispatch({ type: "setDirection", direction: "deposit" })
    }
  }

  const handleFromChange = (v) => {
    console.log(v)

    try {
      const amount = ethers.utils.parseUnits(v, state.from.decimals)
      console.log(amount, amount.mul(state.to.price))
      setFromAmount(amount)
      setToAmount(amount.mul(state.to.price))
    } catch (e) {
      console.log(e)
    }
    // setFromAmount()
  }

  const form = (
    <div>
      <ExchangeFrom
        setMaxAmount={() => handlePercentageChange(100)}
        onInputChange={handleFromChange}
        amount={fromAmount}
        context={InvestContext}
      />

      <ExchangeDivider
        direction={state.direction === "deposit" ? "down" : "up"}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      <ExchangeTo
        amount={toAmount}
        openSelector={() => setModalOpened(true)}
        context={InvestContext}
      />

      <Flex full>
        <Label>Price</Label>
        <Flex p="13px 0 10px" ai="center">
          <PriceText color="#F7F7F7">
            1 {state.to.symbol} = {state.to.price.toString()}{" "}
            {state.from.symbol}
          </PriceText>
          <PriceText color="#999999">(~0$)</PriceText>
          <TooltipIcon src={tooltip} />
        </Flex>
      </Flex>

      {fromAmount.gt(state.allowance) && state.direction === "deposit" ? (
        <ApproveButton onClick={approve}>
          Unlock Token {state.from.symbol}
        </ApproveButton>
      ) : (
        <Button
          theme={state.direction === "deposit" ? "primary" : "warn"}
          onClick={handleSubmit}
          fz={22}
          full
        >
          {state.direction === "deposit"
            ? `Buy ${state.to.symbol}`
            : `Sell ${state.to.symbol}`}
        </Button>
      )}
    </div>
  )

  return (
    <InvestContext.Provider value={{ state, setFrom, setTo }}>
      <Container ai="center" jc="center" full>
        <TokenSelector
          isOpen={tokenSelectOpened}
          onRequestClose={() => setModalOpened(false)}
        />

        {error.length ? <ErrorText>{error}</ErrorText> : form}
      </Container>
    </InvestContext.Provider>
  )
}
