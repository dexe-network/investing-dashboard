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
  width: 140px;
  height: 60px;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  border-radius: 8px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.35);
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
`

const StyledTooltipSm = styled(StyledTooltip)`
  width: 145px;
  height: 50px;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
`
const TooltipText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  color: #c5d1dc;
`

export const TooltipDate = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;

  /* Text / gray */

  color: #5a6071;

  opacity: 0.6;
`

export const TooltipValue = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  color: #9ae2cb;
`

const LargeTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <StyledTooltip>
        <TooltipDate>MON,{payload[0].payload.y}.01.2022</TooltipDate>
        <Flex full>
          <TooltipText>My funds</TooltipText>
          <TooltipValue>{payload[0].payload.y.toFixed(2)}%</TooltipValue>
        </Flex>
        <Flex full>
          <TooltipText>Investor</TooltipText>
          <TooltipValue>{(payload[0].payload.y + 15).toFixed(2)}%</TooltipValue>
        </Flex>
      </StyledTooltip>
    )
  }

  return null
}

const SmallTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <StyledTooltipSm>
        <TooltipDate>MON,03.01.2022</TooltipDate>
        <Flex full>
          <TooltipText>P&L - LP</TooltipText>
          <TooltipValue>{payload[0].payload.y.toFixed(2)}%</TooltipValue>
        </Flex>
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
