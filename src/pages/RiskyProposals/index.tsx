import { useMemo } from "react"
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom"

import RiskyCard from "components/RiskyCard"

import { ITab } from "constants/interfaces"
import isActiveRoute from "utils/isActiveRoute"
import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"
import useRiskyProposals from "hooks/useRiskyProposals"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import S from "./styled"
import { Flex } from "theme"

const RiskyProposals = () => {
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()

  const { poolAddress } = useParams()
  const { pathname } = useLocation()

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
      <S.Tabs
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tabs.map((tab, tabIndex) => (
          <S.Tab
            key={tabIndex}
            to={tab.source}
            active={isActiveRoute(pathname, tab.source)}
          >
            {tab.title}
            {Boolean(tab.amount) && <S.TabAmount>{tab.amount}</S.TabAmount>}
          </S.Tab>
        ))}
      </S.Tabs>

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

export default RiskyProposals
