// import React, { useState, useRef } from "react"
import { motion } from "framer-motion"

import { Flex, rotateVariants } from "theme"
import styled from "styled-components"

import icon from "assets/icons/swap-arrow.svg"

const Container = styled(Flex)`
  margin-top: 3px;
  margin-bottom: 3px;
  user-select: none;
  height: 24px;
  position: relative;
`

const PercentButton = styled.div<{ active?: boolean }>`
  flex: 1;
  max-width: 70px;
  text-align: center;
  cursor: pointer;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;

  color: ${(props) => (props.active ? "#E4F2FF" : "#666f87")};

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
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled(motion.img)``

interface IDividerProps {
  changeAmount: (v: string) => void
  changeDirection: () => void
  direction: "deposit" | "withdraw"
  points: { label: string; percent: string; from: number; to: number }[]
  fromAmount: number
  toAmount: number
}

const ExchangeDivider: React.FC<IDividerProps> = ({
  changeAmount,
  changeDirection,
  direction,
  points,
  fromAmount,
  toAmount,
}) => {
  return (
    <Container full>
      {points.map((point, index) => (
        <>
          <PercentButton
            key={point.percent}
            active={
              (direction === "deposit" &&
                fromAmount === point.from &&
                fromAmount !== 0) ||
              (direction === "withdraw" &&
                toAmount === point.to &&
                toAmount !== 0)
            }
            onClick={() => changeAmount(point.percent)}
          >
            {point.label}
          </PercentButton>
          {index + 1 === points.length / 2 && (
            <SwapButton onClick={changeDirection}>
              <Icon
                variants={rotateVariants}
                animate={direction === "deposit" ? "hidden" : "visible"}
                src={icon}
                alt=""
              />
            </SwapButton>
          )}
        </>
      ))}
    </Container>
  )
}

export default ExchangeDivider
