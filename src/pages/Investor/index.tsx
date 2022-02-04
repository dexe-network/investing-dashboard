import { Flex, To } from "theme"
import { useSwipeable } from "react-swipeable"
import { useWeb3React } from "@web3-react/core"
import { Redirect, useHistory } from "react-router-dom"

import Button, { BorderedButton } from "components/Button"
import InvestorMobile from "components/InvestorMobile"
import investingHistory from "assets/template-buttons/investing-history-big.svg"

// import Chart from "./Chart"
import AreaChart from "components/AreaChart"
import BarChart from "./Bar"
import {
  Container,
  Tab,
  TabContainer,
  TabCard,
  Row,
  MainText,
  SecondaryText,
  Buttons,
  Period,
  ChartPeriods,
} from "./styled"
import { IDetailedChart } from "constants/interfaces"

interface Props {}

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

function Investor(props: Props) {
  const {} = props

  const history = useHistory()
  const { account } = useWeb3React()

  const redirectToTrader = () => {
    history.push("/me/trader/0x...")
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => redirectToTrader(),
  })

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <InvestorMobile account={account}>
        <Buttons>
          <Flex p="0 20px 0 15px">
            <img src={investingHistory} />
          </Flex>
          <Flex p="0 12px 0 0">
            <To to="/">
              <Button>New investment</Button>
            </To>
          </Flex>
        </Buttons>
      </InvestorMobile>
      <TabCard>
        <TabContainer>
          <Tab active>Profit & Loss</Tab>
        </TabContainer>
        <AreaChart
          tooltipSize="sm"
          height={window.innerWidth < 375 ? 120 : 174}
          data={pnl}
        />
        <ChartPeriods>
          <Period active>D</Period>
          <Period>W</Period>
          <Period>M</Period>
          <Period>3M</Period>
          <Period>6M</Period>
          <Period>1Y</Period>
          <Period>ALL</Period>
        </ChartPeriods>
        <BarChart />
        <Row>
          <MainText>P&L LP - $ETH</MainText>
          <SecondaryText>+ 13.1% (+112.132 ETH)</SecondaryText>
        </Row>
        <Row>
          <MainText>P&L LP - USD% - USD</MainText>
          <SecondaryText>+ 19.1% - 19.1 USD </SecondaryText>
        </Row>
      </TabCard>
    </Container>
  )
}

export default Investor
