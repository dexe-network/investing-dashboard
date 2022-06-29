import { useEffect, useMemo, useState } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import Header from "components/Header/Layout"
import PositionCard from "components/PositionCard"
import ProposeToInvestModal from "modals/ProposeToInvest"

import RiskyProposals from "pages/RiskyProposals"

import { usePoolPositions } from "state/pools/hooks"
import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"
import { useERC20, useTraderPoolContract } from "hooks/useContract"

import { Container, List } from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

const positions = [
  {
    closed: false,
    id: "slkdfjhasjdklfhaskjdfhask",
    positionToken: "string",
    exchanges: [
      {
        fromToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        toToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        fromVolume: "0x00",
        toVolume: "0x00",
        day: {
          day: 1656320126965,
        },
      },
    ],
  },
  {
    closed: false,
    id: "slkdfjha9678hogkjlfhask",
    positionToken: "string",
    exchanges: [
      {
        fromToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        toToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        fromVolume: "0x00",
        toVolume: "0x00",
        day: {
          day: 1656320126965,
        },
      },
    ],
  },
  {
    closed: false,
    id: "slkdfjhasj0987gik574askjdfhask",
    positionToken: "string",
    exchanges: [
      {
        fromToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        toToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        fromVolume: "0x00",
        toVolume: "0x00",
        day: {
          day: 1656320126965,
        },
      },
    ],
  },
  {
    closed: false,
    id: "sl131313131234567574askjdfhask",
    positionToken: "string",
    exchanges: [
      {
        fromToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        toToken: "0x0c085b4b68261dA18D860F647A33216503b3b26C",
        fromVolume: "0x00",
        toVolume: "0x00",
        day: {
          day: 1656320126965,
        },
      },
    ],
  },
]

const Open = () => {
  const { account } = useActiveWeb3React()
  const { poolAddress } = useParams()
  const traderPool = useTraderPoolContract(poolAddress)
  const [, poolInfo] = usePoolContract(poolAddress)
  const [, baseToken] = useERC20(poolInfo?.parameters.baseToken)
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

  return (
    <>
      <List>
        {positions.map((p) => (
          <PositionCard
            baseSymbol={baseToken?.symbol}
            baseToken={data?.baseToken}
            ticker={data?.ticker}
            description={data?.descriptionURL}
            key={p.id}
            position={p}
            poolAddress={poolAddress}
            isPoolTrader={isPoolTrader}
          />
        ))}

        {(data?.positions || []).map((position) => (
          <PositionCard
            baseSymbol={baseToken?.symbol}
            baseToken={data?.baseToken}
            ticker={data?.ticker}
            description={data?.descriptionURL}
            key={position.id}
            position={position}
            isPoolTrader={isPoolTrader}
          />
        ))}
        {showProposeToInvest && (
          <ProposeToInvestModal
            positionCount={positions.length}
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
      {(data?.positions || []).map((position) => (
        <PositionCard
          baseToken={data?.baseToken}
          ticker={data?.ticker}
          description={data?.descriptionURL}
          poolAddress={poolAddress}
          key={position.id}
          position={position}
          isPoolTrader={isPoolTrader}
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
