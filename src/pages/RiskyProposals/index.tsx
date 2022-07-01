import { useMemo } from "react"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import RiskyCard from "components/RiskyCard"
import RouteTabs from "components/RouteTabs"

import { ITab } from "constants/interfaces"

import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"
import useRiskyProposals from "hooks/useRiskyProposals"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import S from "./styled"
import { Flex } from "theme"

const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const RiskyProposals = () => {
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()

  const { poolAddress } = useParams()

  const [, poolInfo] = usePoolContract(poolAddress)
  const proposals = useRiskyProposals(poolAddress)

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )

  const isPoolTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo.parameters.trader
  }, [account, poolInfo])

  const handleCardClick = (index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

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

  if (!poolAddress || !poolInfo || !proposals) {
    return <>Loading</>
  }

  const open = proposals.map((position, index) => (
    <RiskyCard
      key={position.proposalInfo.token}
      poolMetadata={poolMetadata}
      onInvest={() => handleCardClick(index)}
      positionAddress={position.proposalInfo.token}
      poolAddress={poolAddress}
      poolTicker={poolInfo?.ticker}
      isPoolTrader={isPoolTrader}
    />
  ))

  const positions = (
    <Flex>
      <span style={{ color: "red" }}>Risky positions</span>
    </Flex>
  )
  const closed = (
    <Flex>
      <span style={{ color: "red" }}>Closed Risky positions</span>
    </Flex>
  )

  return (
    <>
      <RouteTabs tabs={tabs} />
      <S.Content>
        <Routes>
          <Route path="open" element={open}></Route>
          <Route path="positions" element={positions}></Route>
          <Route path="closed" element={closed}></Route>
        </Routes>
      </S.Content>
    </>
  )
}

const RiskyProposalsWithPorvider = () => {
  return (
    <GraphProvider value={AllPoolsClient}>
      <RiskyProposals />
    </GraphProvider>
  )
}

export default RiskyProposalsWithPorvider
