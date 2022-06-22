import { useState, useEffect, useCallback, useMemo } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { GuardSpinner } from "react-spinners-kit"
import { useWeb3React } from "@web3-react/core"
import { createClient, Provider as GraphProvider } from "urql"
import { ethers } from "ethers"

import { Flex, Center } from "theme"
import Button, { SecondaryButton } from "components/Button"
import MemberMobile from "components/MemberMobile"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import TabsLight from "components/TabsLight"
import ProfitLossChart from "components/ProfitLossChart"
import Header from "components/Header/Layout"
import { Profiles } from "components/Header/Components"
import Pools from "components/Header/Pools"
import AreaChart from "components/AreaChart"
import PerformanceFeeCard from "components/PerformanceFeeCard"
import BarChart from "pages/Investor/Bar"
import IconButton from "components/IconButton"
import pencil from "assets/icons/pencil.svg"

import { formatBigNumber } from "utils"
import { IDetailedChart } from "constants/interfaces"
import { usePoolQuery, usePoolContract, useTraderPool } from "hooks/usePool"

import {
  TabCard,
  Row,
  MainText,
  MainValue,
  Period,
  ChartPeriods,
} from "pages/Investor/styled"

import {
  Container,
  ButtonContainer,
  Details,
  TextWhiteBig,
  TextGrey,
  FundsUsed,
  DetailsEditLinkFrame,
  OwnInvesting,
  OwnInvestingLabel,
  OwnInvestingValue,
  OwnInvestingLink,
} from "./styled"

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

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

interface Props {}

function Trader(props: Props) {
  const {} = props

  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const { poolAddress, poolType } = useParams<{
    poolAddress: string
    poolType: string
  }>()

  const [commisionUnlockTime, setCommisionUnlockTime] = useState<number>(0)
  const [isPerformanceFeeExist, setPerformanceFeeExist] =
    useState<boolean>(false)
  const [ownInvestUsd, setOwnInvestUsd] = useState<string>("0")

  useEffect(() => {
    localStorage.setItem(`last-visited-profile-${account}`, pathname)
  }, [pathname, account])

  const traderPool = useTraderPool(poolAddress)
  const [poolData] = usePoolQuery(poolAddress)
  const [leverageInfo, poolInfoData] = usePoolContract(poolAddress)
  const navigate = useNavigate()

  const redirectToInvestor = useCallback(() => {
    navigate("/me/investor")
  }, [navigate])

  const handleBuyRedirect = () => {
    navigate(`/pool/invest/${poolData?.id}`)
  }

  const commissionPercentage = useMemo((): number | string => {
    if (!poolInfoData) return "0"

    return formatBigNumber(poolInfoData?.parameters.commissionPercentage, 25, 0)
  }, [poolInfoData])

  useEffect(() => {
    if (!traderPool || !account) return
    ;(async () => {
      const isAdmin = await traderPool?.isTraderAdmin(account)
      if (!isAdmin) redirectToInvestor()
    })()
  }, [traderPool, account, redirectToInvestor])

  useEffect((): void => {
    if (!traderPool) return
    ;(async () => {
      const investors = await traderPool?.totalInvestors()

      const limit = +ethers.utils.formatEther(investors) + 1
      const res = await traderPool?.getUsersInfo(0, limit)

      const commisionTime = ethers.utils.formatEther(
        res[0].commissionUnlockTimestamp
      )
      setCommisionUnlockTime(Number(commisionTime))
    })()
  }, [traderPool])

  useEffect((): void => {
    if (!traderPool) return
    ;(async () => {
      setPerformanceFeeExist
      const investors = await traderPool?.totalInvestors()

      const limit = +ethers.utils.formatEther(investors) + 1
      const fees = await traderPool?.getReinvestCommissions(0, limit)

      const commission = formatBigNumber(fees.traderBaseCommission, 18, 0)
      setPerformanceFeeExist(Number(commission) > 0)
    })()
  }, [traderPool])

  useEffect((): void => {
    if (!traderPool) return
    ;(async () => {
      const poolInfo = await traderPool?.getPoolInfo()

      setOwnInvestUsd(formatBigNumber(poolInfo.traderUSD, 18, 3))
    })()
  }, [traderPool])

  const body = !poolData ? (
    <Center>
      <GuardSpinner size={20} loading />
    </Center>
  ) : (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MemberMobile data={poolData}>
        <ButtonContainer>
          <SecondaryButton
            fz={14}
            full
            onClick={() => navigate(`/pool/swap/${poolType}/${poolData.id}/0x`)}
          >
            Open new trade
          </SecondaryButton>
          <Button
            fz={14}
            onClick={() => navigate(`/fund-positions/${poolData.id}/open`)}
            full
          >
            Positions
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

      <OwnInvesting>
        <Flex dir="column" ai="flex-start">
          <OwnInvestingLabel>My own investing</OwnInvestingLabel>
          <OwnInvestingValue>$ {ownInvestUsd}</OwnInvestingValue>
        </Flex>
        <OwnInvestingLink onClick={handleBuyRedirect} />
      </OwnInvesting>

      <Details>
        <DetailsEditLinkFrame>
          <IconButton
            filled
            media={pencil}
            onClick={() => {
              navigate(`/fund-details/${poolData.id}/edit`)
            }}
            size={10}
          />
        </DetailsEditLinkFrame>
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
                <FundDetailsCard poolInfo={poolInfoData} data={poolData}>
                  <PerformanceFeeCard
                    performanceFeePercent={commissionPercentage}
                    commisionUnlockTime={commisionUnlockTime}
                    isPerformanceFeeExist={isPerformanceFeeExist}
                    poolAddress={poolAddress}
                    poolType={poolType}
                    p="15px 0 0"
                  />
                </FundDetailsCard>
              ),
            },
          ]}
        />
      </Details>
    </Container>
  )

  return (
    <>
      <Header left={<Profiles onClick={redirectToInvestor} />}>
        My trader profile
        <Pools />
      </Header>
      {body}
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
