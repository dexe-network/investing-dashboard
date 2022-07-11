import { useState, useCallback, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { ethers } from "ethers"
import { BigNumber, FixedNumber } from "@ethersproject/bignumber"
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
import { normalizeBigNumber } from "utils"

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
  const [, baseToken] = useERC20(baseTokenAddress)
  const [, positionTokenData] = useERC20(position.positionToken)

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

  const positionOpenBaseAmount = useMemo(() => {
    if (!position || !position.totalPositionOpenVolume) return "0"

    return normalizeBigNumber(position.totalPositionOpenVolume, 18, 6)
  }, [position])

  const pnlLP = useMemo(() => {
    if (!markPrice || !position || !position.totalBaseOpenVolume)
      return BigNumber.from("0")

    const _markPriceFixed = FixedNumber.from(markPrice, 18)
    const _totalBaseOpenVolumeFixed = FixedNumber.from(
      position.totalBaseOpenVolume,
      18
    )

    return BigNumber.from(_markPriceFixed.subUnsafe(_totalBaseOpenVolumeFixed))
  }, [markPrice, position])

  const pnlUSD = useMemo(() => {
    if (!markPriceUSD || !position || !position.totalUSDOpenVolume)
      return BigNumber.from("0")

    const _markPriceFixed = FixedNumber.from(markPriceUSD, 18)
    const _totalUSDOpenVolumeFixed = FixedNumber.from(
      position.totalUSDOpenVolume,
      18
    )

    return BigNumber.from(_markPriceFixed.subUnsafe(_totalUSDOpenVolumeFixed))
  }, [markPriceUSD, position])

  // get mark price
  useEffect(() => {
    if (!priceFeed || !position) return

    const getMarkPrice = async () => {
      // without extended
      const price = await priceFeed.getNormalizedExtendedPriceOut(
        position.positionToken,
        baseTokenAddress,
        position.totalPositionOpenVolume,
        []
      )
      setMarkPrice(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, baseTokenAddress, position.positionToken, position])

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
              <S.Amount>{positionOpenBaseAmount}</S.Amount>
              <S.PositionSymbol>{positionTokenData?.symbol}</S.PositionSymbol>
            </Flex>
          </SharedS.Head>

          <SharedS.Body>
            <BodyItem
              label="Entry Price"
              amount={position.totalBaseOpenVolume}
              symbol={baseToken?.symbol}
              amountUSD={position.totalUSDOpenVolume}
            />
            <BodyItem
              label={position.closed ? "Closed price" : "Current price"}
              amount={markPrice}
              symbol={baseToken?.symbol}
              amountUSD={markPriceUSD}
            />
            <BodyItem
              label="P&L LP"
              amount={ethers.utils.parseUnits("10.309")}
              pnl={ethers.utils.parseUnits("-0.38")}
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
