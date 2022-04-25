import React, { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { PulseSpinner } from "react-spinners-kit"
import { useSelector } from "react-redux"

import Payload from "components/Payload"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button, { BorderedButton, SecondaryButton } from "components/Button"

import { PriceFeed, TraderPool } from "abi"
import useContract, { useERC20 } from "hooks/useContract"
import { usePool } from "state/pools/hooks"

import LockedIcon from "assets/icons/LockedIcon"

import { createClient, Provider as GraphProvider } from "urql"
import { formatDecimalsNumber, getAllowance } from "utils"
import { getDividedBalance, getPriceLP } from "utils/formulas"

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
} from "./styled"
import { PoolType } from "constants/interfaces_v2"
import { selectPriceFeedAddress } from "state/contracts/selectors"

export const useInvest = (): [
  {
    fromAmount: string
    toAmount: string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    pending: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: string) => void
    setToAmount: (amount: string) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: (v: "deposit" | "withdraw") => void
    setPercentage: (v: number) => void
    setToSelector: (state: boolean) => void
    setFromSelector: (state: boolean) => void
  }
] => {
  const { library } = useWeb3React()

  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
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
    (amount: string): void => setFromAmount(amount),
    []
  )

  const setToAmountCallback = useCallback(
    (amount: string): void => setToAmount(amount),
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

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

function Invest() {
  const { account, library } = useWeb3React()
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useInvest()

  const [isSubmiting, setSubmiting] = useState(false)
  const [slippage, setSlippage] = useState(2)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [allowance, setAllowance] = useState("-1")
  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))

  const { poolAddress, poolType } = useParams<{
    poolAddress: string
    poolType: PoolType
  }>()
  const [, poolData] = usePool(poolAddress)
  const priceLP = poolData ? getPriceLP(poolData.priceHistory) : "1"

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const traderPool = useContract(poolData?.id, TraderPool)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const [fromToken, fromData, fromBalance] = useERC20(poolData?.baseToken)

  const handleSubmit = async () => {
    setSubmiting(true)
    if (direction === "deposit") {
      const deposit = async () => {
        const amount = BigNumber.from(fromAmount)
        const invest = await traderPool?.getInvestTokens(amount.toHexString())
        const investResult = await traderPool?.invest(
          amount.toHexString(),
          invest.receivedAmounts
        )
        console.log(investResult)
        setSubmiting(false)
      }

      deposit().catch((e) => {
        console.error(e)
        setSubmiting(false)
      })
    } else {
      ;(async () => {
        try {
          const amountOutBn = ethers.utils.parseUnits(toAmount.toString(), 18)
          console.log(amountOutBn)
          const divest = await traderPool?.getDivestAmountsAndCommissions(
            account,
            amountOutBn.toHexString()
          )
          const divestResult = await traderPool?.divest(
            amountOutBn.toHexString(),
            divest.receptions.receivedAmounts,
            divest.commissions.dexeDexeCommission
          )
          setSubmiting(false)
          console.log("withdraw: ", divestResult)
        } catch (e) {
          setSubmiting(false)
          console.log(e)
        }
      })()
    }
  }

  const handlePercentageChange = (percent) => {
    const from = getDividedBalance(fromBalance, fromData?.decimals, percent)
    handleFromChange(from)
  }

  const handleDirectionChange = () => {
    if (direction === "deposit") {
      setDirection("withdraw")
    } else {
      setDirection("deposit")
    }
  }

  const handleFromChange = (v: string) => {
    setFromAmount(v)

    const fetchAndUpdateTo = async () => {
      const amount = BigNumber.from(v)
      console.log(amount.toHexString())
      const tokens = await traderPool?.getInvestTokens(amount.toHexString())
      console.log(tokens)
    }

    fetchAndUpdateTo().catch(console.error)
  }

  const handleToChange = (v) => {
    setToAmount(v)
  }

  const approve = () => {
    if (!fromToken) return
    setSubmiting(true)
    ;(async () => {
      try {
        const amountInBN = ethers.utils.parseUnits(fromAmount.toString(), 18)
        const receipt = await fromToken.approve(poolData?.id, amountInBN)
        console.log(receipt)
        setTimeout(() => {
          setSubmiting(false)
        }, 3000)
      } catch (e) {
        setSubmiting(false)
        console.log(e)
      }
    })()
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

    const fetchAndUpdateAllowance = async () => {
      const allowance = await getAllowance(
        account,
        poolData.baseToken,
        poolData.id,
        library
      )
      setAllowance(allowance.toString())
    }

    const allowanceInterval = setInterval(() => {
      fetchAndUpdateAllowance().catch(console.error)
    }, 1000 * 20)

    fetchAndUpdateAllowance().catch(console.error)

    return () => clearInterval(allowanceInterval)
  }, [fromToken, account, library, poolData, direction])

  // get LP tokens balance
  useEffect(() => {
    if (!traderPool || !fromData) return
    ;(async () => {
      const lpBalance = await traderPool.balanceOf(account)
      setToBalance(lpBalance.toString())
    })()

    const interval = setInterval(() => {
      ;(async () => {
        const lpBalance = await traderPool.balanceOf(account)
        setToBalance(lpBalance.toString())
      })()
    }, 1000 * 20)

    return () => clearInterval(interval)
  }, [traderPool, fromData, account])

  // get USD price of base token
  useEffect(() => {
    if (!priceFeed || !poolData) return

    const fetchAndUpdatePrice = async () => {
      const fromPrice = await priceFeed?.getNormalizedPriceOutUSD(
        poolData?.baseToken,
        ethers.utils.parseUnits("1", 18).toHexString(),
        []
      )
      setInPrice(fromPrice)
    }

    fetchAndUpdatePrice().catch(console.error)
  }, [poolData, priceFeed])

  const getButton = () => {
    if (fromAmount === "0") {
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
          ? `Buy ${poolData?.ticker}`
          : `Sell ${poolData?.ticker}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <div>
      <ExchangeFrom
        price={inPrice}
        amount={fromAmount}
        balance={fromBalance}
        address={poolData?.baseToken}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
      />

      {/* TODO: handle balance change on percent click */}
      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      <ExchangeTo
        price={outPrice}
        amount={toAmount}
        balance={toBalance}
        address={poolAddress}
        symbol={poolData?.ticker}
        decimal={18}
        onChange={handleToChange}
      />
      <Flex p="16px 0 0" full>
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
      <Payload isOpen={isSubmiting} toggle={() => setSubmiting(false)} />

      {form}
    </Container>
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
