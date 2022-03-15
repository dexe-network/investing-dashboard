import { useState, useEffect, useCallback } from "react"
import MemberMobile from "components/MemberMobile"
import Button, { SecondaryButton } from "components/Button"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import FundsWidget from "components/FundsWidget"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import NavTabs from "components/NavTabs"
import {
  selectBasicPoolByAddress,
  selectInvestPoolByAddress,
} from "state/pools/selectors"
import {
  Container,
  ButtonContainer,
  Details,
  TextGrey,
  TextWhiteBig,
  FundsUsed,
} from "./styled"
import { Flex } from "theme"
import { AppState } from "state"
import investingHistory from "assets/template-buttons/investing-history-grey.svg"
import { IDetailedChart } from "constants/interfaces"
import {
  TabCard,
  Row,
  MainText,
  MainValue,
  Period,
  ChartPeriods,
} from "pages/Investor/styled"

import AreaChart from "components/AreaChart"
import BarChart from "pages/Investor/Bar"
import TabsLight from "components/TabsLight"

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
    lpBasicPercent: 1,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "3",
    y: 1.12,
    lpBasic: "0",
    lpBasicPercent: 1.2,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "4",
    y: 11.34,
    lpBasic: "0",
    lpBasicPercent: 1.2,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "5",
    y: 11,
    lpBasic: "0",
    lpBasicPercent: 1.2,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "6",
    y: 11.76,
    lpBasic: "0",
    lpBasicPercent: 1.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "7",
    y: 12.34,
    lpBasic: "0",
    lpBasicPercent: 5.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "8",
    y: 15.92,
    lpBasic: "0",
    lpBasicPercent: 5.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "9",
    y: 18.3,
    lpBasic: "0",
    lpBasicPercent: 5.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "10",
    y: 19.3,
    lpBasic: "0",
    lpBasicPercent: 5.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "11",
    y: 23.3,
    lpBasic: "0",
    lpBasicPercent: 5.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "12",
    y: 23.63,
    lpBasic: "0",
    lpBasicPercent: 5.5,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
]

interface Props {}

const Profile: React.FC<Props> = () => {
  const { poolAddress, poolType } = useParams<{
    poolAddress: string
    poolType: "basic" | "invest"
  }>()
  const history = useHistory()
  const pools = {
    basic: useSelector((state: AppState) =>
      selectBasicPoolByAddress(state, poolAddress)
    ),
    invest: useSelector((state: AppState) =>
      selectInvestPoolByAddress(state, poolAddress)
    ),
  }
  const poolData = pools[poolType]

  const handleBuyRedirect = () => {
    history.push(`/pool/invest/${poolType}/${poolData.id}`)
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
        <TabsLight
          tabs={[
            {
              name: "Profit & Loss",
              child: (
                <>
                  <BarChart />
                  <Row>
                    <TextGrey>P&L LP - $ETH</TextGrey>
                    <MainValue>+ 13.1% (+112.132 ETH)</MainValue>
                  </Row>
                  <Row>
                    <TextGrey>P&L LP - USD% - USD</TextGrey>
                    <MainValue>+ 19.1% - 19.1 USD </MainValue>
                  </Row>
                </>
              ),
            },
            {
              name: "Locked funds",
              child: (
                <>
                  <AreaChart
                    multiple
                    tooltipSize="lg"
                    height={163}
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
                  <Flex full p="15px 0 0">
                    <Row>
                      <TextGrey>Locked out of investor funds</TextGrey>
                      <MainValue>$32.12k</MainValue>
                    </Row>
                  </Flex>
                  <Row>
                    <TextGrey>Your funds locked</TextGrey>
                    <TextWhiteBig>$32.12k</TextWhiteBig>
                  </Row>
                  <Row>
                    <FundsUsed
                      current={"$61.15k / $101.92k"}
                      total={"Fund used (60%)"}
                    />
                  </Row>
                </>
              ),
            },
          ]}
        />
      </TabCard>

      {/* <Details>
        <TabsLight
          tabs={[
            {
              name: "Statistic",
              child: <FundStatisticsCard data={poolData} />,
            },
            { name: "Details", child: <FundDetailsCard data={poolData} /> },
          ]}
        />
      </Details> */}
    </Container>
  )
}

export default Profile
