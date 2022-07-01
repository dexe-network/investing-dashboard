import { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { ethers, BigNumber } from "ethers"

import { PriceFeed } from "abi"
import { IPosition } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { Flex } from "theme"
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
  isTrader: boolean
}

const PoolPositionCard: React.FC<Props> = ({
  baseTokenAddress,
  position,
  isTrader,
}) => {
  console.log({ position, isTrader })
  const [, tokenData] = useERC20(position.positionToken)
  const [, baseToken] = useERC20(baseTokenAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [markPrice, setMarkPrice] = useState(BigNumber.from(0))
  const markPriceUSD = useTokenPriceOutUSD({
    tokenAddress: position.positionToken,
  })

  const [openExtra, setOpenExtra] = useState<boolean>(false)
  const [showPositions, setShowPositions] = useState<boolean>(false)
  const toggleExtraContent = useCallback(() => {
    // if (position.closed) {
    //   setOpenExtra(!openExtra)
    //   setShowPositions(!showPositions)
    // } else if()
    if (!isTrader || position.closed) {
      setOpenExtra(!openExtra)
      setShowPositions(!showPositions)
    } else {
      if (showPositions) {
        setShowPositions(false)
      }
      setOpenExtra(!openExtra)
    }
  }, [isTrader, openExtra, position.closed, showPositions])

  // get mark price
  useEffect(() => {
    if (!priceFeed) return

    const getMarkPrice = async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      // without extended
      const price = await priceFeed.getNormalizedExtendedPriceOut(
        position.positionToken,
        baseTokenAddress,
        amount,
        []
      )
      setMarkPrice(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, baseTokenAddress, position.positionToken])

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
          animate={openExtra ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          {isTrader && !position.closed && (
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
          )}
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

export default PoolPositionCard
