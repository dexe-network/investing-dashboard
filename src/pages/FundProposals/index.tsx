import { useEffect, useState } from "react"
import { Routes, Route, useParams } from "react-router-dom"

import { ITab } from "constants/interfaces"
import { PoolType } from "constants/interfaces_v2"
import { useTraderPoolRegistryContract } from "hooks/useContract"

import { Flex } from "theme"
import RouteTabs from "components/RouteTabs"
import RiskyPositionCard from "components/cards/position/Risky"
import FundProposalsRisky from "pages/FundProposalsRisky"
import FundProposalsInvest from "pages/FundProposalsInvest"

import S from "./styled"

const positionsList = [
  {
    closed: false,
    id: "adfasdasdfasdf",
    positionToken: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    totalUSDCloseVolume: "0",
    totalUSDOpenVolume: "68474",
    exchanges: [
      {
        fromToken: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
        toToken: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
        fromVolume: "12",
        toVolume: "12",
        day: {
          day: 132414,
        },
      },
    ],
  },
  {
    closed: true,
    id: "adfasdasdfasdf",
    positionToken: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    totalUSDCloseVolume: "0",
    totalUSDOpenVolume: "68474",
    exchanges: [
      {
        fromToken: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
        toToken: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
        fromVolume: "12",
        toVolume: "12",
        day: {
          day: 132414,
        },
      },
    ],
  },
]

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
    <Flex full>
      <S.List>
        {positionsList
          .filter((p) => !p.closed)
          .map((p) => (
            <RiskyPositionCard
              key={p.id}
              position={p}
              poolAddress={poolAddress}
            />
          ))}
      </S.List>
    </Flex>
  )
  const closed = (
    <Flex full>
      <S.List>
        {positionsList
          .filter((p) => p.closed)
          .map((p) => (
            <RiskyPositionCard
              key={p.id}
              position={p}
              poolAddress={poolAddress}
            />
          ))}
      </S.List>
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
