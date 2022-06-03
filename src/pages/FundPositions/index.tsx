import Header from "components/Header/Layout"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import PositionCard from "components/PositionCard"
import RiskyCard from "components/RiskyCard"

import { usePoolPositions } from "state/pools/hooks"
import { useERC20 } from "hooks/useContract"
import useRiskyProposals from "hooks/useRiskyProposals"
import { usePoolContract } from "hooks/usePool"

import { Container, List } from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

const Open = () => {
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, false)
  const [, baseData] = useERC20(data?.baseToken)

  return (
    <>
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
    </>
  )
}

const Proposals = () => {
  const { poolAddress } = useParams()
  const [, poolInfo] = usePoolContract(poolAddress)
  const navigate = useNavigate()
  const proposals = useRiskyProposals(poolAddress)

  const handleCardClick = (index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

  return (
    <>
      {proposals.map((position, index) => (
        <RiskyCard
          onClick={() => handleCardClick(index)}
          baseTokenAddress={poolInfo?.parameters.baseToken}
          fundSymbol={poolInfo?.ticker}
          description={poolInfo?.parameters.descriptionURL}
          positionAddress={position.proposalInfo.token}
          key={position.proposalInfo.token}
        />
      ))}
    </>
  )
}

const Closed = () => {
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, true)

  return (
    <>
      {(data?.positions || []).map((position) => (
        <PositionCard
          baseToken={data?.baseToken}
          ticker={data?.ticker}
          description={data?.descriptionURL}
          poolAddress={poolAddress}
          key={position.id}
          position={position}
        />
      ))}
    </>
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
