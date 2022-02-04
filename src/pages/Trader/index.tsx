import { Flex, Center, To } from "theme"
import { useSwipeable } from "react-swipeable"
import { useHistory, useParams } from "react-router-dom"
import FundsList from "components/FundsList"
import { useSelector } from "react-redux"
import MemberMobile from "components/MemberMobile"
import Button, { BorderedButton } from "components/Button"
import { useState } from "react"
import { GuardSpinner } from "react-spinners-kit"
import { formatNumber } from "utils"
import { ethers } from "ethers"
import PnlWidget from "components/PnlWidget"
import { selectBasicPoolByAddress } from "state/pools/selectors"
import { AppState } from "state"
import {
  Tab,
  TabCard,
  Row,
  MainText,
  Period,
  ChartPeriods,
} from "pages/Investor/styled"

import AreaChart from "components/AreaChart"
import BarChart from "pages/Investor/Bar"

import newTradeButton from "assets/template-buttons/new-trade.svg"
import fundPositions from "assets/template-buttons/fund-positions.svg"
import { IDetailedChart } from "constants/interfaces"

const pnl: IDetailedChart[] = [
  {
    x: "1",
    y: 1,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "2",
    y: 1.23,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "3",
    y: 1.12,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "4",
    y: 1.34,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "5",
    y: 1,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "6",
    y: 1.76,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "7",
    y: 2.34,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "8",
    y: 1.92,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "9",
    y: 2.3,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "10",
    y: 2.3,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "11",
    y: 2.3,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "12",
    y: 2.63,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
]

interface Props {}

import {
  Container,
  Buttons,
  ButtonContainer,
  Section,
  HalfBlock,
  Label,
  Value,
  Pnl,
} from "./styled"

function Trader(props: Props) {
  const {} = props

  const { poolAddress } = useParams<{ poolAddress: string }>()

  const poolData = useSelector((state: AppState) =>
    selectBasicPoolByAddress(state, poolAddress)
  )
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const redirectToInvestor = () => {
    history.push("/me/investor")
  }

  if (!poolData) {
    return (
      <Center>
        <GuardSpinner size={20} loading />
      </Center>
    )
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MemberMobile data={poolData}>
        <ButtonContainer>
          <Flex p="0 24px 0 15px">
            <img src={fundPositions} />
          </Flex>
          <Flex full p="0 10px 0 0">
            <Button full>New trade</Button>
          </Flex>
        </ButtonContainer>
      </MemberMobile>

      <TabCard>
        <Tab>Profit & Loss</Tab>
        <ChartPeriods>
          <Period active>D</Period>
          <Period>W</Period>
          <Period>M</Period>
          <Period>3M</Period>
          <Period>6M</Period>
          <Period>1Y</Period>
          <Period>ALL</Period>
        </ChartPeriods>
        <AreaChart tooltipSize="sm" height={120} data={pnl} />
        <BarChart />
        <Row>
          <MainText>P&L LP - $ETH</MainText>
          <MainText>+ 13.1% (+112.132 ETH)</MainText>
        </Row>
        <Row>
          <MainText>P&L LP - USD% - USD</MainText>
          <MainText>+ 19.1% - 19.1 USD </MainText>
        </Row>
      </TabCard>
    </Container>
  )
}

export default Trader
