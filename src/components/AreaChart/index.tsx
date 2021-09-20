import { IPool } from "constants/interfaces"
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts"
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
  font-weight: bold;
  margin-right: 10px;

  @media only screen and (${device.sm}) {
    font-size: 14px;
    margin-right: 5px;
  }
`

const Price = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #999999;

  @media only screen and (${device.sm}) {
    font-size: 14px;
  }
`

const Month = styled.div<{ active?: boolean }>`
  font-size: 16px;
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
    font-weight: 800;
  }
`

const Chart: React.FC<{
  data: IPool["pnl"]["detailed"]
  height?: number
  width?: number | string
  title?: boolean
  period?: boolean
  tooltipSize?: "sm" | "lg"
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
      <div style={{ width: "100%", height: props.height || 50 }}>
        <ResponsiveContainer>
          <AreaChart data={props.data}>
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
              stroke={chartColors[isPro ? "pro" : "default"].stroke}
              fill="#1F5281"
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Chart
