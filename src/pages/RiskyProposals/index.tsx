import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import RiskyCard from "components/cards/proposal/Risky"
import RouteTabs from "components/RouteTabs"

import { ITab } from "constants/interfaces"

import { usePoolContract } from "hooks/usePool"
import useRiskyProposals from "hooks/useRiskyProposals"

import S from "./styled"
import { Flex } from "theme"

const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const RiskyProposals = () => {
  const navigate = useNavigate()

  const { poolAddress } = useParams()

  const [, poolInfo] = usePoolContract(poolAddress)
  const proposals = useRiskyProposals(poolAddress)

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

  console.log(proposals)

  const open = proposals.map((proposal, index) => (
    <RiskyCard
      key={proposal.proposalInfo.token}
      proposal={proposal}
      poolAddress={poolAddress}
      onInvest={() => handleCardClick(index)}
    />
  ))

  const positions = (
    <Flex>
      <span style={{ color: "red" }}>Risky positions</span>
    </Flex>
  )
  const closed = proposals.map((proposal, index) => (
    <RiskyCard
      key={proposal.proposalInfo.token}
      proposal={proposal}
      poolAddress={poolAddress}
      onInvest={() => handleCardClick(index)}
    />
  ))

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
