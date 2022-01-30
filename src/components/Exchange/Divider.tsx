// import React, { useState, useRef } from "react"
import { motion } from "framer-motion"

import { Flex, rotateVariants } from "theme"
import styled from "styled-components"

import icon from "assets/icons/swap-arrow.svg"

const Container = styled(Flex)`
  margin-top: 5px;
  margin-bottom: 5px;
  user-select: none;
  background: rgba(26, 30, 35, 0.5);
  height: 16px;
  position: relative;
`

const PercentButton = styled.div<{ active?: boolean }>`
  height: 16px;
  flex: 1;
  padding-top: 2px;
  // font-family: Gilroy;
  // font-style: normal;
  // font-family: Gilroy;
  // font-weight: 400;
  // font-size: 10px;
  // line-height: 130%;
  // color: #c2c3c4;
  text-align: center;
  cursor: pointer;

  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;

  /* Text / gray */

  color: ${(props) => (props.active ? "#BAC9D6" : "#5a6071")};

  background: ${(props) => (props.active ? "#5a607112" : "transparent")};
  border-radius: 3px;

  &:first-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  &:last-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

const SwapButton = styled.div`
  cursor: pointer;
  border-radius: 50px;
  background: linear-gradient(64.44deg, #292b31 32.35%, #22262e 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled(motion.img)``

interface IDividerProps {
  changeAmount: (v: string) => void
  changeDirection: () => void
  direction: "deposit" | "withdraw"
}

const ExchangeDivider: React.FC<IDividerProps> = ({
  changeAmount,
  changeDirection,
  direction,
}) => {
  return (
    <Container full>
      <PercentButton active onClick={() => changeAmount("0x016345785d8a0000")}>
        10%
      </PercentButton>
      <PercentButton onClick={() => changeAmount("0x03782dace9d90000")}>
        25%
      </PercentButton>
      <SwapButton onClick={changeDirection}>
        <Icon
          variants={rotateVariants}
          animate={direction === "deposit" ? "hidden" : "visible"}
          src={icon}
          alt=""
        />
      </SwapButton>
      <PercentButton onClick={() => changeAmount("0x06f05b59d3b20000")}>
        50%
      </PercentButton>
      <PercentButton onClick={() => changeAmount("0x0a688906bd8b0000")}>
        75%
      </PercentButton>
    </Container>
  )
}

export default ExchangeDivider
