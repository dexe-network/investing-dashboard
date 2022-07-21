import { useCallback, useEffect, useMemo, useState } from "react"
import { BigNumber, ethers } from "ethers"
import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { FixedNumber } from "@ethersproject/bignumber"

import { PriceFeed } from "abi"
import { IRiskyPositionCard } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import { normalizeBigNumber } from "utils"
import useRiskyPositionExchanges from "hooks/useRiskyPositionExchanges"
import { percentageOfBignumbers } from "utils/formulas"

import { Flex } from "theme"
import TokenIcon from "components/TokenIcon"
import PositionTrade from "components/PositionTrade"

import { accordionSummaryVariants } from "motion/variants"
import SharedS, { BodyItem, Actions } from "components/cards/position/styled"
import S from "./styled"

interface Props {
  position: IRiskyPositionCard
}

const RiskyPositionPoolCard: React.FC<Props> = ({ position }) => {
  const [, tokenData] = useERC20(position?.token)
  const [, baseTokenData] = useERC20(position.pool.baseToken)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const exchanges = useRiskyPositionExchanges(position.pool.id)

  const [markPriceBase, setMarkPriceBase] = useState(BigNumber.from(0))
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

  const baseTokenSymbol = useMemo(() => {
    if (!baseTokenData || !baseTokenData?.symbol) return ""

    return baseTokenData.symbol
  }, [baseTokenData])

  const positionOpenBaseAmount = useMemo(() => {
    if (!position || !position.totalPositionOpenVolume) return "0"

    return normalizeBigNumber(position.totalPositionOpenVolume, 18, 6)
  }, [position])

  const entryPriceBase = useMemo(() => {
    if (!exchanges || !exchanges.length) return BigNumber.from("0")

    const sumBaseFixed = exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.fromVolume, 18))
    }, FixedNumber.from("0", 18))

    const sumPositionFixed = exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.toVolume, 18))
    }, FixedNumber.from("0", 18))

    return BigNumber.from(sumBaseFixed.divUnsafe(sumPositionFixed))
  }, [exchanges])

  const entryPriceUSD = useMemo(() => {
    if (!exchanges || !exchanges?.length) return BigNumber.from("0")

    const sumUsdFixed = exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.usdVolume, 18))
    }, FixedNumber.from("0", 18))

    const sumPositionFixed = exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.toVolume, 18))
    }, FixedNumber.from("0", 18))

    return BigNumber.from(sumUsdFixed.divUnsafe(sumPositionFixed))
  }, [exchanges])

  const pnlBase = useMemo(() => {
    if (!markPriceBase || !entryPriceBase) return BigNumber.from("0")

    const _markPriceFixed = FixedNumber.fromValue(markPriceBase, 18)
    const _entryPriceBaseFixed = FixedNumber.fromValue(entryPriceBase, 18)

    const res = _markPriceFixed.subUnsafe(_entryPriceBaseFixed)

    return ethers.utils.parseEther(res._value)
  }, [markPriceBase, entryPriceBase])

  const pnlPercentage = useMemo(() => {
    if (
      !markPriceBase ||
      !entryPriceBase ||
      markPriceBase.isZero() ||
      entryPriceBase.isZero()
    )
      return BigNumber.from("0")

    const percentage = percentageOfBignumbers(markPriceBase, entryPriceBase)

    const resultFixed = FixedNumber.fromValue(percentage, 18).subUnsafe(
      FixedNumber.from("100", 18)
    )

    return ethers.utils.parseEther(resultFixed._value)
  }, [markPriceBase, entryPriceBase])

  const pnlUSD = useMemo(() => {
    if (!markPriceUSD || !entryPriceUSD) return BigNumber.from("0")

    const _markPriceFixed = FixedNumber.fromValue(markPriceUSD, 18)
    const _entryPriceUSDFixed = FixedNumber.fromValue(entryPriceUSD, 18)

    const res = _markPriceFixed.subUnsafe(_entryPriceUSDFixed)

    return ethers.utils.parseEther(res._value)
  }, [markPriceUSD, entryPriceUSD])

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
      setMarkPriceBase(price.amountOut)
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
              <TokenIcon address={tokenData?.address ?? ""} m="0" size={24} />
              <S.Amount>{positionOpenBaseAmount}</S.Amount>
              <S.PositionSymbol>{tokenData?.symbol ?? ""}</S.PositionSymbol>
              <S.FundSymbol>/{baseTokenSymbol}</S.FundSymbol>
            </Flex>
          </SharedS.Head>
          <SharedS.Body>
            <BodyItem
              label={`Entry Price ${baseTokenSymbol}`}
              amount={entryPriceBase}
              amountUSD={entryPriceUSD}
            />
            <BodyItem
              label={
                (position.isClosed ? "Closed price " : "Current price ") +
                baseTokenSymbol
              }
              amount={markPriceBase}
              amountUSD={markPriceUSD}
            />
            <BodyItem
              label={`P&L ${baseTokenSymbol}`}
              amount={pnlBase}
              pnl={pnlPercentage}
              amountUSD={pnlUSD}
              ai="flex-end"
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
          {exchanges && exchanges.length ? (
            exchanges.map((e) => (
              <PositionTrade
                data={e}
                key={e.id}
                timestamp={ethers.utils.formatEther(e.timestamp)}
                isBuy={false}
                amount={!false ? e.toVolume : e.fromVolume}
              />
            ))
          ) : (
            <Flex full jc="center" p="12px 0">
              <SharedS.WitoutData>No trades</SharedS.WitoutData>
            </Flex>
          )}
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

export default RiskyPositionPoolCard
