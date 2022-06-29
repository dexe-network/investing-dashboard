import { FC, useState } from "react"
import { Flex } from "theme"
import { format } from "date-fns/esm"
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom"
import { useSelector } from "react-redux"
import { createClient, Provider as GraphProvider } from "urql"

import Header from "components/Header/Layout"
import IconButton from "components/IconButton"
import Checkbox from "components/Checkbox"
import TokensList from "components/TokensList"
import Button, { SecondaryButton } from "components/Button"
import Input from "components/Input"
import TokenIcon from "components/TokenIcon"
import Slider from "components/Slider"
import Tooltip from "components/Tooltip"
import DatePicker from "components/DatePicker"
import Payload from "components/Payload"
import TransactionError from "modals/TransactionError"

import { usePoolContract } from "hooks/usePool"
import { Token } from "constants/interfaces"
import { selectWhitelist } from "state/pricefeed/selectors"
import { useERC20 } from "hooks/useContract"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"

import { expandTimestamp, formatBigNumber, normalizeBigNumber } from "utils"

import back from "assets/icons/angle-left.svg"
import close from "assets/icons/close-big.svg"
import calendar from "assets/icons/calendar.svg"

import faqText from "./faq"
import useCreateRiskyProposal from "./useCreateRiskyProposal"

import {
  Container,
  Card,
  Content,
  Title,
  SubTitle,
  Row,
  CardHeader,
  Link,
  Body,
  FaqText,
  CheckboxLabel,
  CalendarIcon,
  TokenContainer,
  TokenInfo,
  Symbol,
  Name,
  Price,
  HintText,
  Label,
  White,
  Grey,
} from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const isFaqRead = localStorage.getItem("risky-proposal-faq-read") === "true"

