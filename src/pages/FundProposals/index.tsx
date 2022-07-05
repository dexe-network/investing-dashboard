import { useEffect, useState } from "react"
import { Routes, Route, useParams } from "react-router-dom"

import { ITab } from "constants/interfaces"
import { PoolType } from "constants/interfaces_v2"
import { useTraderPoolRegistryContract } from "hooks/useContract"

import { Flex } from "theme"
import RouteTabs from "components/RouteTabs"
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

  const tabs: ITab[] = [
    {
      title: "Risk proposals",
      source: `/fund-positions/${poolAddress}/proposals/open`,
    },
    {
      title: "Risk positions",
      source: `/fund-positions/${poolAddress}/proposals/positions`,
    },
    {
      title: "Closed",
      source: `/fund-positions/${poolAddress}/proposals/closed`,
    },
  ]

  if (!poolAddress) {
    return <>Loading</>
  }

  const open =
    poolType === "BASIC_POOL" ? <FundProposalsRisky /> : <FundProposalsInvest />

  const positions = (
    <Flex>
      <span style={{ color: "red" }}>Risky positions open</span>
    </Flex>
  )
  const closed = (
    <Flex>
      <span style={{ color: "red" }}>Risky positions closed</span>
    </Flex>
  )

  return (
    <>
      {poolType === "BASIC_POOL" && <RouteTabs tabs={tabs} />}
      <S.Content withExtraTabs={poolType === "BASIC_POOL"}>
        <Routes>
          <Route path="open" element={open}></Route>
          {poolType === "BASIC_POOL" && (
            <>
              <Route path="positions" element={positions}></Route>
              <Route path="closed" element={closed}></Route>
            </>
          )}
        </Routes>
      </S.Content>
    </>
  )
}

export default FundProposals
