import { FC, useEffect, useState } from "react"
import { Flex } from "theme"
import { useNavigate, useParams } from "react-router-dom"
import getTime from "date-fns/getTime"
import { addDays, format } from "date-fns/esm"
import { useWeb3React } from "@web3-react/core"
import { BigNumber, ethers } from "ethers"
import { InvestTraderPool } from "abi"
import { createClient, Provider as GraphProvider } from "urql"

import Header from "components/Header/Layout"
import IconButton from "components/IconButton"
import Button from "components/Button"
import Input from "components/Input"
import TextArea from "components/TextArea"
import Tooltip from "components/Tooltip"
import DatePicker from "components/DatePicker"
import Payload from "components/Payload"
import TransactionError from "modals/TransactionError"

import useContract from "hooks/useContract"
import { useTraderPool } from "hooks/usePool"

import { addInvestProposalMetadata } from "utils/ipfs"

import {
  shortTimestamp,
  expandTimestamp,
  formatBigNumber,
  parseTransactionError,
  isTxMined,
} from "utils"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"

import close from "assets/icons/close-big.svg"
import calendar from "assets/icons/calendar.svg"

import {
  Container,
  Card,
  Content,
  Title,
  SubTitle,
  Row,
  CardHeader,
  Body,
  CalendarIcon,
  HintText,
  Label,
  White,
  Grey,
  SymbolsLeft,
} from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const useCreateInvestmentProposal = (): [
  {
    lpAmount: string
    ticker: string
    description: string
    timestampLimit: number
    investLPLimit: string
  },
  {
    setLpAmount: (value: string) => void
    setTicker: (value: string) => void
    setDescription: (value: string) => void
    setTimestampLimit: (value: number) => void
    setInvestLPLimit: (value: string) => void
  }
] => {
  const initialTimeLimit = shortTimestamp(getTime(addDays(new Date(), 30)))

  const [lpAmount, setLpAmount] = useState("")
  const [ticker, setTicker] = useState("")
  const [description, setDescription] = useState("")
  const [timestampLimit, setTimestampLimit] = useState(initialTimeLimit)
  const [investLPLimit, setInvestLPLimit] = useState("")

  return [
    { lpAmount, ticker, description, timestampLimit, investLPLimit },
    {
      setLpAmount,
      setTicker,
      setDescription,
      setTimestampLimit,
      setInvestLPLimit,
    },
  ]
}

