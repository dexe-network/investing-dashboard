import Header from "components/Header/Layout"
import { Routes, Route, useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import PositionCard from "components/PositionCard"

import { usePoolPositions } from "state/pools/hooks"
import { useERC20 } from "hooks/useContract"

import { Container, List } from "./styled"

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
          <Route path="closed" element={closed}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default FundPositions
