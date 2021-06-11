// import { motion } from "framer-motion"
// import moment from "moment"
import { IPool } from "constants/interfaces"
import { useState, useEffect } from "react"
import ReactTooltip from "react-tooltip"

import { StyledBarChart, TickContainer, TickUp, TickDown } from "./styled"

const BarChart: React.FC<{ pnlList: IPool["pnl"]["monthly"] }> = (props) => {
  const [data, setData] = useState<IPool["pnl"]["monthly"]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(props.pnlList)
    }, 500)
  }, [props.pnlList])

  return (
    <StyledBarChart>
      {data.map((v, i) => (
        <TickContainer
          key={i}
          // data-for={`barcharttooltip${i}`}
          // data-tip={`${v}%`}
          // data-text-color={v >= 0 ? "#7FFFD4" : "#ff7f7f"}
          // data-arrow-color={v >= 0 ? "#7FFFD4" : "#ff7f7f"}
        >
          {/* <ReactTooltip id={`barcharttooltip${i}`} backgroundColor="#353749" /> */}
          <TickUp pnl={v} />
          <TickDown pnl={v} />
        </TickContainer>
      ))}
    </StyledBarChart>
  )
}

export default BarChart
