import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from "recharts"
import { PulseSpinner } from "react-spinners-kit"
import { ethers } from "ethers"

import { usePriceHistory } from "state/pools/hooks"
import { formateChartData } from "utils/formulas"
import { formatBigNumber } from "utils"

import { Center } from "theme"
import S from "./styled"

interface Props {
  address: string | undefined
}

const tickFormatter = (value: any) => {
  if (ethers.BigNumber.isBigNumber(value)) {
    return formatBigNumber(value, 18, 6)
  }
  return value
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
        <S.NoData>No data found.</S.NoData>
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
          legendType="triangle"
          isAnimationActive
          baseLine={2}
          type="linear"
          dataKey="price"
          stroke="#9AE2CB"
          strokeWidth={2}
          fill="url(#colorUv)"
          fillOpacity={1}
        />
        <YAxis
          tickFormatter={tickFormatter}
          dataKey="price"
          width={21}
          tickLine={false}
          axisLine={false}
          orientation="left"
          tick={{ fill: "#788ab4", fontSize: "10px", fontWeight: 500 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const FeeChart: React.FC<Props> = ({ address }) => {
  const history = usePriceHistory(address)
  const historyFormated = formateChartData(history)

  return (
    <S.Container>
      <S.Body>
        <Chart data={historyFormated} />
      </S.Body>
    </S.Container>
  )
}

export default FeeChart
