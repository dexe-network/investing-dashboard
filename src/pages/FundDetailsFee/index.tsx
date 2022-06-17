import { FC, useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useDispatch } from "react-redux"

import { expandTimestamp, formatBigNumber } from "utils"
import { parsePoolData } from "utils/ipfs"
import { usePoolContract, usePoolQuery } from "hooks/usePool"
import useContract, { useERC20 } from "hooks/useContract"
import { useAddToast } from "state/application/hooks"
import { TraderPool } from "abi"
import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import Icon from "components/Icon"
import Button from "components/Button"
import ProfitLossChart from "components/ProfitLossChart"

import { Flex } from "theme"
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
  const dispatch = useDispatch()
  const { poolAddress } = useParams()
  const { account } = useWeb3React()

  const [poolData] = usePoolQuery(poolAddress)
  const [, poolInfoData] = usePoolContract(poolAddress)
  const [, baseData] = useERC20(poolData?.baseToken)
  const traderPool = useContract(poolData?.id, TraderPool)

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfoData?.parameters.descriptionURL
  )

  console.log("poolData", poolData)
  console.log("poolInfoData", poolInfoData)
  console.log("baseData", baseData)

  const addTransaction = useTransactionAdder()
  const addToast = useAddToast()

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
    if (!baseData) return ""

    return baseData.symbol
  }, [baseData])

  const onPerformanceFeeRequest = () => {
    console.log("Request Performance Fee")
  }

  if (!poolData || !poolInfoData || !poolMetadata) {
    return <PageLoading />
  }

  return (
    <>
      <Container>
        <FeeDateCard>
          <FeeDateText>
            Performance Fee {commissionPercentage}% are available from Jun
            12,2022
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

          <ProfitLossChart address={poolAddress} />

          <Flex full m="24px 0 0">
            <Button onClick={onPerformanceFeeRequest} full size="large">
              Request Performance Fee
            </Button>
          </Flex>
        </MainCard>
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
