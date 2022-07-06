import { Fragment } from "react"
import { BigNumber } from "@ethersproject/bignumber"

import { EXCHANGE_DEFAULT_PERCENTS } from "constants/index"
import { SwapDirection } from "constants/types"

import { rotateVariants } from "theme"
import { DividerContainer, PercentButton, SwapButton, Icon } from "./styled"
import icon from "assets/icons/swap-arrow.svg"

interface IDividerProps {
  changeAmount: (v: BigNumber) => void
  changeDirection: () => void
  direction: SwapDirection
  points?: { id: string; label: string; percent: BigNumber }[]
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
