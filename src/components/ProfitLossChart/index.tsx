import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts"

import { Container, ChartPeriods, Period } from "./styled"

interface Props {
  data: any[]
}

const ProfitLossChart: React.FC<Props> = ({ data }) => {
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
      <ResponsiveContainer>
        <AreaChart data={data}>
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
            type="monotoneX"
            dataKey="y"
            stroke="#9AE2CB"
            strokeWidth={2}
            fill="url(#colorUv)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default ProfitLossChart
