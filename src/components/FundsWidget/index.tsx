// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { HalfBlock, Label, Value, Pnl } from "./styled"
import { Flex, Text, Block } from "theme"
import { formatNumber } from "utils"

const FundsWidget: React.FC = () => {
  return (
    <Block>
      <HalfBlock>
        <Label>Personal funds locked</Label>
        <Value>${formatNumber("32880", 2)}</Value>
        <Pnl side="BUY">{formatNumber("12.342", 2)}%</Pnl>
      </HalfBlock>
      <HalfBlock>
        <Label>Investor’s funds locked</Label>
        <Value>
          {"$"}
          {formatNumber("240123", 2)}
        </Value>
        <Pnl side="SELL">{formatNumber("-2.28", 2)}%</Pnl>
      </HalfBlock>
    </Block>
  )
}

export default FundsWidget
