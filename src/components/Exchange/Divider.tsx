// import React, { useState, useRef } from "react"
import { motion } from "framer-motion"

import { Flex, rotateVariants } from "theme"
import styled from "styled-components"

import icon from "assets/icons/swap-arrow.svg"

const Container = styled(Flex)`
  margin-top: -9px;
  margin-bottom: -5px;
`

const PercentButton = styled.div`
  height: 15px;
  flex: 1;
  background: linear-gradient(
    0deg,
    rgba(51, 62, 64, 0.2) 0%,
    rgba(128, 128, 128, 0.2) 100%
  );
  font-size: 13px;
  color: #4e4e4e;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
  }
`

const SwapButton = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background: #3f424a;
  border: 3px solid #2e2c46;
  width: 40px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled(motion.img)``

const ExchangeDivider: React.FC<{
  changeAmount: (v: number) => void
  changeDirection: () => void
  direction: "down" | "up"
}> = ({ changeAmount, changeDirection, direction }) => {
  return (
    <Container full>
      <PercentButton onClick={() => changeAmount(10)}>10</PercentButton>
      <PercentButton onClick={() => changeAmount(25)}>25</PercentButton>
      <SwapButton onClick={changeDirection}>
        <Icon
          variants={rotateVariants}
          animate={direction === "down" ? "hidden" : "visible"}
          src={icon}
          alt=""
        />
      </SwapButton>
      <PercentButton onClick={() => changeAmount(50)}>50</PercentButton>
      <PercentButton onClick={() => changeAmount(75)}>75</PercentButton>
    </Container>
  )
}

export default ExchangeDivider
