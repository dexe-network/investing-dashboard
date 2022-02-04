import { useState, useEffect, useCallback } from "react"
import MemberMobile from "components/MemberMobile"
import Button, { SecondaryButton } from "components/Button"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import PnlWidget from "components/PnlWidget"
import FundsWidget from "components/FundsWidget"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import NavTabs from "components/NavTabs"
import { selectBasicPoolByAddress } from "state/pools/selectors"
import { Container, ButtonContainer, Details } from "./styled"
import { Flex } from "theme"
import { AppState } from "state"
import investingHistory from "assets/template-buttons/investing-history-grey.svg"
import { IDetailedChart } from "constants/interfaces"
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

const Profile: React.FC<Props> = () => {
  const { poolAddress } = useParams<{ poolAddress: string }>()
  const history = useHistory()
  const poolData = useSelector((state: AppState) =>
    selectBasicPoolByAddress(state, poolAddress)
  )

  const handleBuyRedirect = () => {
    history.push(`/pool/invest/${poolData?.address}`)
  }

  if (!poolData) {
    return <Container>no data</Container>
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
          <img src={investingHistory} />
          <Button onClick={handleBuyRedirect} m="0" size="small">
            Buy {poolData.ticker}
          </Button>
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

      {/* <Flex full p="16px 0 6px">
        <PnlWidget
          pnlPeriod={{ m1: 22.2, m3: 12.3, all: 102.38 }}
          pnlChart={[]}
        />
      </Flex>

      <Flex full p="6px 0">
        <FundsWidget />
      </Flex> */}

      <Details>
        <NavTabs
          tabs={[
            { name: "Statistic", component: <FundStatisticsCard /> },
            { name: "Details", component: <FundDetailsCard /> },
          ]}
        />
      </Details>
    </Container>
  )
}

export default Profile
