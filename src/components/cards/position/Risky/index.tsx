import { useCallback, useState } from "react"
import { BigNumber } from "ethers"
import { useSelector } from "react-redux"

import { PriceFeed } from "abi"
import { IPosition } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { Flex } from "theme"
import Icon from "components/Icon"
import PositionTrade from "components/PositionTrade"
import AmountRow from "components/Amount/Row"
import { accordionSummaryVariants } from "motion/variants"
import {
  CardContainer,
  Card,
  PositionTradeList,
  CommissionCard,
  FundSymbol,
  ActionsContainer,
  Action,
} from "./styled"

import PositionCardHeader from "./Header"
import PositionCardBody from "./Body"

interface Props {
  baseTokenAddress?: string
  position: IPosition
  ticker?: string
  descriptionURL?: string
  poolAddress?: string
}

const RiskyPositionCard: React.FC<Props> = ({
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

  const [openExtra, setOpenExtra] = useState<boolean>(false)
  const [showPositions, setShowPositions] = useState<boolean>(false)
  const [showComission, setShowComission] = useState<boolean>(false)
  const toggleExtraContent = useCallback(() => {
    if (showPositions) {
      setShowPositions(false)
    }
    if (showComission) {
      setShowComission(false)
    }
    setOpenExtra(!openExtra)
  }, [openExtra, showComission, showPositions])

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

  const onBuyMore = (e) => {
    e.preventDefault()
    console.log("onBuyMore")
  }

  const onClose = (e) => {
    e.preventDefault()
    console.log("onClose")
  }

  return (
    <>
      <CardContainer>
        <Card onClick={toggleExtraContent}>
          <PositionCardHeader
            dir="row-reverse"
            positionToken={position.positionToken}
            symbol={tokenData?.symbol}
          >
            <Flex>
              <Icon
                m="0"
                size={24}
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={poolAddress}
              />
              <FundSymbol>{ticker}</FundSymbol>
            </Flex>
          </PositionCardHeader>
          <PositionCardBody
            baseToken={baseToken}
            markPrice={markPrice}
            markPriceUSD={markPriceUSD}
            closed={position.closed}
          />
        </Card>

        <Flex
          full
          dir="column"
          initial="hidden"
          animate={openExtra ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          <ActionsContainer>
            <Action active={showPositions} onClick={togglePositions}>
              All trades
            </Action>
            <Action onClick={onBuyMore}>Buy more</Action>
            <Action active={showComission} onClick={toggleComission}>
              Comission
            </Action>
            <Action onClick={onClose}>Close</Action>
          </ActionsContainer>
        </Flex>
        <PositionTradeList
          initial="hidden"
          animate={showPositions ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          <PositionTrade isBuyTrade={true} />
          <PositionTrade />
          <PositionTrade isBuyTrade={true} />
        </PositionTradeList>
        <PositionTradeList
          initial="hidden"
          animate={showComission ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          <CommissionCard>
            <AmountRow m="8px" title="3 month Performance Fee" value="30%" />
            <AmountRow m="8px" title="Performance Fee" value="$22k" />
            <AmountRow m="8px" title="Date of withdrawal" value="12.12.2021" />
            <AmountRow
              m="8px"
              title="Investor funds locked (3%)"
              value="$133k/$3.333.333"
            />
          </CommissionCard>
        </PositionTradeList>
      </CardContainer>
    </>
  )
}

export default RiskyPositionCard
