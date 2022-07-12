import { useCallback, useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"

import { PriceFeed } from "abi"
import { IInvestorProposal } from "constants/interfaces_v2"
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
import { usePoolContract } from "hooks/usePool"

interface Props {
  position: IInvestorProposal
}

const InvestPositionCard: React.FC<Props> = ({ position }) => {
  const [, poolInfo] = usePoolContract(position.pool.id)
  const [, baseTokenData] = useERC20(poolInfo?.parameters.baseToken)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [{ poolMetadata }] = usePoolMetadata(
    position.pool.id,
    poolInfo?.parameters.descriptionURL
  )

  console.groupCollapsed("InvestPositionCard")
  console.log("position", position)
  console.log("baseTokenData", baseTokenData)
  console.log("poolInfo", poolInfo)
  console.log("poolMetadata", poolMetadata)
  console.groupEnd()

  const [markPrice, setMarkPrice] = useState(BigNumber.from(0))
  const markPriceUSD = useTokenPriceOutUSD({
    tokenAddress: position.pool.token,
  })

  const [showExtra, setShowExtra] = useState<boolean>(false)
  const [showPositions, setShowPositions] = useState<boolean>(false)
  const [showComission, setShowComission] = useState<boolean>(false)
  const toggleExtraContent = useCallback(() => {
    if (position.isClosed) {
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
  }, [showExtra, position.isClosed, showComission, showPositions])

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
        position.pool.token,
        baseTokenData?.address,
        amount,
        []
      )
      setMarkPrice(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, baseTokenData, position.pool.token])

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
                address={position.pool.id}
              />
              <S.Amount>5</S.Amount>
              <S.PositionSymbol>{baseTokenData?.symbol}</S.PositionSymbol>
            </Flex>
            <Flex>
              <S.FundSymbol>{poolInfo?.name}</S.FundSymbol>
              <TokenIcon address={baseTokenData?.address} m="0" size={24} />
            </Flex>
          </SharedS.Head>

          <SharedS.Body>
            <BodyItem
              label="Entry Price"
              amount={ethers.utils.parseUnits("0.1")}
              symbol={baseTokenData?.symbol}
              amountUSD={ethers.utils.parseUnits("57")}
            />
            <BodyItem
              label={position.isClosed ? "Closed price" : "Current price"}
              amount={markPrice}
              symbol={baseTokenData?.symbol}
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
          {!position.isClosed && (
            <Actions actions={actions} visible={showExtra} />
          )}
        </AnimatePresence>

        <SharedS.ExtraItem
          initial="hidden"
          animate={showPositions ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          {position.vest && position.vest.length > 0 ? (
            position.vest.map((v) => (
              <PositionTrade
                data={v}
                key={v.id}
                baseTokenSymbol={baseTokenData?.symbol}
              />
            ))
          ) : (
            <>No vests</>
          )}
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
