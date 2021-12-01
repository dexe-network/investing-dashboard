// import { useWeb3React } from "@web3-react/core"
import { ease, To } from "theme"
import Funds from "components/Funds"
import { Orientation } from "constants/types"

import AreaChart from "components/AreaChart"
import StatisticsCalendar from "components/StatisticsCalendar"
import Button from "components/Button"
import DonutChart from "components/DonutChart"

import { useUserProMode } from "state/user/hooks"

import { Pool } from "constants/interfaces_v2"

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
  data: Pool[]
}

const Statistics = ({ data }: Props) => {
  const [pro] = useUserProMode()
  const animatePro = pro ? "visible" : "hidden"
  console.log(data)

  const average = [
    {
      label: "Trades per Day:",
      value: `23`,
    },
    {
      label: "Order size:",
      value: `14.23%`,
    },
    {
      label: "Daily Profit:",
      value: `3.23%`,
    },
    {
      label: "Trade position:",
      value: `56H`,
    },
    {
      label: "Sortino (ETH):",
      value: `1232`,
    },
    {
      label: "Sortino (BTC):",
      value: `5321`,
    },
    {
      label: "Trades:",
      value: `532`,
    },
    {
      label: "Maximum Loss:",
      value: `-6.22%`,
    },
  ]

  const funds = [
    {
      label: "Personal funds:",
      value: `2.12 ETH(12.2%)`,
    },
    {
      label: "Invested:",
      value: `2.00 ETH`,
    },
  ]

  const totalPNL = [
    {
      label: "ETH(%):",
      value: `3.21%`,
    },
    {
      label: "USD(%):",
      value: `2.34%`,
    },
    {
      label: "Circulating Supply:",
      value: `123 USDT`,
    },
    {
      label: "Total Supply:",
      value: `123213 USDT`,
    },
  ]

  const uncategorizedStatistics = [
    {
      label: "Major asset:",
      value: "ETH",
    },
    {
      label: "Profit Factor:",
      value: `28`,
    },
  ]

  return (
    <>
      <TraderStatistics full p="0px 35px 0 0">
        <AvatarPlaceholder />

        <IconsWrapper>
          <Funds active={"0x...."} type={Orientation.horizontal} />

          <Card>
            <StatisticsIcon src={rank} />
            <Text>12</Text>
          </Card>

          <Card>
            <StatisticsIcon src={copiers} />
            <Text>54</Text>
          </Card>

          <Card>
            <StatisticsIcon src={fee} />
            <Text>33%</Text>
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

        <To to={`/pool/0x.../invest`}>
          <Button>Buy ISDX</Button>
        </To>
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
          data={[]}
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
          <StatisticsCalendar
            currentYear
            data={[12, 14, 17, 18, 19, 29, 12, 14, 17, 18, 19, 29]}
          />
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
