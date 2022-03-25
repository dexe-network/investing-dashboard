import React, { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"
import { StageSpinner, PulseSpinner } from "react-spinners-kit"

import Payload from "components/Payload"
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
  useUpdate,
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
} from "./styled"
import Popover from "components/Popover"
import IpfsIcon from "components/IpfsIcon"
import { getPriceLP } from "utils/formulas"

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

export default function Invest() {
  const { account, library } = useWeb3React()
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useInvest()

  const [pending, setPending] = useState(false)
  const [isSubmiting, setSubmiting] = useState(false)
  const [slippage, setSlippage] = useState(2)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [allowance, setAllowance] = useState("-1")
  const [toBalance, setToBalance] = useState("0")
  const [inPrice, setInPrice] = useState("0")
  const [outPrice, setOutPrice] = useState("0")

  const [error, setError] = useState("")

  const { poolAddress, poolType } = useParams<{
    poolAddress: string
    poolType: "basic" | "invest"
  }>()
  const pools = {
    basic: useSelector((state: AppState) =>
      selectBasicPoolByAddress(state, poolAddress)
    ),
    invest: useSelector((state: AppState) =>
      selectInvestPoolByAddress(state, poolAddress)
    ),
  }
  const poolData = pools[poolType || "basic"]
  const priceLP = getPriceLP(poolData.priceHistory)
  const usdAddress = useSelector<AppState, AppState["contracts"]["USD"]>(
    (state) => state.contracts.USD
  )
  const priceFeedAddress = useSelector(
    (state: AppState) => state.contracts.PriceFeed
  )

  const traderPool = useContract(poolData.id, TraderPool)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const [fromToken, fromData, fromBalance] = useERC20(poolData.baseToken)

  const handleSubmit = async () => {
    setSubmiting(true)
    if (direction === "deposit") {
      ;(async () => {
        try {
          const amountInBN = ethers.utils.parseUnits(fromAmount.toString(), 18)
          const invest = await traderPool?.getInvestTokens(
            amountInBN.toHexString()
          )
          const investResult = await traderPool?.invest(
            amountInBN.toHexString(),
            invest.receivedAmounts
          )
          console.log("deposit: ", investResult)
          setSubmiting(false)
        } catch (e) {
          setSubmiting(false)
          console.log(e)
        }
      })()
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
        setToAmount(formatDecimalsNumber(from / parseFloat(priceLP)))
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
      setFromAmount(formatDecimalsNumber(to * parseFloat(priceLP)))
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
    console.log(priceLP)
    setToAmount(
      formatDecimalsNumber(v / parseFloat(priceLP === "0" ? "1" : priceLP))
    )
  }

  const handleToChange = (v) => {
    // TODO: write handle to change function
    setToAmount(v)
    setFromAmount(formatDecimalsNumber(v * parseFloat(priceLP)))
  }

  const approve = () => {
    if (!fromToken) return
    setSubmiting(true)
    ;(async () => {
      try {
        const amountInBN = ethers.utils.parseUnits(fromAmount.toString(), 18)
        const receipt = await fromToken.approve(poolData.id, amountInBN)
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
    ;(async () => {
      const allowance = await getAllowance(
        account,
        poolData.baseToken,
        poolData.id,
        library
      )
      setAllowance(allowance.toString())
    })()
    setInterval(() => {
      ;(async () => {
        console.log("update allovance")
        const allowance = await getAllowance(
          account,
          poolData.baseToken,
          poolData.id,
          library
        )
        setAllowance(allowance.toString())
      })()
    }, 1000 * 20)
  }, [fromToken, account, library, poolData, direction])

  // INPUT LISTENERS

  // // in token amount listener
  // useEffect(() => {
  //   if (!traderPool) return
  // }, [traderPool, fromAmount, account, priceLP, setToAmount])

  // // out token amount listener
  // useEffect(() => {
  //   if (!traderPool) return
  // }, [traderPool, toAmount, account, priceLP, setFromAmount])

  // get LP tokens balance
  useEffect(() => {
    if (!traderPool || !fromData) return
    ;(async () => {
      console.log("update lp balance")
      const lpBalance = await traderPool.balanceOf(account)
      setToBalance(lpBalance.toString())
    })()
    const interval = setInterval(() => {
      ;(async () => {
        console.log("update lp balance")
        const lpBalance = await traderPool.balanceOf(account)
        setToBalance(lpBalance.toString())
      })()
    }, 1000 * 20)

    return () => clearInterval(interval)
  }, [traderPool, fromData, account])

  // get exchange rates of LP
  useEffect(() => {
    if (!priceFeed || !usdAddress || !poolData.baseToken) return
    ;(async () => {
      try {
        const baseTokenPrice = await priceFeed.getNormalizedPriceOutUSD(
          poolData.baseToken,
          ethers.utils.parseUnits("1", 18).toString(),
          []
        )
        setInPrice(ethers.utils.formatEther(baseTokenPrice).toString())
        setOutPrice((parseFloat(inPrice) * parseFloat(priceLP)).toString())
      } catch (e) {
        console.log(e)
      }
    })()
  }, [priceFeed, usdAddress, poolData.baseToken, inPrice, priceLP])

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
        size="large"
        theme={direction === "deposit" ? "primary" : "warn"}
        onClick={handleSubmit}
        fz={22}
        full
      >
        {direction === "deposit"
          ? `Buy ${poolData.ticker}`
          : `Sell ${poolData.ticker}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <div>
      <ExchangeFrom
        price={parseFloat(inPrice)}
        amount={fromAmount}
        balance={fromBalance}
        address={poolData.baseToken}
        symbol={fromData?.symbol}
        decimal={fromData?.decimals}
        onChange={handleFromChange}
        isStable
      />

      <ExchangeDivider
        points={[
          {
            label: "10%",
            percent: "0x016345785d8a0000",
            from: parseFloat(
              ethers.utils
                .formatUnits(
                  fromBalance.mul("0x016345785d8a0000"),
                  (fromData?.decimals || 18) + 18
                )
                .toString()
            ),
            to: parseFloat(
              ethers.utils
                .formatUnits(
                  BigNumber.from(toBalance).mul("0x016345785d8a0000"),
                  36
                )
                .toString()
            ),
          },
          {
            label: "25%",
            percent: "0x03782dace9d90000",
            from: parseFloat(
              ethers.utils
                .formatUnits(
                  fromBalance.mul("0x03782dace9d90000"),
                  (fromData?.decimals || 18) + 18
                )
                .toString()
            ),
            to: parseFloat(
              ethers.utils
                .formatUnits(
                  BigNumber.from(toBalance).mul("0x03782dace9d90000"),
                  36
                )
                .toString()
            ),
          },
          {
            label: "50%",
            percent: "0x06f05b59d3b20000",
            from: parseFloat(
              ethers.utils
                .formatUnits(
                  fromBalance.mul("0x06f05b59d3b20000"),
                  (fromData?.decimals || 18) + 18
                )
                .toString()
            ),
            to: parseFloat(
              ethers.utils
                .formatUnits(
                  BigNumber.from(toBalance).mul("0x06f05b59d3b20000"),
                  36
                )
                .toString()
            ),
          },
          {
            label: "75%",
            percent: "0x0a688906bd8b0000",
            from: parseFloat(
              ethers.utils
                .formatUnits(
                  fromBalance.mul("0x0a688906bd8b0000"),
                  (fromData?.decimals || 18) + 18
                )
                .toString()
            ),
            to: parseFloat(
              ethers.utils
                .formatUnits(
                  BigNumber.from(toBalance).mul("0x0a688906bd8b0000"),
                  36
                )
                .toString()
            ),
          },
        ]}
        fromAmount={fromAmount}
        toAmount={toAmount}
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={handleDirectionChange}
      />

      <ExchangeTo
        customIcon={<IpfsIcon size={27} hash={""} />}
        price={outPrice}
        priceChange24H={0}
        amount={toAmount}
        balance={BigNumber.from(toBalance)}
        address={poolAddress}
        symbol={poolData.ticker}
        decimal={18}
        isPool
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
