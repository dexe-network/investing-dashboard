import Header from "components/Header/Layout"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import PositionCard from "components/PositionCard"
import RiskyCard from "components/RiskyCard"

import { usePool, usePoolPositions } from "state/pools/hooks"
import useContract, { useERC20 } from "hooks/useContract"

import { Container, List } from "./styled"
import { TraderPool, TraderPoolRiskyProposal } from "abi"
import { useEffect, useState } from "react"
import { RiskyProposal } from "constants/interfaces_v2"

const poolsClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

const Open = () => {
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, false)
  const [, baseData] = useERC20(data?.baseToken)

  return (
    <List>
      {(data?.positions || []).map((position) => (
        <PositionCard
          baseSymbol={baseData?.symbol}
          baseToken={data?.baseToken}
          ticker={data?.ticker}
          description={data?.descriptionURL}
          key={position.id}
          position={position}
        />
      ))}
    </List>
  )
}

const Proposals = () => {
  const { poolAddress } = useParams()
  const [, , , poolInfo] = usePool(poolAddress)
  const navigate = useNavigate()

  const [proposalAddress, setProposalAddress] = useState("")
  const [proposals, setProposals] = useState<RiskyProposal[]>([])

  const traderPool = useContract(poolAddress, TraderPool)
  const traderPoolRiskyProposal = useContract(
    proposalAddress,
    TraderPoolRiskyProposal
  )

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const address = await traderPool.proposalPoolAddress()
      setProposalAddress(address)
    })()
  }, [traderPool])

  useEffect(() => {
    if (!traderPoolRiskyProposal) return
    ;(async () => {
      const data = await traderPoolRiskyProposal.getProposalInfos(0, 100)
      setProposals(data)
    })()
  }, [traderPoolRiskyProposal])

  const handleCardClick = () => {
    navigate(`/invest-risky-proposal/${poolAddress}`)
  }

  return (
    <List>
      {proposals.map((position) => (
        <RiskyCard
          onClick={handleCardClick}
          baseTokenAddress={poolInfo?.parameters.baseToken}
          fundSymbol={poolInfo?.ticker}
          description={poolInfo?.parameters.descriptionURL}
          positionAddress={position.proposalInfo.token}
          key={position.proposalInfo.token}
        />
      ))}
    </List>
  )
}

const Closed = () => {
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, true)

  return (
    <List>
      {(data?.positions || []).map((position) => (
        <PositionCard
          baseToken={data?.baseToken}
          ticker={data?.ticker}
          description={data?.descriptionURL}
          key={position.id}
          position={position}
        />
      ))}
    </List>
  )
}

const FundPositions = () => {
  const { poolAddress } = useParams()

  const open = (
    <GraphProvider value={poolsClient}>
      <Open />
    </GraphProvider>
  )

  const proposals = (
    <GraphProvider value={poolsClient}>
      <Proposals />
    </GraphProvider>
  )

  const closed = (
    <GraphProvider value={poolsClient}>
      <Closed />
    </GraphProvider>
  )

  return (
    <>
      <Header
        tabs={[
          {
            title: "Open positions",
            source: `/fund-positions/${poolAddress}/open`,
          },
          {
            title: "Proposals",
            source: `/fund-positions/${poolAddress}/proposals`,
          },
          {
            title: "Closed positions",
            source: `/fund-positions/${poolAddress}/closed`,
          },
        ]}
      >
        Fund Positions
      </Header>
      <Container>
        <Routes>
          <Route path="open" element={open}></Route>
          <Route path="proposals" element={proposals}></Route>
          <Route path="closed" element={closed}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default FundPositions
