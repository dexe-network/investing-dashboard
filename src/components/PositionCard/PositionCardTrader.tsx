import { useState, useCallback } from "react"
import { Flex } from "theme"
import { BigNumber } from "ethers"

import { useERC20 } from "hooks/useContract"
import { IPosition } from "constants/interfaces_v2"

import { accordionSummaryVariants } from "motion/variants"
import {
  CardContainer,
  Card,
  ActionsContainer,
  Action,
  PositionTradeList,
} from "./styled"
import PositionTrade from "./PositionTrade"
import PositionCardHeader from "./Header"
import PositionCardBody from "./Body"

interface Props {
  baseTokenAddress?: string
  position: IPosition
  markPrice: BigNumber
  markPriceUSD: BigNumber

  poolAddress?: string
}

const PositionCardTrader: React.FC<Props> = ({
  baseTokenAddress,
  position,
  markPrice,
  markPriceUSD,
}) => {
  const [, tokenData] = useERC20(position.positionToken)
  const [, baseToken] = useERC20(baseTokenAddress)

  const [openTrades, setOpenTrades] = useState<boolean>(false)
  const [showPositions, setShowPositions] = useState<boolean>(false)
  const toggleExtraContent = useCallback(() => {
    if (showPositions) {
      setShowPositions(false)
    }
    setOpenTrades(!openTrades)
  }, [openTrades, showPositions])

  const onBuyMore = () => {
    console.log("onBuyMore")
  }
  const onClosePosition = () => {
    console.log("onClosePosition")
  }

  return (
    <>
      <CardContainer>
        <Card onClick={toggleExtraContent}>
          <PositionCardHeader
            positionToken={position.positionToken}
            symbol={tokenData?.symbol}
          />
          <PositionCardBody
            baseToken={baseToken}
            markPrice={markPrice}
            markPriceUSD={markPriceUSD}
          />
        </Card>

        <Flex
          full
          dir="column"
          initial="hidden"
          animate={openTrades ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          <ActionsContainer>
            <Action
              active={showPositions}
              onClick={() => setShowPositions(!showPositions)}
            >
              All my trades
            </Action>
            <Action onClick={onBuyMore}>Buy more</Action>
            <Action onClick={onClosePosition}>Close Position</Action>
          </ActionsContainer>
        </Flex>
        <PositionTradeList
          initial="hidden"
          variants={accordionSummaryVariants}
          animate={showPositions ? "visible" : "hidden"}
        >
          <PositionTrade isBuyTrade={true} />
          <PositionTrade />
          <PositionTrade isBuyTrade={true} />
        </PositionTradeList>
      </CardContainer>
    </>
  )
}

export default PositionCardTrader