const CreateInvestmentProposal: FC = () => {
  const [
    { lpAmount, ticker, description, timestampLimit, investLPLimit },
    {
      setLpAmount,
      setTicker,
      setDescription,
      setTimestampLimit,
      setInvestLPLimit,
    },
  ] = useCreateInvestmentProposal()

  const { poolAddress } = useParams()
  const navigate = useNavigate()
  const { account, library } = useWeb3React()
  const traderPool = useTraderPool(poolAddress)

  const [error, setError] = useState("")
  const [isSubmiting, setSubmiting] = useState(false)
  const [isDateOpen, setDateOpen] = useState(false)
  const [lpAvailable, setLpAvailable] = useState<BigNumber | undefined>()

  const investTraderPool = useContract(poolAddress, InvestTraderPool)

  const addTransaction = useTransactionAdder()

  useEffect(() => {
    if (!traderPool || !account) return

    const getBalance = async () => {
      const lpAvailable: BigNumber = await traderPool.balanceOf(account)
      setLpAvailable(lpAvailable)
    }

    getBalance().catch(console.error)
  }, [traderPool, account])

  const handleSubmit = () => {
    if (!investTraderPool || !traderPool) return

    const createInvestProposal = async () => {
      setSubmiting(true)
      setError("")
      const amount = ethers.utils.parseEther(lpAmount).toHexString()

      const divests = await traderPool.getDivestAmountsAndCommissions(
        account,
        amount
      )

      const ipfsReceipt = await addInvestProposalMetadata(
        ticker,
        description,
        account
      )

      const investLPLimitHex = ethers.utils
        .parseUnits(investLPLimit, 18)
        .toHexString()

      const createReceipt = await investTraderPool.createProposal(
        ipfsReceipt.path,
        amount,
        [timestampLimit, investLPLimitHex],
        divests.receptions.receivedAmounts
      )

      const receipt = await addTransaction(createReceipt, {
        type: TransactionType.CREATE_INVEST_PROPOSAL,
        amount,
        ipfsPath: ipfsReceipt.path,
        investLpAmountRaw: investLPLimitHex,
      })

      if (isTxMined(receipt)) {
        setSubmiting(false)
      }
    }

    createInvestProposal().catch((error) => {
      setSubmiting(false)
      console.error(error)

      if (!!error && !!error.data && !!error.data.message) {
        setError(error.data.message)
      } else {
        const errorMessage = parseTransactionError(error.toString())
        !!errorMessage && setError(errorMessage)
      }
    })
  }

  return (
    <>
      <Payload isOpen={isSubmiting} toggle={() => setSubmiting(false)} />
      <TransactionError isOpen={!!error.length} toggle={() => setError("")}>
        {error}
      </TransactionError>
      <Header>Create invest proposal</Header>
      <Container>
        <Card>
          <CardHeader>
            <Title>Proposal</Title>
            <IconButton media={close} onClick={() => navigate(-2)} />
          </CardHeader>
          <Content>
            <Body>
              <HintText>
                If you want to create investment proposal, please, fill out the
                form below. You can change parameters after creation
              </HintText>
              <SubTitle>Investment proposal settings</SubTitle>

              <Row>
                <Label
                  icon={
                    <Tooltip id="invest-proposal-ticker">Lorem ipsum</Tooltip>
                  }
                >
                  New ticker LP2
                </Label>
                <Input
                  theme="grey"
                  value={ticker}
                  onChange={setTicker}
                  placeholder="---"
                />
              </Row>
              <Row>
                <Flex p="0 5px 0 0" full>
                  <Label
                    icon={
                      <Tooltip id="invest-proposal-description">
                        Lorem ipsum
                      </Tooltip>
                    }
                  >
                    Proposal description
                  </Label>
                  <SymbolsLeft>
                    {100 - description.length} symbols left
                  </SymbolsLeft>
                </Flex>
                <TextArea
                  defaultValue={description}
                  name="description"
                  theme="grey"
                  onChange={(n, v) => setDescription(v)}
                />
              </Row>
              <Row>
                <Label
                  icon={<Tooltip id="invest-date-limit">Lorem ipsum</Tooltip>}
                >
                  Investment in invest. proposal pool is open until
                </Label>
                <Input
                  leftIcon={<CalendarIcon src={calendar} />}
                  disabled
                  theme="grey"
                  value=""
                  placeholder={format(
                    expandTimestamp(timestampLimit),
                    "MM.dd.yyyy, HH:mm"
                  )}
                  onClick={() => setDateOpen(!isDateOpen)}
                />
                <DatePicker
                  isOpen={isDateOpen}
                  timestamp={expandTimestamp(timestampLimit)}
                  toggle={() => setDateOpen(false)}
                  onChange={setTimestampLimit}
                />
              </Row>
              <Row>
                <Label
                  icon={<Tooltip id="invest-lp-limit">Lorem ipsum</Tooltip>}
                >
                  Total amount of the investment proposal
                </Label>
                <Input
                  theme="grey"
                  value={investLPLimit}
                  onChange={setInvestLPLimit}
                  placeholder="---"
                />
              </Row>
              <Row>
                <Flex p="0 5px 0 0" full>
                  <Label
                    icon={<Tooltip id="invest-lp-amount">Lorem ipsum</Tooltip>}
                    right={<>Available:</>}
                  >
                    My LPs allocated
                  </Label>
                </Flex>
                <Input
                  theme="grey"
                  placeholder="---"
                  value={lpAmount}
                  onChange={setLpAmount}
                  rightIcon={
                    <Flex>
                      <White>{formatBigNumber(lpAvailable)}</White>
                      <Grey>LP</Grey>
                    </Flex>
                  }
                />
              </Row>
              <Flex full p="20px 0 0">
                <Button onClick={handleSubmit} full size="large">
                  Create risky proposal
                </Button>
              </Flex>
            </Body>
          </Content>
        </Card>
      </Container>
    </>
  )
}

const CreateInvestmentProposalWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <CreateInvestmentProposal />
    </GraphProvider>
  )
}

export default CreateInvestmentProposalWithProvider
