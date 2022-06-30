// import React, { useState, useRef } from "react"
import { Fragment } from "react"
import { BigNumber } from "ethers"
import { EXCHANGE_DEFAULT_PERCENTS } from "constants/index"

import icon from "assets/icons/swap-arrow.svg"

import { DividerContainer, PercentButton, SwapButton, Icon } from "./styled"

interface IDividerProps {
  changeAmount: (v: BigNumber) => void
  changeDirection: () => void
  points?: { id: string; label: string; percent: BigNumber }[]
}

const ExchangeDivider: React.FC<IDividerProps> = ({
  changeAmount,
  changeDirection,
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
              <Icon src={icon} alt="change direction" />
            </SwapButton>
          )}
        </Fragment>
      ))}
    </DividerContainer>
  )
}

export default ExchangeDivider
