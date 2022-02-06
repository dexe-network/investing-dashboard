import { IPool } from "constants/interfaces"
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { useUserProMode } from "state/user/hooks"
import { chartColors, Flex, device } from "theme"
import styled from "styled-components"

const StyledTooltip = styled(Flex)`
  width: 288px;
  height: 113px;
  background: rgb(41, 49, 52);
  background: linear-gradient(
    135deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(32, 79, 124, 1) 65%
  );
  border-radius: 10px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.35);
  padding: 12px 10px;
`

const StyledTooltipSm = styled(StyledTooltip)`
  width: 100px;
  height: 30px;
`
const TooltipText = styled.div`
  color: #f5f5f5;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
`

const LargeTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <StyledTooltip dir="column" jc="space-around" ai="center">
        <Flex full jc="space-between">
          <TooltipText>P&L LP-$ETH</TooltipText>
          <TooltipText>{payload[0].payload.lpBasic} ETH</TooltipText>
        </Flex>
        <Flex full jc="space-between">
          <TooltipText>P&L LP-$ETH percent</TooltipText>
          <TooltipText>{payload[0].payload.lpBasicPercent}%</TooltipText>
        </Flex>
        <Flex full jc="space-between">
          <TooltipText>P&L LP-USD</TooltipText>
          <TooltipText>{payload[0].payload.lpUsd} USD</TooltipText>
        </Flex>
        <Flex full jc="space-between">
          <TooltipText>P&L LP-USD percent</TooltipText>
          <TooltipText>{payload[0].payload.lpUsdPercent}%</TooltipText>
        </Flex>
      </StyledTooltip>
    )
  }

  return null
}

const SmallTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <StyledTooltipSm dir="column" jc="space-around" ai="center">
        <TooltipText>{payload[0].payload.y.toFixed(2)}%</TooltipText>
      </StyledTooltipSm>
    )
  }

  return null
}

const Title = styled(Flex)`
  @media only screen and (${device.sm}) {
    padding: 0 0 20px;
  }
`

const Monthes = styled(Flex)`
  @media only screen and (${device.sm}) {
    border-top: 1px solid #47bef9;
    padding-top: 10px;
    align-self: flex-end;
  }
`

const Bar = styled(Flex)`
  @media only screen and (${device.sm}) {
    flex-direction: column;
    padding: 0;
    align-items: flex-start;
  }
`

const Ticker = styled.div`
  color: #dddddd;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 700;
  margin-right: 10px;

  @media only screen and (${device.sm}) {
    font-size: 14px;
    margin-right: 5px;
  }
`

const Price = styled.div`
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
  color: #999999;

  @media only screen and (${device.sm}) {
    font-size: 14px;
  }
`

const Month = styled.div<{ active?: boolean }>`
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
  color: ${(props) => (props.active ? "#999999" : "#4A4F53")};
  margin: 0 8px;
  user-select: none;
  cursor: pointer;

  @media only screen and (${device.sm}) {
    font-size: 14px;
  }

  @media only screen and (${device.xs}) {
    font-size: 10px;
    font-family: Gilroy;
    font-weight: 700;
  }
`

const Chart: React.FC<{
  data: IPool["pnl"]["detailed"]
  height?: number
  width?: number | string
  title?: boolean
  period?: boolean
  tooltipSize?: "sm" | "lg"
  multiple?: boolean
}> = (props) => {
  const [isPro] = useUserProMode()

  return (
    <>
      {(props.title || props.period) && (
        <Bar full p="17px 30px 4px 0px">
          {props.title && (
            <Title p="0 0 0 30px">
              <Ticker>Chart IDSX</Ticker>
              <Price>1 IDSX = 3.22 ETH ($1437.22)</Price>
            </Title>
          )}
          {props.period && (
            <Monthes>
              <Month>1D</Month>
              <Month>1W</Month>
              <Month>1M</Month>
              <Month>3M</Month>
              <Month>1Y</Month>
              <Month>2Y</Month>
              <Month active>ALL</Month>
            </Monthes>
          )}
        </Bar>
      )}
      <div
        style={{
          width: "calc(100% + 10px)",
          overflow: "hidden",
          height: props.height || 50,
        }}
      >
        <ResponsiveContainer>
          <AreaChart data={props.data}>
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
            <Tooltip
              content={({ active, payload }) => {
                if (props.tooltipSize === "lg") {
                  return <LargeTooltip active={active} payload={payload} />
                }

                if (props.tooltipSize === "sm") {
                  return <SmallTooltip active={active} payload={payload} />
                }

                return null
              }}
            />
            <Area
              type="monotoneX"
              dataKey="y"
              stroke="#9AE2CB"
              strokeWidth={2}
              fill="url(#colorUv)"
              fillOpacity={1}
            />
            {props.multiple && (
              <Area
                type="monotoneX"
                dataKey="lpBasicPercent"
                stroke="#9AE2CB"
                strokeWidth={2}
                fill="url(#colorUv)"
                fillOpacity={1}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Chart
