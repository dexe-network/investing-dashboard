// import React, { useState, useRef } from "react"
import { rotateVariants } from "theme"
import { EXCHANGE_DEFAULT_PERCENTS } from "constants/index"
import { SwapDirection } from "constants/types"

import icon from "assets/icons/swap-arrow.svg"

import { DividerContainer, PercentButton, SwapButton, Icon } from "./styled"
import { Fragment } from "react"

interface IDividerProps {
  changeAmount: (v: string) => void
  changeDirection: () => void
  direction: SwapDirection
  points?: { id: string; label: string; percent: string }[]
}

const ExchangeDivider: React.FC<IDividerProps> = ({
  changeAmount,
  changeDirection,
  direction,
  points,
}) => {
  const buttonsList = points || EXCHANGE_DEFAULT_PERCENTS

  return (
    <DividerContainer full>
      {buttonsList.map((point, index) => (
        <Fragment key={point.id}>
          <PercentButton
            active={false}
            onClick={() => changeAmount(point.percent)}
          >
            {point.label}
          </PercentButton>
          {index + 1 === buttonsList.length / 2 && (
            <SwapButton onClick={() => changeDirection()}>
              <Icon
                variants={rotateVariants}
                animate={direction === "deposit" ? "hidden" : "visible"}
                src={icon}
                alt="change direction"
              />
            </SwapButton>
          )}
        </Fragment>
      ))}
    </DividerContainer>
  )
}

export default ExchangeDivider
