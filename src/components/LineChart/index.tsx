import styled from "styled-components"
import { Flex } from "theme"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

const Container = styled(Flex)`
  padding: 15px 15px 0;
  width: 300px;
  height: 81px;
  justify-content: center;
`

const Tick = styled.div`
  position: relative;
  flex: none;
  width: 1px;
  height: 50px;
  background: linear-gradient(
    180deg,
    rgba(127, 255, 212, 1) 30%,
    rgba(40, 68, 131, 0) 100%
  );

  &:before {
    content: "";
    position: absolute;
    top: -3px;
    left: -5px;
    right: 0px;
    margin: auto;
    height: 10px;
    width: 10px;
    background: #7fffd4;
    border-radius: 50%;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  }

  &:after {
    content: "Buy";
    color: #7fffd4;
    font-size: 12px;
    font-family: "Gilroy-Medium";
font-weight: 500;
    opacity: 0.3;
    position: absolute;
    bottom: -15px;
    left: -9px;
    right: 0;
    margin: auto;
  }
`

const LineChart = ({ dataNew, dataPrev }) => {
  return (
    <Container>
      <AreaChart
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        width={190}
        height={81}
        data={dataPrev}
      >
        <defs>
          <linearGradient id="fillBefore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00C0FF" stopOpacity={0.8} />
            <stop offset="87%" stopColor="#00C0FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          baseValue={100}
          isAnimationActive={false}
          type="stepBefore"
          dataKey="y"
          stroke="#00C0FF"
          fill="url(#fillBefore)"
          fillOpacity={0.1}
        />
      </AreaChart>

      <Tick />

      <AreaChart
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        width={110}
        height={81}
        data={dataNew}
      >
        <defs>
          <linearGradient id="fillAfter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#34FFCF" stopOpacity={1} />
            <stop offset="87%" stopColor="#34FFCF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          isAnimationActive={false}
          type="stepBefore"
          dataKey="y"
          stroke="#34FFCF"
          fill="url(#fillAfter)"
          fillOpacity={0.1}
        />
      </AreaChart>
    </Container>
  )
}

export default LineChart
