import { useState, useEffect, useCallback } from "react"
import { Flex } from "theme"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "@ethersproject/bignumber"

import IconButton from "components/IconButton"
import ExchangeTo from "components/Exchange/To"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import Button, { SecondaryButton } from "components/Button"
import CircularProgress from "components/CircularProgress"
import TransactionSlippage from "components/TransactionSlippage"
import Header from "components/Header/Layout"
import IpfsIcon from "components/IpfsIcon"
import TransactionError from "modals/TransactionError"

import useContract, {
  useERC20,
  useRiskyProposalContract,
  useTraderPoolContract,
} from "hooks/useContract"

import { PriceFeed } from "abi"
import { getDividedBalance } from "utils/formulas"

import settings from "assets/icons/settings.svg"
import close from "assets/icons/close-big.svg"

import { selectPriceFeedAddress } from "state/contracts/selectors"

import { useRiskyProposal } from "hooks/useRiskyProposals"
import { usePoolContract } from "hooks/usePool"

import {
  Container,
  Card,
  CardHeader,
  Title,
  IconsGroup,
} from "components/Exchange/styled"

export const useRiskyInvest = (): [
  {
    fromAmount: string
    toAmount: string
    slippage: string
    fromAddress: string
    toAddress: string
    toSelectorOpened: boolean
    fromSelectorOpened: boolean
    direction: "deposit" | "withdraw"
  },
  {
    setFromAmount: (amount: string) => void
    setToAmount: (amount: string) => void
    setToAddress: (address: string) => void
    setFromAddress: (address: string) => void
    setDirection: () => void
    setPercentage: (v: number) => void
    setToSelector: (state: boolean) => void
    setFromSelector: (state: boolean) => void
    setSlippage: (slippage: string) => void
  }
] => {
  const [fromAmount, setFromAmount] = useState("0")
  const [toAmount, setToAmount] = useState("0")
  const [slippage, setSlippage] = useState("0.10")
  const [toSelectorOpened, setToSelector] = useState(false)
  const [fromSelectorOpened, setFromSelector] = useState(false)
  const [direction, setDirection] = useState<"deposit" | "withdraw">("deposit")

  const [toAddress, setToAddress] = useState("")
  const [fromAddress, setFromAddress] = useState("")

  const setFromAmountCallback = useCallback(
    (amount: string): void => setFromAmount(amount),
    []
  )

  const setToAmountCallback = useCallback(
    (amount: string): void => setToAmount(amount),
    []
  )

  const setSlippageCallback = useCallback(
    (slippage: string): void => setSlippage(slippage),
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
      slippage,
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
      setSlippage: setSlippageCallback,
    },
  ]
}

