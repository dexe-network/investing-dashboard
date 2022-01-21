// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"

import styled from "styled-components"
import { Orientation } from "constants/types"

interface Props {
  type: Orientation
  active: string
}

const StyledFunds = styled.div<{ type: Orientation }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) => props.type};
  width: fit-content;
  border: ${(props) => (props.type === Orientation.horizontal ? "1px" : "0px")}
    solid #565656;
  border-radius: 14px;
  padding: 3px;
`

const Icon = styled.img<{ type: Orientation }>`
  height: ${(props) =>
    props.type === Orientation.horizontal ? "20px" : "15px"};
  width: ${(props) =>
    props.type === Orientation.horizontal ? "20px" : "15px"};
  margin: 0
    ${(props) => (props.type === Orientation.horizontal ? "3.5px" : "0")};
  cursor: pointer;

  &:first-child {
    margin-top: 0;
    margin-left: 0;
    opacity: 1;
  }

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }

  &:nth-child(2) {
    opacity: 0.5;
    margin: ${(props) => (props.type === Orientation.horizontal ? "0" : "7px")}
      0;
  }
  &:nth-child(3) {
    opacity: 0.5;
  }
`

const Major = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Ticker = styled.span`
  font-size: 14px;
  color: #f5f5f5;
  font-family: Gilroy;
font-weight: 500;
  margin: 0 3.5px;
`

const Funds: React.FC<Props> = (props) => {
  return (
    <StyledFunds type={props.type}>
      <Major>
        <Icon
          type={props.type}
          src={`https://tokens.1inch.exchange/${props.active.toLowerCase()}.png`}
        />
        {props.type === Orientation.horizontal && <Ticker>ETH</Ticker>}
      </Major>
      {/* <Icon type={props.type} src="https://ethplorer.io/images/mcd-dai.png" />
      <Icon
        type={props.type}
        src="https://tokens.1inch.exchange/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
      /> */}
    </StyledFunds>
  )
}

export default Funds
