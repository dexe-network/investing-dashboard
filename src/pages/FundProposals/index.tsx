import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import { PoolType } from "constants/interfaces_v2"
import { useTraderPoolRegistryContract } from "hooks/useContract"

import FundProposalsRisky from "pages/FundProposalsRisky"
import FundProposalsInvest from "pages/FundProposalsInvest"

import S from "./styled"

const FundProposals = () => {
  const { poolAddress } = useParams()

  const [poolType, setPoolType] = useState<PoolType | null>(null)

  const traderPoolRegistry = useTraderPoolRegistryContract()

  useEffect(() => {
    if (!traderPoolRegistry) return
    ;(async () => {
      const isBase = await traderPoolRegistry.isBasicPool(poolAddress)
      setPoolType(isBase ? "BASIC_POOL" : "INVEST_POOL")
    })()
  }, [traderPoolRegistry, poolAddress])

  if (!poolType) {
    return (
      <S.Container full ai="center" jc="center">
        <PulseSpinner />
      </S.Container>
    )
  }

  return poolType === "BASIC_POOL" ? (
    <FundProposalsRisky />
  ) : (
    <FundProposalsInvest />
  )
}

export default FundProposals
