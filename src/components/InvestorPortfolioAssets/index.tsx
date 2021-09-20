// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import styled from "styled-components"
import { Flex } from "theme"

import {
  Container,
  NumberOfAssets,
  Label,
  ProfitableAssets,
  LoosableAssets,
  Item,
  Ticker,
  Price,
} from "./styled"

const InvestorPortfolioAssets: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      {/* <ProfitableAssets>
        <Item>
          <Ticker>DEXE</Ticker>
          <Price type="positive">33.19</Price>
        </Item>
        <Item>
          <Ticker>XTNKTD</Ticker>
          <Price type="positive">22.27</Price>
        </Item>
      </ProfitableAssets> */}

      <NumberOfAssets>0</NumberOfAssets>
      <Label>Asssets in the portfolio</Label>

      {/* <LoosableAssets>
        <Item>
          <Ticker>ISDT</Ticker>
          <Price type="negative">130.32</Price>
        </Item>
        <Item>
          <Ticker>IRDX</Ticker>
          <Price type="negative">0.92</Price>
        </Item>
      </LoosableAssets> */}
    </Container>
  )
}

export default InvestorPortfolioAssets
