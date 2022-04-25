import { Flex, Center, To } from "theme"
import { useSwipeable } from "react-swipeable"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import FundsList from "components/FundsList"
import { useSelector } from "react-redux"
import MemberMobile from "components/MemberMobile"
import Button, { SecondaryButton } from "components/Button"
import { useState, useEffect } from "react"
import { GuardSpinner } from "react-spinners-kit"
import { formatNumber } from "utils"
import { ethers } from "ethers"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import { selectBasicPoolByAddress } from "state/pools/selectors"
import { AppState } from "state"
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
import Header from "components/Header/Layout"
import { Profiles } from "components/Header/Components"
import Pools from "components/Header/Pools"

import { IDetailedChart } from "constants/interfaces"

const pnlNew: IDetailedChart[] = [
  {
    x: "1",
    y: 0,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "1",
    y: 0,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "1",
    y: 0,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "1",
    y: 0,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "1",
    y: 0,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
]

interface Props {}

import {
  Container,
  ButtonContainer,
  Details,
  TextWhiteBig,
  TextGrey,
  FundsUsed,
} from "./styled"
import TabsLight from "components/TabsLight"
import { usePool } from "state/pools/hooks"
import { createClient, Provider as GraphProvider } from "urql"
import ProfitLossChart from "components/ProfitLossChart"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

function Trader(props: Props) {
  const {} = props

  const { pathname } = useLocation()
  const { poolAddress, poolType } = useParams<{
    poolAddress: string
    poolType: string
  }>()

  useEffect(() => {
    localStorage.setItem("last-visited-profile", pathname)
  }, [pathname])

  const [, poolData, leverageInfo, poolInfoData] = usePool(poolAddress)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const redirectToInvestor = () => {
    navigate("/me/investor")
  }

  if (!poolData) {
    return (
      <Center>
        <GuardSpinner size={20} loading />
      </Center>
    )
  }

  return (
    <>
      <Header left={<Profiles onClick={redirectToInvestor} />}>
        My trader profile
        <Pools />
      </Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <MemberMobile data={poolData}>
          <ButtonContainer>
            <Flex p="0 24px 0 15px">
              <SecondaryButton full>Positions</SecondaryButton>
            </Flex>
            <Flex full p="0 10px 0 0">
              <Button
                onClick={() =>
                  navigate(`/pool/swap/whitelist/${poolData.id}/0x`)
                }
                full
              >
                New trade
              </Button>
            </Flex>
          </ButtonContainer>
        </MemberMobile>

        <TabCard>
          <TabsLight
            tabs={[
              {
                name: "Profit & Loss",
                child: (
                  <>
                    <ProfitLossChart address={poolAddress} />
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
                      <TextGrey>P&L LP - $ETH</TextGrey>
                      <MainValue>0% (0 ETH)</MainValue>
                    </Row>
                    <Row>
                      <TextGrey>P&L LP - USD% - USD</TextGrey>
                      <MainValue>0% - 0 USD </MainValue>
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
                      tooltipSize="sm"
                      height={163}
                      data={pnlNew}
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
                        <MainText>Locked out of investor funds</MainText>
                        <MainValue>$32.12k</MainValue>
                      </Row>
                    </Flex>
                    <Row>
                      <MainText>Your funds locked</MainText>
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

        <Details>
          <TabsLight
            tabs={[
              {
                name: "Statistic",
                child: (
                  <FundStatisticsCard
                    data={poolData}
                    leverage={leverageInfo}
                    info={poolInfoData}
                  />
                ),
              },
              {
                name: "Details",
                child: (
                  <FundDetailsCard poolInfo={poolInfoData} data={poolData} />
                ),
              },
            ]}
          />
        </Details>
      </Container>
    </>
  )
}

const TraderWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <Trader />
    </GraphProvider>
  )
}

export default TraderWithProvider
