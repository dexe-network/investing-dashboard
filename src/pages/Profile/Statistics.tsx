import { useWeb3React } from "@web3-react/core"
import { ease } from "theme"
import Funds from "components/Funds"
import { Orientation } from "constants/types"

import AreaChart from "components/AreaChart"
import StatisticsCalendar from "components/StatisticsCalendar"
import Button from "components/Button"
import DonutChart from "components/DonutChart"

import { useUserProMode } from "state/user/hooks"

import { useCreateFundContext } from "context/CreateFundContext"
import { useConnectWalletContext } from "context/ConnectWalletContext"
import { IPool } from "constants/interfaces"

import rank from "assets/icons/rank.svg"
import copiers from "assets/icons/copiers.svg"
import fee from "assets/icons/trader-fee.svg"
import pie from "assets/icons/pie.svg"
import filled from "assets/icons/filled.svg"

import {
  Overlay,
  AvatarPlaceholder,
  Wrapper,
  ChartWrapper,
  Title,
  PieWrapper,
  Card,
  StatisticsIcon,
  DetailedStatistics,
  StatisticsWrapper,
  ProButton,
  Text,
  calendarVariants,
  detailedVariants,
  overlayVariants,
  pieVariants,
  TraderStatistics,
  IconsWrapper,
  DesktopIcon,
  CalendarWrapper,
  DetailedWrapper,
  Bottom,
} from "pages/Profile/styled"

interface Props {
  data: IPool
}

const Statistics = ({ data }: Props) => {
  const { account } = useWeb3React()
  const [pro] = useUserProMode()
  const { toggleCreateFund } = useCreateFundContext()
  const { toggleConnectWallet } = useConnectWalletContext()
  const animatePro = pro ? "visible" : "hidden"

  const handleInvest = () => {
    if (!account) {
      toggleConnectWallet()
      return
    }

    toggleCreateFund(true)
  }

  const average = [
    {
      label: "Trades per Day:",
      value: `${data.avg.tradesPerDay}`,
    },
    {
      label: "Order size:",
      value: `${data.avg.orderSize}%`,
    },
    {
      label: "Daily Profit:",
      value: `${data.avg.dailyLpProfit}%`,
    },
    {
      label: "Trade position:",
      value: `${data.avg.timePosition}H`,
    },
    {
      label: "Sortino (ETH):",
      value: `${data.sortino.base}`,
    },
    {
      label: "Sortino (BTC):",
      value: `${data.sortino.btc}`,
    },
    {
      label: "Trades:",
      value: `${data.trades}`,
    },
    {
      label: "Maximum Loss:",
      value: `${data.maxLoss}%`,
    },
  ]

  const funds = [
    {
      label: "Personal funds:",
      value: `${data.personalFunds} ETH(${data.personalFundsPercent}%)`,
    },
    {
      label: "Invested:",
      value: `${data.invested} ETH`,
    },
  ]

  const totalPNL = [
    {
      label: "ETH(%):",
      value: `${data.pnl.lpBasicPercent}%`,
    },
    {
      label: "USD(%):",
      value: `${data.pnl.lpUsdPercent}%`,
    },
    {
      label: "Circulating Supply:",
      value: `${data.supply.circulating} ${data.symbol}`,
    },
    {
      label: "Total Supply:",
      value: `${data.supply.total} ${data.symbol}`,
    },
  ]

  const uncategorizedStatistics = [
    {
      label: "Major asset:",
      value: "ETH",
    },
    {
      label: "Profit Factor:",
      value: `${data.profitFactor}`,
    },
  ]

  return (
    <>
      <TraderStatistics full p="0px 35px 0 0">
        <AvatarPlaceholder />

        <IconsWrapper>
          <Funds active={data.baseAddress} type={Orientation.horizontal} />

          <Card>
            <StatisticsIcon src={rank} />
            <Text>{data.rank}</Text>
          </Card>

          <Card>
            <StatisticsIcon src={copiers} />
            <Text>{data.copiers}</Text>
          </Card>

          <Card>
            <StatisticsIcon src={fee} />
            <Text>{data.commision}%</Text>
          </Card>

          <DesktopIcon>
            <StatisticsIcon src={pie} />
            <Text>On</Text>
          </DesktopIcon>

          <DesktopIcon>
            <StatisticsIcon src={filled} />
            <Text>96%</Text>
          </DesktopIcon>
        </IconsWrapper>

        <Button onClick={handleInvest}>Buy {data.symbol}</Button>
      </TraderStatistics>

      <ChartWrapper>
        <Overlay
          initial={animatePro}
          transition={ease}
          animate={animatePro}
          variants={overlayVariants}
        />
        <AreaChart
          title
          period
          data={data.pnl.detailed}
          width={910}
          height={180}
          tooltipSize="lg"
        />
      </ChartWrapper>

      <CalendarWrapper
        initial={animatePro}
        variants={calendarVariants}
        animate={animatePro}
        dir="column"
        full
      >
        <Wrapper p="0px 35px" full dir="column">
          <Title full weight={800}>
            Monthly statistics
          </Title>
          <StatisticsCalendar currentYear data={data.pnl.monthly} />
        </Wrapper>
      </CalendarWrapper>

      <DetailedWrapper
        p="0px 35px"
        initial={animatePro}
        animate={animatePro}
        variants={detailedVariants}
        dir="column"
        full
      >
        <Title full weight={800}>
          Detailed statistics <ProButton />
        </Title>
        <Bottom ai="flex-start" full>
          <StatisticsWrapper>
            <DetailedStatistics
              label=""
              max={pro ? uncategorizedStatistics.length : 0}
              data={uncategorizedStatistics}
            />
            <DetailedStatistics
              max={totalPNL.length}
              label="Total P&L"
              data={totalPNL}
            />
            <DetailedStatistics max={funds.length} label="Funds" data={funds} />
            <DetailedStatistics
              label="Average"
              max={pro ? average.length : 2}
              data={average}
            />
          </StatisticsWrapper>
          <PieWrapper
            initial={animatePro}
            animate={animatePro}
            variants={pieVariants}
            transition={{ duration: 0.3 }}
          >
            <DonutChart />
          </PieWrapper>
        </Bottom>
      </DetailedWrapper>
    </>
  )
}

export default Statistics
