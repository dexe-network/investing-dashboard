import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts"
import { PulseSpinner } from "react-spinners-kit"
import { usePriceHistory } from "state/pools/hooks"
import { formateChartData } from "utils/formulas"
import { Center } from "theme"

import { Container, Body, ChartPeriods, Period, NoData } from "./styled"

interface Props {
  address: string | undefined
}

const Chart = ({ data }) => {
  // show loading animation
  if (!data)
    return (
      <Center>
        <PulseSpinner size={40} loading />
      </Center>
    )

  // show empty chart
  if (!data.length)
    return (
      <Center>
        <NoData>No data found.</NoData>
      </Center>
    )

  return (
    <ResponsiveContainer>
      <AreaChart stackOffset="silhouette" data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="65%" stopColor="#9AE2CB33" stopOpacity={0.3} />
            <stop offset="70%" stopColor="#9AE2CB33" stopOpacity={0.25} />
            <stop offset="80%" stopColor="#9AE2CB33" stopOpacity={0.2} />
            <stop offset="85%" stopColor="#9AE2CB26" stopOpacity={0.15} />
            <stop offset="90%" stopColor="#9AE2CB20" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#9AE2CB15" stopOpacity={0.04} />
            <stop offset="100%" stopColor="#9AE2CB05" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          isAnimationActive
          baseLine={2}
          type="linear"
          dataKey="price"
          stroke="#9AE2CB"
          strokeWidth={2}
          fill="url(#colorUv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const ProfitLossChart: React.FC<Props> = ({ address }) => {
  const history = usePriceHistory(address)
  const historyFormated = formateChartData(history)

  return (
    <Container>
      <ChartPeriods>
        <Period active>D</Period>
        <Period>W</Period>
        <Period>M</Period>
        <Period>3M</Period>
        <Period>6M</Period>
        <Period>1Y</Period>
        <Period>ALL</Period>
      </ChartPeriods>

      <Body>
        <Chart data={historyFormated} />
      </Body>
    </Container>
  )
}

export default ProfitLossChart
