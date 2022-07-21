import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { GuardSpinner } from "react-spinners-kit"

import MemberMobile from "components/MemberMobile"
import Button, { SecondaryButton } from "components/Button"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import AreaChart from "components/AreaChart"
import ProfitLossChart from "components/ProfitLossChart"
import TabsLight from "components/TabsLight"
import Header from "components/Header/Layout"

import { Flex, Center } from "theme"
import {
  Container,
  ButtonContainer,
  Details,
  TextGrey,
  TextWhiteBig,
  FundsUsed,
} from "./styled"

import {
  TabCard,
  Row,
  MainValue,
  Period,
  ChartPeriods,
} from "pages/Investor/styled"
import BarChart from "pages/Investor/Bar"

import { IDetailedChart } from "constants/interfaces"
import { PoolType } from "constants/interfaces_v2"
import { shortenAddress } from "utils"
import { useActiveWeb3React } from "hooks"
import { usePoolContract, usePoolQuery } from "hooks/usePool"

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

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const Profile: React.FC<Props> = () => {
  const { account } = useActiveWeb3React()
  const { poolAddress, poolType } = useParams<{
    poolAddress: string
    poolType: PoolType
  }>()

  const [poolData] = usePoolQuery(poolAddress)
  const [leverageInfo, poolInfoData] = usePoolContract(poolAddress)

  const navigate = useNavigate()

  const isPoolOwner = useMemo(() => {
    if (!account || !poolInfoData) return false
    return account === poolInfoData.parameters.trader
  }, [account, poolInfoData])

  const handleBuyRedirect = () => {
    navigate(`/pool/invest/${poolData?.id}`)
  }

  const handlePositionsRedirect = () => {
    const tabPath = isPoolOwner ? "open" : "closed"
    navigate(`/fund-positions/${poolData?.id}/${tabPath}`)
  }

  const back = () => navigate(-1)

  if (!poolData) {
    return (
      <Center>
        <GuardSpinner size={20} loading />
      </Center>
    )
  }

  return (
    <>
      <Header>{shortenAddress(poolAddress)}</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <MemberMobile data={poolData}>
          <ButtonContainer>
            <SecondaryButton
              onClick={handlePositionsRedirect}
              m="0"
              fz={14}
              full
            >
              Fund positions
            </SecondaryButton>
            <Button onClick={handleBuyRedirect} m="0" fz={14} full>
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
                    <ProfitLossChart address={poolAddress} />
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

const ProfileWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <Profile />
    </GraphProvider>
  )
}

export default ProfileWithProvider
