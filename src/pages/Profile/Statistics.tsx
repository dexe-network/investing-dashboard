import { Flex, ease } from "theme"
import Chart from "components/Chart"
import Funds from "components/Funds"
import { Orientation } from "constants/types"

import StatisticsCalendar from "components/StatisticsCalendar"
import DonutChart from "components/DonutChart"

import { useUserProMode } from "state/user/hooks"

import rank from "assets/icons/rank.svg"
import copiers from "assets/icons/copiers.svg"
import fee from "assets/icons/trader-fee.svg"
import pie from "assets/icons/pie.svg"
import filled from "assets/icons/filled.svg"

import {
  Overlay,
  Button,
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
} from "pages/Profile/styled"

const average = [
  {
    label: "Trades per Day:",
    value: "2.1",
  },
  {
    label: "Order size:",
    value: "6.2%",
  },
  {
    label: "Daily Profit:",
    value: "0.13%",
  },
  {
    label: "Trade position:",
    value: "28.1H",
  },
  {
    label: "Sortino (ETH):",
    value: "7.2",
  },
  {
    label: "Sortino (BTC):",
    value: "13.8",
  },
  {
    label: "Trades:",
    value: "346",
  },
  {
    label: "Maximum Loss:",
    value: "-13.21%",
  },
]

const funds = [
  {
    label: "Personal funds:",
    value: "39 ETH(13%)",
  },
  {
    label: "Invested:",
    value: "2141 ETH",
  },
]

const totalPNL = [
  {
    label: "ETH(%):",
    value: "238%",
  },
  {
    label: "USD(%):",
    value: "341.2%",
  },
  {
    label: "Circulating Supply:",
    value: "220 ISDX",
  },
  {
    label: "Total Supply:",
    value: "1000 ISDX",
  },
]

const uncategorizedStatistics = [
  {
    label: "Major asset:",
    value: "ETH",
  },
  {
    label: "Profit Factor:",
    value: "3.37",
  },
]

const Statistics = () => {
  const [pro] = useUserProMode()
  const animatePro = pro ? "visible" : "hidden"

  return (
    <>
      <Wrapper full>
        <AvatarPlaceholder />

        <Card>
          <Funds type={Orientation.horizontal} />

          <Card>
            <StatisticsIcon src={rank} />
            <Text>7.4</Text>
          </Card>

          <Card>
            <StatisticsIcon src={copiers} />
            <Text>231</Text>
          </Card>

          <Card>
            <StatisticsIcon src={fee} />
            <Text>35%</Text>
          </Card>

          <Card>
            <StatisticsIcon src={pie} />
            <Text>On</Text>
          </Card>

          <Card>
            <StatisticsIcon src={filled} />
            <Text>96%</Text>
          </Card>
        </Card>

        <Button>Create a fund</Button>
      </Wrapper>

      <ChartWrapper>
        <Overlay
          initial={animatePro}
          transition={ease}
          animate={animatePro}
          variants={overlayVariants}
        />
        <Chart title period width={940} height={190} />
      </ChartWrapper>

      <Flex
        initial={animatePro}
        variants={calendarVariants}
        animate={animatePro}
        dir="column"
        full
      >
        <Title full weight={800}>
          Monthly statistics
        </Title>
        <Wrapper full>
          <StatisticsCalendar />
        </Wrapper>
      </Flex>

      <Flex
        initial={animatePro}
        animate={animatePro}
        variants={detailedVariants}
        dir="column"
        full
      >
        <Title full weight={800}>
          Detailed statistics <ProButton />
        </Title>
        <Wrapper ai="flex-start" full>
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
          >
            <DonutChart />
          </PieWrapper>
        </Wrapper>
      </Flex>
    </>
  )
}

export default Statistics
