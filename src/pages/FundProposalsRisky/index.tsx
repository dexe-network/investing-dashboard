import { FC } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import { ITab } from "constants/interfaces"

import RouteTabs from "components/RouteTabs"
import Proposals from "./Proposals"
import Positions from "./Positions"

import S from "./styled"
import useRiskyProposals from "hooks/useRiskyProposals"

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
      <S.Content full ai="center" jc="center">
        <PulseSpinner />
      </S.Content>
    )
  }

  if (data && data.length === 0) {
    return (
      <S.Content full ai="center" jc="center">
        <S.WithoutData>No proposals</S.WithoutData>
      </S.Content>
    )
  }

  const open = <Proposals data={data} poolAddress={poolAddress} />
  const positions = <Positions closed={false} poolAddress={poolAddress} />
  const closed = <Positions closed={true} poolAddress={poolAddress} />

  return (
    <>
      <RouteTabs tabs={tabs} />
      <S.Container>
        <Routes>
          <Route path="open" element={open}></Route>
          <Route path="positions" element={positions}></Route>
          <Route path="closed" element={closed}></Route>
        </Routes>
      </S.Container>
    </>
  )
}

export default FundProposalsRisky
