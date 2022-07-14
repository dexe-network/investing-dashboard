import { useCallback, useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"

import { PriceFeed } from "abi"
import { IRiskyPositionCard } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { usePoolContract } from "hooks/usePool"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { Flex } from "theme"
import Icon from "components/Icon"
import TokenIcon from "components/TokenIcon"
import PositionTrade from "components/PositionTrade"

import { accordionSummaryVariants } from "motion/variants"
import SharedS, { BodyItem, Actions } from "components/cards/position/styled"
import S from "./styled"

interface Props {
  position: IRiskyPositionCard
}

const RiskyPositionCard: React.FC<Props> = ({ position }) => {
  const [, tokenData] = useERC20(position?.token)
  const [, baseTokenData] = useERC20(position.pool.baseToken)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const [, poolInfo] = usePoolContract(position.pool.id)

  const [{ poolMetadata }] = usePoolMetadata(
    position.pool.id,
    poolInfo?.parameters.descriptionURL
  )

  const [markPrice, setMarkPrice] = useState(BigNumber.from(0))
  const markPriceUSD = useTokenPriceOutUSD({
    tokenAddress: position.token,
  })

  const [openExtra, setOpenExtra] = useState<boolean>(false)
  const [showPositions, setShowPositions] = useState<boolean>(false)
  const toggleExtraContent = useCallback(() => {
    if (showPositions) {
      setShowPositions(false)
    }
    setOpenExtra(!openExtra)
  }, [openExtra, showPositions])

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
        position.token,
        position.pool.baseToken,
        amount,
        []
      )
      setMarkPrice(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, position.pool.baseToken, position.token])

  const onBuyMore = (e) => {
    e.preventDefault()
    console.log("onBuyMore")
  }

  const onClosePosition = (e) => {
    e.preventDefault()
    console.log("onClose")
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
              <TokenIcon address={tokenData?.address} m="0" size={24} />
              <S.PositionSymbol>{tokenData?.symbol}</S.PositionSymbol>
              <S.FundSymbol>/{baseTokenData?.symbol}</S.FundSymbol>
            </Flex>
            {!position.isClosed && (
              <Flex>
                <S.Amount>5 LP</S.Amount>
                <S.FundSymbol>/10 LP</S.FundSymbol>
              </Flex>
            )}
            <Flex>
              <S.FundSymbol>{poolInfo?.ticker}</S.FundSymbol>
              <Icon
                m="0"
                size={24}
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={position.pool.id}
              />
            </Flex>
          </SharedS.Head>
          <SharedS.Body>
            <BodyItem
              label="Entry Price"
              amount={ethers.utils.parseUnits("0.1")}
              amountUSD={ethers.utils.parseUnits("57")}
            />
            <BodyItem
              label={position.isClosed ? "Closed price" : "Current price"}
              amount={markPrice}
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
            <Actions visible={openExtra} actions={actions} />
          )}
        </AnimatePresence>

        <SharedS.ExtraItem
          initial="hidden"
          animate={showPositions ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          <PositionTrade data={{ timestamp: new Date().valueOf() }} />
          <PositionTrade data={{ timestamp: new Date().valueOf() }} />
          <PositionTrade data={{ timestamp: new Date().valueOf() }} />
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

export default RiskyPositionCard
