import { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { PulseSpinner } from "react-spinners-kit"
import { BigNumber } from "@ethersproject/bignumber"

import SwapPrice from "components/SwapPrice"
import IconButton from "components/IconButton"
import ExchangeTo from "components/Exchange/To"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { BorderedButton } from "components/Button"
import CircularProgress from "components/CircularProgress"

import useContract, { useERC20 } from "hooks/useContract"

import { createClient, Provider as GraphProvider } from "urql"
import { PriceFeed } from "abi"
import { getPriceLP } from "utils/formulas"
import { formatBigNumber, formatDecimalsNumber, fromBig } from "utils"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

import { Container, Card, CardHeader, Title, IconsGroup } from "./styled"
import {
  selectPriceFeedAddress,
  selectUsdAddress,
} from "state/contracts/selectors"
import { useBasicPool } from "state/pools/hooks"

interface SwapParams {
  poolAddress: string
  outputTokenAddress: string
}

const basicPoolsClient = createClient({
  url:
    "https://api.thegraph.com/subgraphs/name/volodymyrzolotukhin/dexe-chapel-basic-pool",
})

export const useSwap = (): [
  {
    fromAmount: number
    toAmount: number | string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    pending: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: number) => void
    setToAmount: (amount: number | string) => void
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
    (amount: number | string): void =>
      setToAmount(parseFloat(amount.toString()) || 0.0),
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

function Swap() {
  const { account } = useWeb3React()
  const history = useHistory()
  const [
    { fromAmount, toAmount, toAddress, toSelectorOpened, direction },
    { setFromAmount, setToAmount, setToAddress, setDirection, setToSelector },
  ] = useSwap()

  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState("0")
  const [outPrice, setOutPrice] = useState("0")

  const { poolAddress, outputTokenAddress } = useParams<SwapParams>()

  const [traderPool, poolData, leverageData, poolInfoData] = useBasicPool(
    poolAddress
  )

  const usdAddress = useSelector(selectUsdAddress)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceLP = getPriceLP(poolData?.priceHistory)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [fromToken, fromData] = useERC20(poolData?.baseToken)
  const [toToken, toData] = useERC20(outputTokenAddress)

  const handleSubmit = async () => {
    if (direction === "deposit") {
      ;(async () => {
        try {
          const from = poolData?.baseToken
          const to = outputTokenAddress
          const amount = ethers.utils.parseUnits(fromAmount.toString(), 18)

          const exchange = await traderPool?.getExchangeFromExactAmount(
            from,
            to,
            amount,
            []
          )
          console.log(exchange.toString())
          // const receipt = await traderPool?.exchangeFromExact(
          //   from,
          //   to,
          //   amount,
          //   exchange,
          //   []
          // )
          // console.log(receipt)
        } catch (e) {
          console.log(e)
        }
      })()
    } else {
      ;(async () => {
        try {
          // const amountOutBn = ethers.utils.parseUnits(toAmount.toString(), 18)
          // console.log(amountOutBn)
          // const divest = await traderPool?.getDivestAmountsAndCommissions(
          //   account,
          //   amountOutBn.toHexString()
          // )
          // const divestResult = await traderPool?.divest(
          //   amountOutBn.toHexString(),
          //   divest.receptions.receivedAmounts,
          //   divest.commissions.dexeDexeCommission
          // )
          // console.log("withdraw: ", divestResult)
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
    setFromAmount(v)
    ;(async () => {
      console.log(ethers.utils.parseUnits(fromAmount.toString(), 18))
      try {
        const from = poolData?.baseToken
        const to = outputTokenAddress
        const amount = ethers.utils.parseUnits(fromAmount.toString(), 18)

        const exchange = await traderPool?.getExchangeFromExactAmount(
          from,
          to,
          amount,
          []
        )

        console.log(ethers.utils.formatEther(exchange))
        const outAmount = formatBigNumber(exchange, 18, 8)
        setToAmount(outAmount)
      } catch (e) {
        console.log(e)
      }
    })()
  }

  const handleToChange = (v) => {
    // TODO: write handle to change function
    setToAmount(v)
    setFromAmount(formatDecimalsNumber(v * parseFloat(priceLP)))
  }

  // get LP tokens balance
  useEffect(() => {
    if (!traderPool || !fromData) return
    ;(async () => {
      const lpBalance: BigNumber = await traderPool.balanceOf(account)
      setToBalance(lpBalance)
    })()
  }, [traderPool, fromData, leverageData, account])

  useEffect(() => {
    if (
      !poolInfoData ||
      !poolInfoData.baseAndPositionBalances ||
      !poolInfoData.baseAndPositionBalances.length
    )
      return
    setFromBalance(poolInfoData.baseAndPositionBalances[0])
  }, [poolInfoData])

  // get exchange rates of LP
  useEffect(() => {
    if (!priceFeed || !usdAddress || !poolData?.baseToken) return
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
  }, [priceFeed, usdAddress, poolData, inPrice, priceLP])

  const getButton = () => {
    try {
      const amountIn = ethers.utils.parseUnits(fromAmount.toString(), 18)

      if (!fromToken) {
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
        (direction === "deposit" && fromBalance.toString() === "0") ||
        (direction === "withdraw" &&
          ethers.utils.parseUnits(toAmount.toString(), 18).gt(toBalance)) ||
        (direction === "withdraw" && toBalance.toString() === "0")
      ) {
        return <BorderedButton size="big">Inufficient funds</BorderedButton>
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
          ? `Buy ${toData?.symbol}`
          : `Sell ${toData?.symbol}`}
      </Button>
    )
  }

  const button = getButton()

  const form = (
    <Card>
      <CardHeader>
        <Title>Open new trade</Title>
        <IconsGroup>
          <CircularProgress />
          <IconButton media={settings} onClick={() => {}} />
          <IconButton media={close} onClick={() => {}} />
        </IconsGroup>
      </CardHeader>

      <ExchangeFrom
        price={parseFloat(inPrice)}
        amount={fromAmount}
        balance={fromBalance}
        address={poolData?.baseToken}
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
        price={outPrice}
        priceChange24H={0}
        amount={toAmount}
        balance={BigNumber.from(toBalance)}
        address={outputTokenAddress}
        symbol={toData?.symbol}
        decimal={toData?.decimals}
        isPool
        onSelect={() => history.push(`/select-token/whitelist/${poolAddress}`)}
        onChange={handleToChange}
      />

      <Flex p="16px 0" full>
        <SwapPrice />
      </Flex>

      {button}
    </Card>
  )

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {form}
    </Container>
  )
}

export default function SwapWithProvider() {
  return (
    <GraphProvider value={basicPoolsClient}>
      <Swap />
    </GraphProvider>
  )
}
