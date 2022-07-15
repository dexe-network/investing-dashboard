import { useState, useCallback, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { ethers } from "ethers"
import { BigNumber, FixedNumber } from "@ethersproject/bignumber"
import { AnimatePresence } from "framer-motion"

import { PriceFeed } from "abi"
import { normalizeBigNumber } from "utils"
import { useActiveWeb3React } from "hooks"
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
import { percentageOfBignumbers } from "utils/formulas"

interface Props {
  position: IPosition
}

const PoolPositionCard: React.FC<Props> = ({ position }) => {
  const { account } = useActiveWeb3React()
  const [, baseToken] = useERC20(position.traderPool.baseToken)
  const [, positionTokenData] = useERC20(position.positionToken)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const isTrader = useMemo(() => {
    if (!account || !position) return false
    return account === position.traderPool.trader
  }, [account, position])

  const [markPriceBase, setMarkPriceBase] = useState(BigNumber.from(0))
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

  const entryPriceBase = useMemo(() => {
    if (!position || !position.exchanges) return BigNumber.from("0")

    const sumBaseFixed = position.exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.fromVolume, 18))
    }, FixedNumber.from("0", 18))

    const sumPositionFixed = position.exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.toVolume, 18))
    }, FixedNumber.from("0", 18))

    return BigNumber.from(sumBaseFixed.divUnsafe(sumPositionFixed))
  }, [position])

  const entryPriceUSD = useMemo(() => {
    if (!position || !position.exchanges) return BigNumber.from("0")

    const sumUsdFixed = position.exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.usdVolume, 18))
    }, FixedNumber.from("0", 18))

    const sumPositionFixed = position.exchanges.reduce((acc, e) => {
      return acc.addUnsafe(FixedNumber.fromValue(e.toVolume, 18))
    }, FixedNumber.from("0", 18))

    return BigNumber.from(sumUsdFixed.divUnsafe(sumPositionFixed))
  }, [position])

  const pnlBase = useMemo(() => {
    if (!markPriceBase || !entryPriceBase) return BigNumber.from("0")

    const _markPriceFixed = FixedNumber.fromValue(markPriceBase, 18)
    const _entryPriceBaseFixed = FixedNumber.fromValue(entryPriceBase, 18)

    const res = _markPriceFixed.subUnsafe(_entryPriceBaseFixed)

    return ethers.utils.parseEther(res._value)
  }, [markPriceBase, entryPriceBase])

  const pnlPercentage = useMemo(() => {
    if (!markPriceBase || !entryPriceBase)
      return { value: BigNumber.from("0"), normalized: "0" }

    const percentage = percentageOfBignumbers(markPriceBase, entryPriceBase)

    const resultFixed = FixedNumber.fromValue(percentage, 18).subUnsafe(
      FixedNumber.from("100", 18)
    )

    const resultBig = ethers.utils.parseEther(resultFixed._value)

    return {
      value: resultBig,
      normalized: normalizeBigNumber(resultBig, 18, 2),
    }
  }, [markPriceBase, entryPriceBase])

  const pnlUSD = useMemo(() => {
    if (!markPriceUSD || !entryPriceUSD) return BigNumber.from("0")

    const _markPriceFixed = FixedNumber.fromValue(markPriceUSD, 18)
    const _entryPriceUSDFixed = FixedNumber.fromValue(entryPriceUSD, 18)

    const res = _markPriceFixed.subUnsafe(_entryPriceUSDFixed)

    return ethers.utils.parseEther(res._value)
  }, [markPriceUSD, entryPriceUSD])

  // get mark price base
  useEffect(() => {
    if (!priceFeed || !position) return

    const getMarkPrice = async () => {
      // without extended
      const price = await priceFeed.getNormalizedExtendedPriceOut(
        position.positionToken,
        position.traderPool.baseToken,
        ethers.utils.parseEther("1"),
        []
      )
      setMarkPriceBase(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [
    priceFeed,
    position.traderPool.baseToken,
    position.positionToken,
    position,
  ])

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
            <Flex>
              <SharedS.PNL amount={+pnlPercentage.normalized}>
                {pnlPercentage.normalized}%
              </SharedS.PNL>
            </Flex>
          </SharedS.Head>

          <SharedS.Body>
            <BodyItem
              label={"Entry Price " + baseToken?.symbol}
              amount={entryPriceBase}
              amountUSD={entryPriceUSD}
            />
            <BodyItem
              label={
                (position.closed ? "Closed price " : "Current price ") +
                baseToken?.symbol
              }
              amount={markPriceBase}
              amountUSD={markPriceUSD}
            />
            <BodyItem
              label={"P&L " + baseToken?.symbol}
              amount={pnlBase}
              pnl={pnlPercentage.value}
              amountUSD={pnlUSD}
              ai="flex-end"
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
          {position.exchanges && position.exchanges.length > 0 ? (
            position.exchanges.map((e) => (
              <PositionTrade
                key={e.id}
                data={e}
                baseTokenSymbol={baseToken?.symbol}
              />
            ))
          ) : (
            <>No trades</>
          )}
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

export default PoolPositionCard
