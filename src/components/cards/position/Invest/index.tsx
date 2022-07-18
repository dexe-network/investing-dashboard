import { useCallback, useEffect, useMemo, useState, MouseEvent } from "react"
import { ethers } from "ethers"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { BigNumber, FixedNumber } from "@ethersproject/bignumber"
import { createClient, Provider as GraphProvider } from "urql"

import { PriceFeed } from "abi"
import { IInvestorProposal } from "constants/interfaces_v2"
import useContract, { useERC20 } from "hooks/useContract"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import { usePoolContract, useTraderPool } from "hooks/usePool"
import { normalizeBigNumber } from "utils"
import { percentageOfBignumbers } from "utils/formulas"
import { useActiveWeb3React } from "hooks"
import useFundFeeHistory from "hooks/useFundFeeHistory"

import { Flex } from "theme"
import Icon from "components/Icon"
import TokenIcon from "components/TokenIcon"
import AmountRow from "components/Amount/Row"
import PositionTrade from "components/PositionTrade"

import { accordionSummaryVariants } from "motion/variants"
import SharedS, { BodyItem, Actions } from "components/cards/position/styled"
import S from "./styled"

interface Props {
  position: IInvestorProposal
}

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const InvestPositionCard: React.FC<Props> = ({ position }) => {
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const [, poolInfo] = usePoolContract(position.pool.id)
  const traderPool = useTraderPool(position.pool.id)
  const fundFeeHistories = useFundFeeHistory(position.pool.id)
  const [, baseTokenData] = useERC20(position.pool.token)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [{ poolMetadata }] = usePoolMetadata(
    position.pool.id,
    poolInfo?.parameters.descriptionURL
  )

  const [markPriceOpen, setMarkPriceOpenOpen] = useState(BigNumber.from(0))
  const markPriceOpenUSD = useTokenPriceOutUSD({
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

  const [poolBaseShare, setPoolBaseShare] = useState<BigNumber>(
    BigNumber.from("0")
  )
  const [poolUSDShare, setPoolUSDShare] = useState<BigNumber>(
    BigNumber.from("0")
  )

  const baseTokenSymbol = useMemo<string>(() => {
    if (!baseTokenData || !baseTokenData.symbol) {
      return ""
    }
    return baseTokenData.symbol
  }, [baseTokenData])

  const positionOpenLPAmount = useMemo<string>(() => {
    if (!position.totalLPInvestVolume || !position.totalLPDivestVolume) {
      return "0"
    }

    if (position.isClosed) {
      return normalizeBigNumber(position.totalLPInvestVolume, 18, 6)
    } else {
      const investFixed = FixedNumber.fromValue(
        position.totalLPInvestVolume,
        18
      )
      const divestFixed = FixedNumber.fromValue(
        position.totalLPDivestVolume,
        18
      )
      const res = investFixed.subUnsafe(divestFixed)

      return normalizeBigNumber(ethers.utils.parseEther(res._value), 18, 6)
    }
  }, [position])

  const entryPriceBase = useMemo<BigNumber>(() => {
    if (
      !position ||
      !position.totalUSDInvestVolume ||
      !position.totalLPInvestVolume
    ) {
      return BigNumber.from("0")
    }

    const totalUsdInvestFixed = FixedNumber.fromValue(
      position.totalUSDInvestVolume,
      18
    )
    const totalLpInvestFixed = FixedNumber.fromValue(
      position.totalLPInvestVolume,
      18
    )
    const resFixed = totalUsdInvestFixed.divUnsafe(totalLpInvestFixed)

    return ethers.utils.parseEther(resFixed._value)
  }, [position])

  const entryPriceUSD = useMemo<BigNumber>(() => {
    if (
      !position ||
      !position.totalBaseInvestVolume ||
      !position.totalLPInvestVolume
    ) {
      return BigNumber.from("0")
    }

    const totalBaseInvestFixed = FixedNumber.fromValue(
      position.totalBaseInvestVolume,
      18
    )
    const totalLpInvestFixed = FixedNumber.fromValue(
      position.totalLPInvestVolume,
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
        position.totalBaseDivestVolume,
        18
      )
      const totalLPInvestVolumeFixed = FixedNumber.fromValue(
        position.totalLPInvestVolume,
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
        position.totalUSDDivestVolume,
        18
      )
      const totalLPInvestVolumeFixed = FixedNumber.fromValue(
        position.totalLPInvestVolume,
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
      position.totalBaseDivestVolume,
      18
    )
    const totalBaseInvestVolumeFixed = FixedNumber.fromValue(
      position.totalBaseInvestVolume,
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

  const pnlUSD = useMemo(() => {
    if (!position) {
      return BigNumber.from("0")
    }

    const totalUSDDivestVolumeFixed = FixedNumber.fromValue(
      position.totalUSDDivestVolume,
      18
    )
    const totalUSDInvestVolumeFixed = FixedNumber.fromValue(
      position.totalUSDInvestVolume,
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

  // Commission data
  const commissionPercentage = useMemo(() => {
    if (!poolInfo || !poolInfo.parameters) {
      return "0"
    }

    return normalizeBigNumber(poolInfo.parameters.commissionPercentage, 25, 0)
  }, [poolInfo])

  const commissionPeriod = useMemo(() => {
    if (!poolInfo || !poolInfo.parameters) {
      return ""
    }

    switch (poolInfo.parameters.commissionPeriod) {
      case 0:
        return "1"
      case 1:
        return "3"
      case 2:
        return "12"
      default:
        return ""
    }
  }, [poolInfo])

  const commissionAmount = useMemo(() => {
    if (!fundFeeHistories || fundFeeHistories.length === 0) {
      return "0"
    }

    return normalizeBigNumber(fundFeeHistories[0].fundProfit, 18, 6)
  }, [fundFeeHistories])

  const commissionNextEpoch = useMemo(() => {
    if (!fundFeeHistories || fundFeeHistories.length === 0) {
      return "0"
    }

    return normalizeBigNumber(fundFeeHistories[0].day, 18, 6)
  }, [fundFeeHistories])

  const fundsLockedTotal = useMemo(() => {
    if (!poolInfo || !poolInfo.lpSupply || !poolInfo.lpLockedInProposals) {
      return "0"
    }

    const lpSupplyFixed = FixedNumber.fromValue(poolInfo.lpSupply, 18)
    const lpLockedInProposalsFixed = FixedNumber.fromValue(
      poolInfo.lpLockedInProposals,
      18
    )

    const resFixed = lpSupplyFixed.addUnsafe(lpLockedInProposalsFixed)

    return normalizeBigNumber(ethers.utils.parseEther(resFixed._value), 18, 2)
  }, [poolInfo])

  const fundsLockedInvestor = useMemo(() => {
    if (!poolInfo) return "0"

    return "0"
  }, [poolInfo])

  // get mark price
  useEffect(() => {
    if (!priceFeed) return

    const getmarkPriceOpen = async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      // without extended
      const price = await priceFeed.getNormalizedExtendedPriceOut(
        position.pool.token,
        baseTokenData?.address,
        amount,
        []
      )
      setMarkPriceOpenOpen(price.amountOut)
    }

    getmarkPriceOpen().catch(console.error)
  }, [priceFeed, baseTokenData, position.pool.token])

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

  const onBuyMore = (e?: MouseEvent<HTMLElement>): void => {
    if (e) {
      e.stopPropagation()
    }
    navigate(`/pool/invest/${position.pool.id}`)
  }

  const onClosePosition = (e?: MouseEvent<HTMLElement>): void => {
    if (e) {
      e.stopPropagation()
    }
    navigate(`/pool/ivest/${position.pool.id}`)
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
            <Flex ai="center">
              <Icon
                m="0"
                size={24}
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={position.pool.id}
              />
              <S.Amount>{positionOpenLPAmount}</S.Amount>
              <S.PositionSymbol>{poolInfo?.ticker}</S.PositionSymbol>
              <SharedS.PNL amount={+pnlPercentage.normalized}>
                {Number(pnlPercentage.normalized) > 0 && "+"}
                {pnlPercentage.normalized}%
              </SharedS.PNL>
            </Flex>
            <Flex>
              <S.FundSymbol>{baseTokenData?.symbol}</S.FundSymbol>
              <TokenIcon address={baseTokenData?.address} m="0" size={24} />
            </Flex>
          </SharedS.Head>

          <SharedS.Body>
            <BodyItem
              label={"Entry Price " + baseTokenSymbol}
              amount={entryPriceBase}
              amountUSD={entryPriceUSD}
            />
            <BodyItem
              label={
                (position.isClosed ? "Closed price " : "Current price ") +
                baseTokenSymbol
              }
              amount={markPrice}
              amountUSD={markPriceUSD}
            />
            <BodyItem
              label={`P&L ${baseTokenSymbol}`}
              amount={pnlBase}
              pnl={pnlPercentage.value}
              amountUSD={pnlUSD}
              ai="flex-end"
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
                key={v.id}
                id={v.id}
                isBuy={v.isInvest}
                timestamp={v.timestamp}
                amount={v.volumeBase}
                priceBase={v.volumeLP}
                priceUsd={v.volumeUSD}
                baseTokenSymbol={baseTokenData?.symbol}
                data={v}
              />
            ))
          ) : (
            <Flex full jc="center" p="12px 0">
              <SharedS.WitoutData>No trades</SharedS.WitoutData>
            </Flex>
          )}
        </SharedS.ExtraItem>
        <SharedS.ExtraItem
          initial="hidden"
          animate={showComission ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
          p="16px"
        >
          <AmountRow
            title={`${commissionPeriod} month Performance Fee`}
            value={`${commissionPercentage}%`}
          />
          <AmountRow
            m="14px 0 0"
            title="Performance Fee"
            value={`${commissionAmount}`}
          />
          <AmountRow
            m="14px 0 0"
            title="Date of withdrawal"
            value={commissionNextEpoch}
          />
          <AmountRow
            m="14px 0 0"
            title="Investor funds locked (3%)"
            value={`$${fundsLockedTotal}/$${fundsLockedInvestor}`}
          />
        </SharedS.ExtraItem>
      </SharedS.Container>
    </>
  )
}

const InvestPositionCardWithProvider = (props) => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestPositionCard {...props} />
    </GraphProvider>
  )
}

export default InvestPositionCardWithProvider
