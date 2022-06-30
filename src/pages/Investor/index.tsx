import { Flex, To } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useLocation, useNavigate } from "react-router-dom"

import Button, { SecondaryButton } from "components/Button"
import InvestorMobile from "components/InvestorMobile"
import { useSelector } from "react-redux"

import AreaChart from "components/AreaChart"

import { selectOwnedPools } from "state/user/selectors"
import BarChart from "./Bar"
import {
  Container,
  Tab,
  TabContainer,
  TabCard,
  Row,
  MainText,
  MainValue,
  SecondaryText,
  ButtonContainer,
  Period,
  ChartPeriods,
} from "./styled"
import { IDetailedChart } from "constants/interfaces"
import Header from "components/Header/Layout"
import { Profiles } from "components/Header/Components"
import Pools from "components/Header/Pools"
import { getRedirectedPoolAddress } from "utils"
import { useEffect } from "react"

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
    y: 1,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "3",
    y: 1,
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
    y: 1.15,
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
    y: 5.5,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "9",
    y: 4.87,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "10",
    y: 5.56,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "11",
    y: 5.5,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
  {
    x: "12",
    y: 7.63,
    lpBasic: "0",
    lpBasicPercent: 0,
    lpUsd: "0",
    lpUsdPercent: 0,
  },
]

function Investor(props: Props) {
  const {} = props

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { account } = useWeb3React()

  const ownedPools = useSelector(selectOwnedPools)
  const noPools = !ownedPools.basic.length && !ownedPools.invest.length

  useEffect(() => {
    localStorage.setItem(`last-visited-profile-${account}`, pathname)
  }, [pathname, account])

  const redirectToTrader = () => {
    const redirectPath = getRedirectedPoolAddress(ownedPools)

    if (!!redirectPath) {
      const TRADER_PATH = `/me/trader/profile/${redirectPath[0]}/${redirectPath[1]}`

      navigate(TRADER_PATH)
    }
  }

  const leftIcon = noPools ? <Pools /> : <Profiles onClick={redirectToTrader} />

  return (
    <>
      <Header left={leftIcon}>My investor profile</Header>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <InvestorMobile account={account}>
          <ButtonContainer>
            <To to="/">
              <SecondaryButton full fz={14}>
                New investment
              </SecondaryButton>
            </To>
            <To to="/invest-positions/positions/open">
              <Button full fz={14}>
                My investments
              </Button>
            </To>
          </ButtonContainer>
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
            <MainValue>+ 13.1% (+112.132 ETH)</MainValue>
          </Row>
          <Row>
            <MainText>P&L LP - USD% - USD</MainText>
            <MainValue>+ 19.1% - 19.1 USD </MainValue>
          </Row>
        </TabCard>
      </Container>
    </>
  )
}

export default Investor
