import { useEffect, useMemo, useState } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { RotateSpinner } from "react-spinners-kit"

import Header from "components/Header/Layout"
import PositionCard from "components/PositionCard"
import ProposeToInvestModal from "modals/ProposeToInvest"

import RiskyProposals from "pages/RiskyProposals"

import { usePoolPositions } from "state/pools/hooks"
import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"
import { useTraderPoolContract } from "hooks/useContract"

import { Container, List, LoaderContainer } from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const Open = () => {
  const { account } = useActiveWeb3React()
  const { poolAddress } = useParams()
  const traderPool = useTraderPoolContract(poolAddress)
  const [, poolInfo] = usePoolContract(poolAddress)
  const data = usePoolPositions(poolAddress, false)

  const [isInvestorHaveLP, setIsInvestorHaveLP] = useState(false)
  const [showProposeToInvest, setShowProposeToInvest] = useState(false)

  const isPoolTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo.parameters.trader
  }, [account, poolInfo])

  useEffect(() => {
    if (isPoolTrader || !traderPool) return
    ;(async () => {
      const claimedAmountBigNumber = await traderPool?.balanceOf(account)
      setIsInvestorHaveLP(!claimedAmountBigNumber.isZero())
    })()
  }, [account, isPoolTrader, traderPool])

  useEffect(() => {
    setShowProposeToInvest(!isPoolTrader && !isInvestorHaveLP)
  }, [isPoolTrader, isInvestorHaveLP])

  if (!data || !poolInfo) {
    return (
      <LoaderContainer>
        <RotateSpinner />
      </LoaderContainer>
    )
  }

  return (
    <>
      <List>
        {(data?.positions || []).map((position) => (
          <PositionCard
            baseTokenAddress={data?.baseToken}
            ticker={data?.ticker}
            descriptionURL={data?.descriptionURL}
            key={position.id}
            position={position}
            isPoolTrader={isPoolTrader}
          />
        ))}
        {showProposeToInvest && (
          <ProposeToInvestModal
            positionCount={data?.positions.length}
            poolAddress={poolAddress}
            ticker={poolInfo?.ticker}
          />
        )}
      </List>
    </>
  )
}

const Closed = () => {
  const { account } = useActiveWeb3React()
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, true)
  const [, poolInfo] = usePoolContract(poolAddress)

  const isPoolTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo.parameters.trader
  }, [account, poolInfo])

  return (
    <>
      <List>
        {(data?.positions || []).map((position) => (
          <PositionCard
            baseTokenAddress={data?.baseToken}
            ticker={data?.ticker}
            descriptionURL={data?.descriptionURL}
            poolAddress={poolAddress}
            key={position.id}
            position={position}
            isPoolTrader={isPoolTrader}
          />
        ))}
      </List>
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
      <RiskyProposals />
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
            source: `/fund-positions/${poolAddress}/proposals/open`,
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
          <Route path="proposals/*" element={proposals}></Route>
          <Route path="closed" element={closed}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default FundPositions
