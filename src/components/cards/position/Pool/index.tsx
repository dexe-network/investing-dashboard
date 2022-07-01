import { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { ethers, BigNumber } from "ethers"
import { AnimatePresence } from "framer-motion"

import { PriceFeed } from "abi"
import { IPosition } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { Flex } from "theme"
import PositionTrade from "components/PositionTrade"
import TokenIcon from "components/TokenIcon"

import { accordionSummaryVariants } from "motion/variants"
import SharedS, { BodyItem, Actions } from "components/cards/position/styled"
import S from "./styled"

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
    if (!isTrader || position.closed) {
      setShowPositions(!showPositions)
    } else {
      if (showPositions) {
        setShowPositions(false)
      }
    }
    setOpenExtra(!openExtra)
  }, [isTrader, openExtra, position.closed, showPositions])
  const togglePositions = useCallback(() => {
    setShowPositions(!showPositions)
  }, [showPositions])

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

  const onBuyMore = (e) => {
    e.preventDefault()
    console.log("onBuyMore")
  }
  const onClosePosition = (e) => {
    e.preventDefault()
    console.log("onClosePosition")
  }

  const actions = [
    {
      label: "All my trades",
      active: showPositions,
      onClick: togglePositions,
    },
    {
      label: "Buy more",
      onClick: onBuyMore,
    },
    {
      label: "Close Position",
      onClick: onClosePosition,
    },
  ]

  return (
    <>
      <SharedS.Container>
        <SharedS.Card onClick={toggleExtraContent}>
          <SharedS.Head>
            <Flex>
              <TokenIcon address={position.positionToken} m="0" size={24} />
              <S.Amount>5</S.Amount>
              <S.PositionSymbol>{tokenData?.symbol}</S.PositionSymbol>
            </Flex>
          </SharedS.Head>

          <SharedS.Body>
            <BodyItem
              label="Entry Price"
              amount={ethers.utils.parseUnits("0.1")}
              symbol={baseToken?.symbol}
              amountUSD={ethers.utils.parseUnits("57")}
            />
            <BodyItem
              label={position.closed ? "Closed price" : "Current price"}
              amount={markPrice}
              symbol={baseToken?.symbol}
              amountUSD={markPriceUSD}
            />
            <BodyItem
              label="P&L LP"
              amount={ethers.utils.parseUnits("0.0012")}
              pnl={ethers.utils.parseUnits("0.38")}
              amountUSD={ethers.utils.parseUnits("30")}
            />
          </SharedS.Body>
        </SharedS.Card>

        <AnimatePresence>
          {isTrader && !position.closed && (
            <Actions actions={actions} visible={openExtra} />
          )}
        </AnimatePresence>

        <SharedS.ExtraItem
          initial="hidden"
          variants={accordionSummaryVariants}
          animate={showPositions ? "visible" : "hidden"}
        >
          <PositionTrade isBuyTrade={true} />
          <PositionTrade />
          <PositionTrade isBuyTrade={true} />
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

export default PoolPositionCard
