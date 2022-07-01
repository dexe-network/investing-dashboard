import { useCallback, useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"

import { PriceFeed } from "abi"
import { IPosition } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { Flex } from "theme"
import Icon from "components/Icon"
import TokenIcon from "components/TokenIcon"
import AmountRow from "components/Amount/Row"
import PositionTrade from "components/PositionTrade"

import { accordionSummaryVariants } from "motion/variants"
import SharedS, { BodyItem, Actions } from "components/cards/position/styled"
import S from "./styled"

interface Props {
  baseTokenAddress?: string
  position: IPosition
  ticker?: string
  descriptionURL?: string
  poolAddress?: string
}

const InvestPositionCard: React.FC<Props> = ({
  baseTokenAddress,
  position,
  ticker,

  descriptionURL,
  poolAddress,
}) => {
  const [, tokenData] = useERC20(position.positionToken)
  const [, baseToken] = useERC20(baseTokenAddress)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [{ poolMetadata }] = usePoolMetadata(poolAddress, descriptionURL)

  const [markPrice, setMarkPrice] = useState(BigNumber.from(0))
  const markPriceUSD = useTokenPriceOutUSD({
    tokenAddress: position.positionToken,
  })

  const [showExtra, setShowExtra] = useState<boolean>(false)
  const [showPositions, setShowPositions] = useState<boolean>(false)
  const [showComission, setShowComission] = useState<boolean>(false)
  const toggleExtraContent = useCallback(() => {
    if (position.closed) {
      setShowPositions(!showPositions)
    } else {
      if (showPositions) {
        setShowPositions(false)
      }
      if (showComission) {
        setShowComission(false)
      }
    }
    setShowExtra(!showExtra)
  }, [showExtra, position.closed, showComission, showPositions])

  const togglePositions = useCallback(() => {
    if (!showPositions && showComission) {
      setShowComission(false)
    }
    setShowPositions(!showPositions)
  }, [showComission, showPositions])

  const toggleComission = useCallback(() => {
    if (!showComission && showPositions) {
      setShowPositions(false)
    }
    setShowComission(!showComission)
  }, [showComission, showPositions])

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
      label: "All trades",
      active: showPositions,
      onClick: togglePositions,
    },
    {
      label: "Buy more",
      onClick: onBuyMore,
    },
    {
      label: "Comission",
      active: showComission,
      onClick: toggleComission,
    },
    {
      label: "Close",
      onClick: onClosePosition,
    },
  ]

  return (
    <>
      <SharedS.Container>
        <SharedS.Card onClick={toggleExtraContent}>
          <SharedS.Head>
            <Flex>
              <Icon
                m="0"
                size={24}
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={poolAddress}
              />
              <S.Amount>5</S.Amount>
              <S.PositionSymbol>{tokenData?.symbol}</S.PositionSymbol>
            </Flex>
            <Flex>
              <S.FundSymbol>{ticker}</S.FundSymbol>
              <TokenIcon address={position.positionToken} m="0" size={24} />
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
          {!position.closed && (
            <Actions actions={actions} visible={showExtra} />
          )}
        </AnimatePresence>

        <SharedS.ExtraItem
          initial="hidden"
          animate={showPositions ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          <PositionTrade isBuyTrade={true} />
          <PositionTrade />
          <PositionTrade isBuyTrade={true} />
        </SharedS.ExtraItem>
        <SharedS.ExtraItem
          initial="hidden"
          animate={showComission ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
          p="16px"
        >
          <AmountRow title="3 month Performance Fee" value="30%" />
          <AmountRow m="14px 0 0" title="Performance Fee" value="$22k" />
          <AmountRow
            m="14px 0 0"
            title="Date of withdrawal"
            value="12.12.2021"
          />
          <AmountRow
            m="14px 0 0"
            title="Investor funds locked (3%)"
            value="$133k/$3.333.333"
          />
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

export default InvestPositionCard