function InvestRiskyProposal() {
  const [
    { fromAmount, toAmount, direction, slippage },
    { setFromAmount, setToAmount, setDirection, setSlippage },
  ] = useRiskyInvest()

  const { account } = useWeb3React()

  const [fromAddress, setFromAddress] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [toBalance, setToBalance] = useState(BigNumber.from("0"))
  const [fromBalance, setFromBalance] = useState(BigNumber.from("0"))
  const [inPrice, setInPrice] = useState(BigNumber.from("0"))
  const [outPrice, setOutPrice] = useState(BigNumber.from("0"))

  const [isSlippageOpen, setSlippageOpen] = useState(false)

  const { poolAddress, proposalId } = useParams()

  const traderPool = useTraderPoolContract(poolAddress)
  const [proposalPool] = useRiskyProposalContract(poolAddress)
  const proposal = useRiskyProposal(poolAddress, proposalId)
  const [, poolInfo] = usePoolContract(poolAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [, toData] = useERC20(proposal?.proposalInfo.token)

  const exchangeForm = {
    deposit: {
      from: {
        address: undefined,
        symbol: poolInfo?.ticker,
        decimals: 18,
        icon: <IpfsIcon size={27} hash={poolInfo?.parameters.descriptionURL} />,
      },
      to: {
        address: proposal?.proposalInfo.token,
        symbol: toData?.symbol,
        decimals: toData?.decimals,
        icon: undefined,
      },
    },
    withdraw: {
      from: {
        address: proposal?.proposalInfo.token,
        symbol: toData?.symbol,
        decimals: toData?.decimals,
        icon: undefined,
      },
      to: {
        address: undefined,
        symbol: poolInfo?.ticker,
        decimals: 18,
        icon: <IpfsIcon size={27} hash={poolInfo?.parameters.descriptionURL} />,
      },
    },
  }

  const getInvestTokens = async (amount: BigNumber) => {
    const divests = await traderPool?.getDivestAmountsAndCommissions(
      account,
      amount
    )
    const invests = await proposalPool?.getInvestTokens(
      Number(proposalId) + 1,
      divests.receptions.baseAmount
    )

    console.log([divests, invests])
    return [divests, invests]
  }

  const handleSubmit = async () => {
    const amount = BigNumber.from(fromAmount)
    const [divests, invests] = await getInvestTokens(amount)

    const investReceipt = await traderPool?.investProposal(
      proposalId,
      amount,
      divests.receptions.receivedAmounts,
      invests.positionAmount,
      {
        from: account,
      }
    )
    console.log(investReceipt)
  }

  const handlePercentageChange = (percent) => {
    const from = getDividedBalance(fromBalance, 18, percent)
    handleFromChange(from)
  }

  const handleFromChange = async (v: string) => {
    setFromAmount(v)
    const amount = BigNumber.from(v)

    try {
      const invests = await getInvestTokens(amount)
      // setToAmount(invests.lp2Amount.toString())
    } catch (e) {
      console.log(e)
    }
  }

  // proposalPool.getDivestAmountsAndCommissions()
  // proposalPool.getActiveInvestmentsInfo() -> активные пропозалы
  // traderPool.getInvestTokens()
  const handleToChange = (v: string) => {
    setToAmount(v)

    const fetchAndUpdateFrom = async () => {
      const amount = BigNumber.from(v)

      const divests = await traderPool?.getDivestAmountsAndCommissions(
        account,
        amount
      )
      const invests = await proposalPool?.getInvestTokens(
        Number(proposalId) + 1,
        divests.receptions.baseAmount
      )
      console.log(invests)
    }

    fetchAndUpdateFrom().catch(console.error)
  }

  const getButton = () => {
    if (fromAmount === "0" || toAmount === "0") {
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
        {direction === "deposit" ? `Buy ${toData?.symbol}` : `Sell Risky LP`}
      </Button>
    )
  }

  // get LP balance
  useEffect(() => {
    if (!traderPool || !account) return

    const getLPBalance = async () => {
      const lpAvailable: BigNumber = await traderPool.balanceOf(account)
      if (direction === "deposit") {
        setFromBalance(lpAvailable)
      } else {
        setToBalance(lpAvailable)
      }
    }

    getLPBalance().catch(console.error)
  }, [traderPool, account, direction])

  // get LP2 balance
  useEffect(() => {
    if (!proposalPool || !account) return
    ;(async () => {
      const balance = await proposalPool.balanceOf(
        account,
        Number(proposalId) + 1
      )
      if (direction === "deposit") {
        setToBalance(balance)
      } else {
        setFromBalance(balance)
      }
    })()
  }, [proposalPool, account, proposalId, direction])

  const button = getButton()

  const form = (
    <Card>
      <CardHeader>
        <Flex>
          <Title>Swap</Title>
        </Flex>
        <IconsGroup>
          <CircularProgress />
          <IconButton
            size={12}
            filled
            media={settings}
            onClick={() => setSlippageOpen(!isSlippageOpen)}
          />
          <IconButton size={10} filled media={close} onClick={() => {}} />
        </IconsGroup>
      </CardHeader>

      <ExchangeFrom
        price={inPrice}
        amount={fromAmount}
        balance={fromBalance}
        address={exchangeForm[direction].from.address}
        symbol={exchangeForm[direction].from.symbol}
        customIcon={exchangeForm[direction].from.icon}
        decimal={exchangeForm[direction].from.decimals}
        onChange={handleFromChange}
      />

      <ExchangeDivider
        direction={direction}
        changeAmount={handlePercentageChange}
        changeDirection={setDirection}
      />

      <ExchangeTo
        price={outPrice}
        amount={toAmount}
        balance={toBalance}
        address={exchangeForm[direction].to.address}
        symbol={exchangeForm[direction].to.symbol}
        customIcon={exchangeForm[direction].to.icon}
        decimal={exchangeForm[direction].to.decimals}
        onChange={handleToChange}
      />

      <Flex full p="16px 0 0">
        {button}
      </Flex>

      <TransactionSlippage
        slippage={slippage}
        onChange={setSlippage}
        isOpen={isSlippageOpen}
        toggle={(v) => setSlippageOpen(v)}
      />
    </Card>
  )

  return (
    <>
      <Header>Invest risky proposal</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {form}
      </Container>
    </>
  )
}

export default InvestRiskyProposal
