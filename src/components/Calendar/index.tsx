import { useState, useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  DateRangePicker,
  defaultStaticRanges,
  createStaticRanges,
} from "react-date-range"
import { addDays } from "date-fns"
import { useClickAway } from "react-use"

import "./calendar.css"

import {
  Label,
  Value,
  StyledDropdown,
  floatingBodyVariants,
} from "components/Dropdown"

const Body = styled(motion.div)`
  position: absolute;
  top: 50px;
  left: -130px;
  right: 0;
  height: fit-content;
  width: fit-content;
  z-index: 20;
  border-radius: 7px;
  overflow: hidden;
  background: linear-gradient(
    42deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.35);
`

const Calendar: React.FC = () => {
  const focusedRange = [addDays(new Date(), -7), new Date()]
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState([
    {
      startDate: focusedRange[0],
      endDate: focusedRange[1],
      key: "members",
    },
  ])

  const toggle = () => setOpen(!open)

  useClickAway(ref, () => {
    setOpen(false)
  })

  const staticRanges = createStaticRanges([...defaultStaticRanges])

  return (
    <StyledDropdown ref={ref}>
      <Label onClick={toggle}>Time period: </Label>
      <Value onClick={toggle}>30/12/2021</Value>
      <Body
        initial="hidden"
        variants={floatingBodyVariants}
        animate={open ? "visible" : "hidden"}
      >
        <DateRangePicker
          onChange={(item) => setState([item.members])}
          showSelectionPreview
          moveRangeOnFirstSelection
          ranges={state}
          staticRanges={staticRanges}
          direction="horizontal"
          inputRanges={[]}
          rangeColors={["#3E90FF"]}
        />
      </Body>
    </StyledDropdown>
  )
}

export default Calendar
