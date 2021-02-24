// import React, { useState, useRef } from "react"

// import { motion } from "framer-motion"
import styled from "styled-components"
import { Flex } from "theme/index"

// TEMP TEST FUNCTION
const getRandomPnl = () => {
  const r1 = Math.random()
  const r2 = Math.random()
  const negative = r2 > 0.9 ? -1 : 1

  return r1 * 100 * negative
}

const monthes = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const StyledCalendar = styled(Flex)``

const Cell = styled.div<{ align?: "left" | "right" }>`
  text-align: ${(props) => (props.align ? props.align : "center")};
  flex: 1;
`

const Label = styled.div`
  color: #999999;
  font-size: 12px;
  margin-bottom: 7px;
  text-align: inherit;
`

const Month = styled.div<{ c?: string; fw?: number; current?: boolean }>`
  font-size: 16px;
  font-weight: ${(props) =>
    props.current ? "bold" : props.fw ? props.fw : "500"};
  margin: 5px 0;
  border-right: 1px dashed #51525c;
  color: ${(props) =>
    props.current ? "#7FFFD4" : props.c ? props.c : "#7F7F86"};
`

const StatisticsCalendar: React.FC = () => {
  return (
    <StyledCalendar full>
      <Cell align="left">
        <Label>Year</Label>
        <Month fw={800}>2021</Month>
        <Month c="#666666" fw={800}>
          2020
        </Month>
      </Cell>

      {monthes.map((m) => {
        const now = getRandomPnl()
        const prev = getRandomPnl()

        const col1 = now === 0 ? "#7F7F86" : now > 0 ? "#3B9C88" : "#9D4C5E"
        const col2 = prev === 0 ? "#7F7F86" : prev > 0 ? "#3A8276" : "#824657"

        return (
          <Cell key={m}>
            <Label>{m}</Label>
            <Month current={m === "Feb"} c={col1}>
              {now.toFixed(2)}
            </Month>
            <Month c={col2}>{prev.toFixed(2)}</Month>
          </Cell>
        )
      })}

      <Cell>
        <Label>Total</Label>
        <Month fw={800} c="#7FFFD4">
          102%
        </Month>
        <Month fw={800}>12.2%</Month>
      </Cell>
    </StyledCalendar>
  )
}

export default StatisticsCalendar