const CreateRiskyProposal: FC = () => {
  const { tokenAddress, poolAddress } = useParams()

  const [
    {
      error,
      isSubmiting,
      lpAvailable,
      baseTokenPrice,
      lpAmount,
      timestampLimit,
      investLPLimit,
      maxTokenPriceLimit,
      instantTradePercentage,
    },
    {
      setError,
      setSubmiting,
      setLpAmount,
      setTimestampLimit,
      setInvestLPLimit,
      setMaxTokenPriceLimit,
      setInstantTradePercentage,
      handleSubmit,
    },
  ] = useCreateRiskyProposal(poolAddress, tokenAddress)

  const [isChecked, setChecked] = useState(false)
  const [isDateOpen, setDateOpen] = useState(false)

  const proposalTokenPrice = useTokenPriceOutUSD({ tokenAddress: tokenAddress })
  const [, poolInfo] = usePoolContract(poolAddress)
  const [, baseTokenData] = useERC20(poolInfo?.parameters.baseToken)

  const [, tokenData] = useERC20(tokenAddress)
  const navigate = useNavigate()

  const whitelisted = useSelector(selectWhitelist)

  const handleNextStep = () => {
    if (isChecked) {
      localStorage.setItem("risky-proposal-faq-read", "true")
    }

    if (!tokenData) {
      navigate(`/create-risky-proposal/${poolAddress}/0x/2`)
    }
  }

  const handleRiskyTokenSelect = (token: Token) => {
    navigate(`/create-risky-proposal/${poolAddress}/${token.address}/3`)
  }

  const stepComponents = {
    "1": {
      header: (
        <>
          <Title>How a risky proposal works ?</Title>
        </>
      ),
      content: (
        <Body>
          <FaqText>{faqText}</FaqText>
          <Flex full jc="flex-start" p="24px 0">
            <Checkbox
              label={
                <CheckboxLabel>
                  Don&apos;t show me this message again
                </CheckboxLabel>
              }
              name="dont-show-risky-proposal-faq"
              checked={isChecked}
              onChange={setChecked}
            />
          </Flex>
          <Flex full>
            <SecondaryButton
              size="small"
              m="0 8px 0 0"
              full
              onClick={() => navigate(-1)}
            >
              Return
            </SecondaryButton>
            <Button size="small" m="0 0 0 8px" full onClick={handleNextStep}>
              Continue
            </Button>
          </Flex>
        </Body>
      ),
    },
    "2": {
      header: (
        <>
          <IconButton media={back} onClick={() => navigate(-1)} />
          <Title>Select token</Title>
        </>
      ),
      content: (
        <Body noPaddings>
          <TokensList
            query=""
            handleChange={() => {}}
            tokens={whitelisted}
            onSelect={handleRiskyTokenSelect}
          />
        </Body>
      ),
    },
    "3": {
      header: (
        <>
          <IconButton media={back} onClick={() => navigate(-1)} />
          <Title>Open risk proposal</Title>
          <Link>read more</Link>
          <IconButton media={close} onClick={() => navigate(-3)} />
        </>
      ),
      content: (
        <>
          <TokenContainer>
            <TokenIcon address={tokenAddress} size={30} />
            <TokenInfo>
              <Symbol>{tokenData?.symbol}</Symbol>
              <Name>{tokenData?.name}</Name>
            </TokenInfo>
            {!!proposalTokenPrice && (
              <Price>${normalizeBigNumber(proposalTokenPrice, 18, 2)}</Price>
            )}
          </TokenContainer>
          <Body>
            <HintText>
              If you want to create risk proposal please fill out the form
              below. You can change parameters after creation
            </HintText>
            <SubTitle>Risk Proposal settings</SubTitle>

            <Row>
              <Label
                icon={<Tooltip id="risky-date-limit">Lorem ipsum</Tooltip>}
              >
                Investment in risk proposal pool is open until
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
              <Label icon={<Tooltip id="risky-lp-limit">Lorem ipsum</Tooltip>}>
                LPs available for staking among all investors
              </Label>
              <Input
                type="number"
                theme="grey"
                value={investLPLimit}
                placeholder="---"
                onChange={setInvestLPLimit}
                rightIcon={
                  <Flex>
                    <Grey>LP</Grey>
                  </Flex>
                }
              />
            </Row>
            <Row>
              <Label
                icon={<Tooltip id="risky-max-price" />}
                right={<>Current price:</>}
              >
                Maximun buying price
              </Label>
              <Input
                type="number"
                theme="grey"
                placeholder="---"
                onChange={setMaxTokenPriceLimit}
                value={maxTokenPriceLimit}
                rightIcon={
                  <Flex>
                    <White>
                      {baseTokenPrice &&
                        normalizeBigNumber(
                          baseTokenPrice,
                          baseTokenData?.decimals,
                          4
                        )}
                    </White>
                    <Grey>{baseTokenData?.symbol}</Grey>
                  </Flex>
                }
              />
            </Row>
            <Flex full p="53px 0 0">
              <SubTitle>Own investing settings</SubTitle>
            </Flex>
            <Row>
              <Label
                icon={<Tooltip id="risky-max-price" />}
                right={<>Available:</>}
              >
                LPs allocated for the risk proposal
              </Label>
              <Input
                type="number"
                theme="grey"
                value={lpAmount}
                placeholder="---"
                onChange={setLpAmount}
                rightIcon={
                  <Flex>
                    <White>{formatBigNumber(lpAvailable)}</White>
                    <Grey>LP</Grey>
                  </Flex>
                }
              />
            </Row>
            <Row>
              <Label
                icon={<Tooltip id="risky-position-fill">Lorem ipsum</Tooltip>}
              >
                Position filled after proposal creation
              </Label>
              <Slider
                name="position-fill"
                initial={instantTradePercentage}
                limits={{ max: 100, min: 0 }}
                onChange={(n, v) => setInstantTradePercentage(v)}
              />
            </Row>
            <Flex full p="20px 0 0">
              <Button onClick={handleSubmit} full size="large">
                Create risky proposal
              </Button>
            </Flex>
          </Body>
        </>
      ),
    },
  }

  return (
    <>
      <Payload isOpen={isSubmiting} toggle={() => setSubmiting(false)} />
      <TransactionError isOpen={!!error.length} toggle={() => setError("")}>
        {error}
      </TransactionError>
      <Header>Create risky proposal</Header>
      <Container>
        <Card>
          <Routes>
            <Route
              path="1"
              element={
                isFaqRead ? (
                  <Navigate
                    to={`/create-risky-proposal/${poolAddress}/${tokenAddress}/2`}
                    replace
                  />
                ) : (
                  <>
                    <CardHeader>{stepComponents["1"].header}</CardHeader>
                    <Content>{stepComponents["1"].content}</Content>
                  </>
                )
              }
            />
            <Route
              path="2"
              element={
                <>
                  <CardHeader>{stepComponents["2"].header}</CardHeader>

                  <Content>{stepComponents["2"].content}</Content>
                </>
              }
            />
            <Route
              path="3"
              element={
                <>
                  <CardHeader>{stepComponents["3"].header}</CardHeader>

                  <Content>{stepComponents["3"].content}</Content>
                </>
              }
            />
          </Routes>
        </Card>
      </Container>
    </>
  )
}

const CreateRiskyProposalWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <CreateRiskyProposal />
    </GraphProvider>
  )
}

export default CreateRiskyProposalWithProvider
