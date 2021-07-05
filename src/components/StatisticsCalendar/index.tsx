// import React, { useState, useRef } from "react"

// import { motion } from "framer-motion"
import { IPool } from "constants/interfaces"
import styled from "styled-components"
import { Flex, device } from "theme"
import { getRandomPnl } from "utils"

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

const Cell = styled.div<{ align?: "left" | "right" }>`
  text-align: ${(props) => (props.align ? props.align : "center")};
  flex: 1;

  @media only screen and (${device.sm}) {
    &:first-child {
      display: none;
    }
    &:last-child {
      display: none;
    }
  }
`

const Label = styled.div`
  color: #999999;
  font-size: 12px;
  margin-bottom: 7px;
  text-align: inherit;
`

const Month = styled.div<{ c?: string; fw?: number; current?: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.fw ? props.fw : "500")};
  margin: 5px 0;
  color: ${(props) => (props.c ? props.c : "#7F7F86")};

  @media only screen and (${device.sm}) {
    font-size: 12px;
    margin: 2px 0;
  }
`

const StatisticsCalendar: React.FC<{
  data: IPool["pnl"]["monthly"]
  currentYear?: boolean
}> = ({ data, currentYear }) => {
  const currentMonth = new Date().getMonth()

  return (
    <Flex full op={currentYear ? 1 : 0.6}>
      <Cell align="left">
        <Label>Year</Label>
        <Month color="#999999" fw={800}>
          2021
        </Month>
      </Cell>

      {data.map((m, index) => {
        const isCurrent = currentMonth === index && currentYear
        const colorDefault = m === 0 ? "#7F7F86" : m > 0 ? "#3B9C88" : "#9D4C5E"
        const colorActive = m === 0 ? "#bababd" : m > 0 ? "#3ed8ba" : "#b6314e"
        const color = isCurrent ? colorActive : colorDefault

        return (
          <Cell key={index}>
            <Label>{monthes[index]}</Label>
            <Month fw={isCurrent ? 800 : 500} c={color}>
              {m}
            </Month>
          </Cell>
        )
      })}

      <Cell>
        <Label>Total</Label>
        <Month fw={800} c="#7FFFD4">
          102%
        </Month>
      </Cell>
    </Flex>
  )
}

export default StatisticsCalendar
