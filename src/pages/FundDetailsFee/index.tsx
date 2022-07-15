import { FC, useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useSelector } from "react-redux"

import { formatBigNumber } from "utils"
import { usePoolContract, usePoolQuery } from "hooks/usePool"
import useContract, { useERC20 } from "hooks/useContract"
import { TraderPool, PriceFeed } from "abi"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import useWithdrawalHistory from "hooks/useWithdrawalHistory"

import { Flex } from "theme"

import Icon from "components/Icon"
import Button from "components/Button"
import FeeChart from "components/FeeChart"
import Accordion from "components/Accordion"
import Amount from "components/Amount"
import AmountRow from "components/Amount/Row"

import WithdrawalHistory from "./WithdrawalHistory"

import {
  PageLoading,
  Container,
  FeeDateCard,
  FeeDateText,
  MainCard,
  MainCardTitle,
  MainCardDescription,
  MainCardHeaderRight,
} from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundDetailsFee: FC = () => {
  const { poolAddress } = useParams()
  const { account } = useWeb3React()

  const [poolData] = usePoolQuery(poolAddress)
  const [, poolInfoData] = usePoolContract(poolAddress)
  const [, baseToken] = useERC20(poolData?.baseToken)

  const traderPool = useContract(poolData?.id, TraderPool)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfoData?.parameters.descriptionURL
  )

  const [platformCommissionBase, setPlatformCommissionBase] = useState("0")
  const [traderCommissionBase, setTraderCommissionBase] = useState("0")
  const [fundsUnderManagementDexe, setFundsUnderManagementDexe] = useState("0")

  const withdrawalHistory = useWithdrawalHistory()

  console.groupCollapsed("poolData")
  console.log("Subgraph poolData", poolData)
  console.log("Contranct getPoolInfo", poolInfoData)
  console.groupEnd()

  const fundsUnderManagementBase = useMemo(() => {
    if (!poolInfoData) return "0"

    const { totalPoolBase, traderBase } = poolInfoData

    const _totalPoolBase = ethers.FixedNumber.fromValue(totalPoolBase, 18)
    const _traderBase = ethers.FixedNumber.fromValue(traderBase, 18)

    const result = _totalPoolBase.subUnsafe(_traderBase)

    return ethers.BigNumber.from(result)
  }, [poolInfoData])

  const commissionPercentage = useMemo(() => {
    if (!poolInfoData) return "0"

    return formatBigNumber(poolInfoData?.parameters.commissionPercentage, 25, 0)
  }, [poolInfoData])

  const totalPoolUSD = useMemo(() => {
    if (!poolInfoData) return "0"

    return formatBigNumber(poolInfoData.totalPoolUSD, 18, 2)
  }, [poolInfoData])

  const totalPoolBase = useMemo(() => {
    if (!poolInfoData) return "0"

    return formatBigNumber(poolInfoData.totalPoolBase)
  }, [poolInfoData])

  const baseTokenSymbol = useMemo(() => {
    if (!baseToken) return ""

    return baseToken.symbol
  }, [baseToken])

  /**
   * Get the trader commission for the pool
   */
  const onPerformanceFeeRequest = () => {
    console.log("Request Performance Fee")
  }

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      try {
        const commissions = await traderPool.getReinvestCommissions([0, 1])

        if (commissions.dexeBaseCommission) {
          const platformCommission = formatBigNumber(
            commissions.dexeBaseCommission,
            18,
            6
          )
          setPlatformCommissionBase(platformCommission)
        }

        if (commissions.traderBaseCommission) {
          const traderCommission = formatBigNumber(
            commissions.traderBaseCommission,
            18,
            6
          )

          setTraderCommissionBase(traderCommission)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [traderPool])

  useEffect(() => {
    if (!priceFeed) return
    if (!baseToken || !baseToken.address) return
    if (fundsUnderManagementBase === "0") return
    ;(async () => {
      try {
        const _fundsUnderManagementDexe =
          await priceFeed.getNormalizedPriceOutDEXE(
            baseToken.address,
            fundsUnderManagementBase.toString()
          )

        if (_fundsUnderManagementDexe && _fundsUnderManagementDexe.amountOut) {
          setFundsUnderManagementDexe(
            formatBigNumber(_fundsUnderManagementDexe.amountOut, 18, 3)
          )
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [baseToken, fundsUnderManagementBase, priceFeed])

  if (!poolData || !poolInfoData || !poolMetadata) {
    return <PageLoading />
  }

  return (
    <>
      <Container>
        <FeeDateCard>
          <FeeDateText>
            Performance Fee {commissionPercentage}% are available from -
          </FeeDateText>
        </FeeDateCard>

        <MainCard>
          <Flex dir="row" full>
            <Flex dir="row">
              <Icon
                size={38}
                m="0 8px 0 0"
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={poolData.id}
              />
              <div>
                <MainCardTitle>{poolData.ticker}</MainCardTitle>
                <MainCardDescription m="2px 0 0">
                  {poolData.name}
                </MainCardDescription>
              </div>
            </Flex>
            <MainCardHeaderRight>
              <MainCardTitle>${totalPoolUSD}</MainCardTitle>
              <MainCardDescription m="2px 0 0">
                {totalPoolBase} {baseTokenSymbol}
              </MainCardDescription>
            </MainCardHeaderRight>
          </Flex>

          <FeeChart address={poolAddress} />

          <Flex full dir="column">
            <AmountRow
              title="Funds under management"
              value={fundsUnderManagementDexe}
              symbol="DEXE"
            />
            <Accordion
              title="Fund Profit (Without your funds)"
              value="11.870"
              symbol="USD"
              m="8px 0 0"
            >
              <Flex full dir="column" ai="flex-end">
                <Amount value={"1,187.4"} symbol={"DEXE"} />
                <Amount value={"118,74 %"} m="4px 0 0" />
              </Flex>
            </Accordion>
            <Accordion
              title="Platform Fee"
              value="1,068.66"
              symbol="USD"
              m="8px 0 0"
            >
              <Flex full dir="column" ai="flex-end">
                <Amount
                  value={platformCommissionBase}
                  symbol={baseTokenSymbol}
                />
                <Amount value={"30 %"} m="4px 0 0" />
              </Flex>
            </Accordion>
            <Accordion
              title="Perfomance Fee"
              value="2,493.54"
              symbol="USD"
              m="8px 0 0"
            >
              <Flex full dir="column" ai="flex-end">
                <Amount value={traderCommissionBase} symbol={baseTokenSymbol} />
                <Amount value={`${commissionPercentage} %`} m="4px 0 0" />
              </Flex>
            </Accordion>
            <Accordion
              title="Net Investor Profit"
              value="8,309"
              symbol="USD"
              m="8px 0 0"
            >
              <Flex full dir="column" ai="flex-end">
                <Amount value={"839"} symbol={"DEXE"} />
                <Amount value={"53,11 %"} m="4px 0 0" />
              </Flex>
            </Accordion>
          </Flex>

          <Flex full m="24px 0 0">
            <Button onClick={onPerformanceFeeRequest} full size="large">
              Request Performance Fee
            </Button>
          </Flex>
        </MainCard>

        <Flex dir="column" full m="40px 0 0">
          <WithdrawalHistory payload={withdrawalHistory} />
        </Flex>
      </Container>
    </>
  )
}

export default function FeeWithProvider() {
  return (
    <GraphProvider value={poolsClient}>
      <FundDetailsFee />
    </GraphProvider>
  )
}
