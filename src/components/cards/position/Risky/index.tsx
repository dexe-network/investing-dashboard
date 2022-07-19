import { useCallback, useEffect, useMemo, useState } from "react"
import { BigNumber, ethers } from "ethers"
import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { FixedNumber } from "@ethersproject/bignumber"
import { useNavigate } from "react-router-dom"

import { PriceFeed } from "abi"
import { normalizeBigNumber } from "utils"
import { useActiveWeb3React } from "hooks"
import { percentageOfBignumbers } from "utils/formulas"
import useContract, { useERC20 } from "hooks/useContract"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { IRiskyPositionCard } from "constants/interfaces_v2"
import { usePoolContract, useTraderPool } from "hooks/usePool"
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
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const [, positionTokenData] = useERC20(position?.token)
  const [, baseTokenData] = useERC20(position.pool.baseToken)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)
  const [, poolInfo] = usePoolContract(position.pool.id)
  const traderPool = useTraderPool(position.pool.id)

  const [{ poolMetadata }] = usePoolMetadata(
    position.pool.id,
    poolInfo?.parameters.descriptionURL
  )

  console.groupCollapsed("RiskyPositionCard")
  console.log("position", position)
  console.log("positionTokenData", positionTokenData)
  console.log("baseTokenData", baseTokenData)
  console.groupEnd()

  const [markPriceOpen, setMarkPriceOpen] = useState(BigNumber.from(0))
  const markPriceOpenUSD = useTokenPriceOutUSD({
    tokenAddress: position.token,
  })

  const positionTokenSymbol = useMemo(() => {
    if (!positionTokenData || !positionTokenData?.symbol) return ""
    return positionTokenData?.symbol
  }, [positionTokenData])

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

  const [poolBaseShare, setPoolBaseShare] = useState<BigNumber>(
    BigNumber.from("0")
  )
  const [poolUSDShare, setPoolUSDShare] = useState<BigNumber>(
    BigNumber.from("0")
  )

  const positionOpenBaseAmount = useMemo(() => {
    if (!position || !position.totalPositionOpenVolume) return "0"

    return normalizeBigNumber(position.totalPositionOpenVolume, 18, 6)
  }, [position])

  const entryPriceBase = useMemo<BigNumber>(() => {
    if (
      !position ||
      !position.totalUSDOpenVolume ||
      !position.totalPositionOpenVolume
    ) {
      return BigNumber.from("0")
    }

    const totalUsdInvestFixed = FixedNumber.fromValue(
      position.totalUSDOpenVolume,
      18
    )
    const totalLpInvestFixed = FixedNumber.fromValue(
      position.totalPositionOpenVolume,
      18
    )
    const resFixed = totalUsdInvestFixed.divUnsafe(totalLpInvestFixed)

    return ethers.utils.parseEther(resFixed._value)
  }, [position])

  const entryPriceUSD = useMemo<BigNumber>(() => {
    if (
      !position ||
      !position.totalBaseOpenVolume ||
      !position.totalPositionOpenVolume
    ) {
      return BigNumber.from("0")
    }

    const totalBaseInvestFixed = FixedNumber.fromValue(
      position.totalBaseOpenVolume,
      18
    )
    const totalLpInvestFixed = FixedNumber.fromValue(
      position.totalPositionOpenVolume,
      18
    )
    const resFixed = totalBaseInvestFixed.divUnsafe(totalLpInvestFixed)

    return ethers.utils.parseEther(resFixed._value)
  }, [position])

  const markPrice = useMemo(() => {
    if (!position) {
      return BigNumber.from("0")
    }

    if (position.isClosed) {
      const totalBaseDivestVolumeFixed = FixedNumber.fromValue(
        position.totalBaseCloseVolume,
        18
      )
      const totalLPInvestVolumeFixed = FixedNumber.fromValue(
        position.totalBaseOpenVolume,
        18
      )
      const resFixed = totalBaseDivestVolumeFixed.divUnsafe(
        totalLPInvestVolumeFixed
      )

      return ethers.utils.parseEther(resFixed._value)
    }

    return markPriceOpen
  }, [markPriceOpen, position])

  const markPriceUSD = useMemo(() => {
    if (!position) {
      return BigNumber.from("0")
    }

    if (position.isClosed) {
      const totalUSDDivestVolumeFixed = FixedNumber.fromValue(
        position.totalUSDCloseVolume,
        18
      )
      const totalLPInvestVolumeFixed = FixedNumber.fromValue(
        position.totalBaseOpenVolume,
        18
      )
      const resFixed = totalUSDDivestVolumeFixed.divUnsafe(
        totalLPInvestVolumeFixed
      )

      return ethers.utils.parseEther(resFixed._value)
    }

    return markPriceOpenUSD
  }, [markPriceOpenUSD, position])

  const pnlBase = useMemo(() => {
    if (!position) {
      return BigNumber.from("0")
    }

    const totalBaseDivestVolumeFixed = FixedNumber.fromValue(
      position.totalPositionCloseVolume,
      18
    )
    const totalBaseInvestVolumeFixed = FixedNumber.fromValue(
      position.totalPositionOpenVolume,
      18
    )

    if (position.isClosed) {
      const resFixed = totalBaseDivestVolumeFixed.subUnsafe(
        totalBaseInvestVolumeFixed
      )
      return ethers.utils.parseEther(resFixed._value)
    } else {
      const poolBaseShareFixed = FixedNumber.fromValue(poolBaseShare, 18)

      const resFixed = totalBaseDivestVolumeFixed
        .addUnsafe(poolBaseShareFixed)
        .subUnsafe(totalBaseInvestVolumeFixed)
      return ethers.utils.parseEther(resFixed._value)
    }
  }, [poolBaseShare, position])

  const pnlUSD = useMemo(() => {
    if (!position) {
      return BigNumber.from("0")
    }

    const totalUSDDivestVolumeFixed = FixedNumber.fromValue(
      position.totalUSDCloseVolume,
      18
    )
    const totalUSDInvestVolumeFixed = FixedNumber.fromValue(
      position.totalUSDOpenVolume,
      18
    )

    if (position.isClosed) {
      const resFixed = totalUSDDivestVolumeFixed.subUnsafe(
        totalUSDInvestVolumeFixed
      )
      return ethers.utils.parseEther(resFixed._value)
    } else {
      const poolUSDShareFixed = FixedNumber.fromValue(poolUSDShare, 18)

      const resFixed = totalUSDDivestVolumeFixed
        .addUnsafe(poolUSDShareFixed)
        .subUnsafe(totalUSDInvestVolumeFixed)
      return ethers.utils.parseEther(resFixed._value)
    }
  }, [poolUSDShare, position])

  const pnlPercentage = useMemo(() => {
    if (!markPrice || !entryPriceBase)
      return { value: BigNumber.from("0"), normalized: "0" }

    const percentage = percentageOfBignumbers(markPrice, entryPriceBase)

    const resultFixed = FixedNumber.fromValue(percentage, 18).subUnsafe(
      FixedNumber.from("100", 18)
    )

    return {
      value: ethers.utils.parseEther(resultFixed._value),
      normalized: normalizeBigNumber(
        ethers.utils.parseEther(resultFixed._value),
        18,
        2
      ),
    }
  }, [markPrice, entryPriceBase])

  // get open mark price
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
      setMarkPriceOpen(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, position.pool.baseToken, position.token])

  useEffect(() => {
    if (!traderPool || !account) {
      return
    }

    ;(async () => {
      try {
        //TODO: const userData = traderPool.getUsersInfo(account, 0, 0)
        const userData = await traderPool.getUsersInfo(0, 0)

        if (userData && userData.length > 0) {
          setPoolBaseShare(userData[0].poolBaseShare)
          setPoolUSDShare(userData[0].poolUSDShare)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [account, traderPool])

  const onBuyMore = (e) => {
    e.preventDefault()
    navigate(`/invest-risky-proposal/${position.pool.id}/${position.proposal}`)
  }

  const onClosePosition = (e) => {
    e.preventDefault()
    navigate(`/invest-risky-proposal/${position.pool.id}/${position.proposal}`)
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
              {!position.isClosed ? (
                <TokenIcon
                  address={positionTokenData?.address}
                  m="0"
                  size={24}
                />
              ) : (
                <S.Symbols>
                  <S.SymbolItem>
                    <TokenIcon
                      address={positionTokenData?.address}
                      m="0"
                      size={24}
                    />
                  </S.SymbolItem>
                  <S.SymbolItem>
                    <TokenIcon
                      address={baseTokenData?.address}
                      m="0"
                      size={26}
                    />
                  </S.SymbolItem>
                </S.Symbols>
              )}

              <S.PositionSymbol>{positionTokenSymbol}</S.PositionSymbol>
              {!position.isClosed && (
                <S.Amount>({positionOpenBaseAmount} LP)</S.Amount>
              )}
              {position.isClosed && (
                <S.FundSymbol>/{baseTokenData?.symbol}</S.FundSymbol>
              )}
              <SharedS.PNL amount={+pnlPercentage.normalized}>
                {Number(pnlPercentage.normalized) > 0 && "+"}
                {pnlPercentage.normalized}%
              </SharedS.PNL>
            </Flex>
            <Flex>
              <S.FundSymbol>{poolInfo?.ticker}</S.FundSymbol>
              {position.isClosed ? (
                <Icon
                  m="0"
                  size={24}
                  source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                  address={position.pool.id}
                />
              ) : (
                <TokenIcon address={baseTokenData?.address} m="0" size={26} />
              )}
            </Flex>
          </SharedS.Head>
          <SharedS.Body>
            <BodyItem
              label={"Entry Price " + positionTokenSymbol}
              amount={entryPriceBase}
              amountUSD={entryPriceUSD}
            />
            <BodyItem
              label={
                (position.isClosed ? "Closed price " : "Current price ") +
                positionTokenSymbol
              }
              amount={markPrice}
              amountUSD={markPriceUSD}
            />
            <BodyItem
              label={"P&L " + positionTokenSymbol}
              amount={pnlBase}
              pnl={pnlPercentage.value}
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
          <PositionTrade
            isBuy={false}
            timestamp={String(new Date().valueOf())}
            amount={BigNumber.from("0")}
            data={{}}
          />
          <PositionTrade
            isBuy={false}
            timestamp={String(new Date().valueOf())}
            amount={BigNumber.from("0")}
            data={{}}
          />
          <PositionTrade
            isBuy={false}
            timestamp={String(new Date().valueOf())}
            amount={BigNumber.from("0")}
            data={{}}
          />
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

export default RiskyPositionCard
