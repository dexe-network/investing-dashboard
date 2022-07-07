import { FC } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { PulseSpinner } from "react-spinners-kit"

import { ITab } from "constants/interfaces"

import RouteTabs from "components/RouteTabs"
import Proposals from "./Proposals"
import Positions from "./Positions"

import S from "./styled"
import useRiskyProposals from "hooks/useRiskyProposals"

const poolClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

const FundProposalsRisky: FC = () => {
  const { poolAddress } = useParams()

  const data = useRiskyProposals(poolAddress)

  const tabs: ITab[] = [
    {
      title: "Risk proposals",
      source: `/fund-positions/${poolAddress}/proposals/open`,
    },
    {
      title: "Positions",
      source: `/fund-positions/${poolAddress}/proposals/positions`,
    },
    {
      title: "Closed",
      source: `/fund-positions/${poolAddress}/proposals/closed`,
    },
  ]

  if (!data) {
    return (
      <S.PageLoading full ai="center" jc="center">
        <PulseSpinner />
      </S.PageLoading>
    )
  }

  const open = <Proposals data={data.proposals} />
  const positions = <Positions data={data.proposals} closed={false} />
  const closed = <Positions data={data.proposals} closed />

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

const FundProposalsRiskyWithPorvider = () => {
  return (
    <GraphProvider value={poolClient}>
      <FundProposalsRisky />
    </GraphProvider>
  )
}

export default FundProposalsRiskyWithPorvider
