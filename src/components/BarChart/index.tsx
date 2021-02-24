// import { motion } from "framer-motion"
// import moment from "moment"
import { useState, useEffect } from "react"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"
import { fakeData, fakeZeroData } from "./BarChart.stories"

const pnlToBarHeight = (pnl) => {
  const val = pnl < 0 ? pnl * -1 : pnl
  const pnlInHeight = val * 0.32

  const height = pnlInHeight > 32 ? 32 : pnlInHeight
  return `${height}px`
}

const StyledBarChart = styled.div`
  width: 175px;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`

const TickContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  height: 64px;
  width: 10px;
`

const Tick = styled.div<{ pnl: number }>`
  position: absolute;
  left: 0;
  right: 0;
  background: #464857;
  width: 10px;
  margin: 0 2.5px;
  transition: all 0.4s cubic-bezier(0.63, 0.08, 0.49, 0.84);
`

const TickUp = styled(Tick)`
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  bottom: 32px;

  border-top: 2px solid ${(props) => (props.pnl > 0 ? "#7fffd4" : "#464857")};
  height: ${(props) =>
    props.pnl && props.pnl > 0 ? pnlToBarHeight(props.pnl) : "2px"};

  &:hover {
    background: #7fffd4;
  }
`

const TickDown = styled(Tick)`
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  top: 32px;

  border-bottom: 2px solid ${(props) => (props.pnl < 0 ? "#ff7f7f" : "#464857")};
  height: ${(props) =>
    props.pnl && props.pnl < 0 ? pnlToBarHeight(props.pnl) : "2px"};

  &:hover {
    background: ${(props) => (props.pnl <= 0 ? "#ff7f7f" : "transparent")};
  }
`

const BarChart: React.FC = () => {
  const [data, setData] = useState(fakeZeroData)

  useEffect(() => {
    setTimeout(() => {
      setData(fakeData)
    }, 500)
  }, [])

  return (
    <StyledBarChart>
      <ReactTooltip
        id="bar-tooltip"
        className="bar-tooltip"
        delayHide={50}
        backgroundColor="#353749"
        place="right"
        border={false}
      />
      {data.map((v) => (
        <TickContainer
          key={v.from}
          data-for="bar-tooltip"
          data-tip={`${v.pnl}%`}
          data-text-color={v.pnl >= 0 ? "#7FFFD4" : "#ff7f7f"}
          data-arrow-color={v.pnl >= 0 ? "#7FFFD4" : "#ff7f7f"}
        >
          <TickUp pnl={v.pnl} />
          <TickDown pnl={v.pnl} />
        </TickContainer>
      ))}
    </StyledBarChart>
  )
}

export default BarChart
