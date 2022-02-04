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

import { selectBasicPoolByAddress } from "state/pools/selectors"

import useContract, { useERC20 } from "hooks/useContract"

import { ethers } from "ethers"

import LockedIcon from "assets/icons/LockedIcon"
import transactionSettingsIcon from "assets/icons/transaction-settings.svg"
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
} from "./styled"
import Popover from "components/Popover"

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
  const [slippage, setSlippage] = useState(2)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [allowance, setAllowance] = useState("-1")
  const [toBalance, setToBalance] = useState("0")
  const [inPrice, setInPrice] = useState("0")
  const [outPrice, setOutPrice] = useState("0")

  const [error, setError] = useState("")

  const { poolAddress } = useParams<{ poolAddress: string }>()
  const poolData = useSelector((state: AppState) =>
    selectBasicPoolByAddress(state, poolAddress)
  )
  const usdAddress = useSelector<AppState, AppState["contracts"]["USD"]>(
    (state) => state.contracts.USD
  )
  const priceFeedAddress = useSelector(
    (state: AppState) => state.contracts.PriceFeed
  )

  const traderPool = useContract(poolData.address, TraderPool)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const [fromToken, fromData, fromBalance] = useERC20(
    poolData.parameters.baseToken
  )

  const handleSubmit = async () => {
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
        } catch (e) {
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
          console.log("withdraw: ", divestResult)
        } catch (e) {
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
        setToAmount(formatDecimalsNumber(from / parseFloat(poolData.lpPrice)))
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
      setFromAmount(formatDecimalsNumber(to * parseFloat(poolData.lpPrice)))
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
    setToAmount(formatDecimalsNumber(v / parseFloat(poolData.lpPrice)))
  }

  const handleToChange = (v) => {
    // TODO: write handle to change function
    setToAmount(v)
    setFromAmount(formatDecimalsNumber(v * parseFloat(poolData.lpPrice)))
  }

  const approve = () => {
    if (!fromToken) return
    ;(async () => {
      try {
        const amountInBN = ethers.utils.parseUnits(fromAmount.toString(), 18)
        const receipt = await fromToken.approve(poolData.address, amountInBN)
        console.log(receipt)
      } catch (e) {
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
        poolData.parameters.baseToken,
        poolData.address,
        library
      )
      setAllowance(allowance.toString())
    })()
  }, [fromToken, account, library, poolData, direction])

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
    if (!traderPool || !fromData) return
    ;(async () => {
      const lpBalance = await traderPool.balanceOf(account)
      setToBalance(lpBalance.toString())
    })()
  }, [traderPool, fromData, account])

  // get exchange rates of LP
  useEffect(() => {
    if (!priceFeed || !usdAddress || !poolData.parameters.baseToken) return
    ;(async () => {
      try {
        const baseTokenPrice = await priceFeed.getNormalizedPriceOutUSD(
          poolData.parameters.baseToken,
          ethers.utils.parseUnits("1", 18).toString(),
          []
        )
        setInPrice(ethers.utils.formatEther(baseTokenPrice).toString())
        setOutPrice(
          (parseFloat(inPrice) * parseFloat(poolData.lpPrice)).toString()
        )
      } catch (e) {
        console.log(e)
      }
    })()
  }, [
    priceFeed,
    usdAddress,
    poolData.parameters.baseToken,
    inPrice,
    poolData.lpPrice,
  ])

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
            Unlock Token {fromData?.symbol} <LockedIcon />
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
        {direction === "deposit"
          ? `Buy ${poolData.ticker}`
          : `Sell ${poolData.ticker}`}
      </Button>
    )
  }

  const button = getButton()

  const priceTemplate = (
    <Flex ai="center">
      <PriceText>
        {`1 ${poolData.ticker} = ${formatNumber(poolData.lpPrice)} ${
          fromData?.symbol
        } (~${formatNumber(
          (parseFloat(inPrice) * parseFloat(poolData.lpPrice)).toString()
        )}$)`}
      </PriceText>
      <Tooltip id="0">
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
      </Tooltip>
    </Flex>
  )

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
      <SettingsLabel onClick={() => setSettingsOpen(!isSettingsOpen)}>
        <SettingsIcon src={transactionSettingsIcon} />
        Transaction settings
      </SettingsLabel>
      <ExchangeFrom
        price={parseFloat(inPrice)}
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

      <PriceContainer>
        <Label>Price: </Label>
        {!fromData ? <StageSpinner size={12} loading /> : priceTemplate}
      </PriceContainer>

      {button}
    </div>
  )

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MemberMobile data={poolData} />
      {settings}
      {/* <Flex dir="column" full>
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
      </Flex> */}

      {error.length ? <ErrorText>{error}</ErrorText> : form}
    </Container>
  )
}
