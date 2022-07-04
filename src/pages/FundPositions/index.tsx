import { Routes, Route, useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import Header from "components/Header/Layout"

import FundProposals from "pages/FundProposals"
import FundPositionsList from "./FundPositionsList"

import S from "./styled"

const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundPositions = () => {
  const { poolAddress } = useParams()

  const open = (
    <GraphProvider value={AllPoolsClient}>
      <FundPositionsList closed={false} />
    </GraphProvider>
  )

  const closed = (
    <GraphProvider value={AllPoolsClient}>
      <FundPositionsList closed={true} />
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
            activeSource: [
              `/fund-positions/${poolAddress}/proposals/open`,
              `/fund-positions/${poolAddress}/proposals/positions`,
              `/fund-positions/${poolAddress}/proposals/closed`,
            ],
          },
          {
            title: "Closed positions",
            source: `/fund-positions/${poolAddress}/closed`,
          },
        ]}
      >
        Fund Positions
      </Header>
      <S.Container>
        <Routes>
          <Route path="open" element={open}></Route>
          <Route path="proposals/*" element={<FundProposals />}></Route>
          <Route path="closed" element={closed}></Route>
        </Routes>
      </S.Container>
    </>
  )
}

export default FundPositions
