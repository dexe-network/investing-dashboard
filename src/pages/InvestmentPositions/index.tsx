import { Routes, Route } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import RouteTabs from "components/RouteTabs"
import InvestmentPositionsList from "./InvestmentPositionsList"

import { ITab } from "constants/interfaces"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const InvestmentPositions = () => {
  const tabs: ITab[] = [
    {
      title: "Open",
      source: `/investment/positions/open`,
    },
    {
      title: "Closed",
      source: `/investment/positions/closed`,
    },
  ]

  return (
    <>
      <RouteTabs tabs={tabs} />
      <Routes>
        <Route
          path="open"
          element={<InvestmentPositionsList closed={false} />}
        ></Route>
        <Route
          path="closed"
          element={<InvestmentPositionsList closed={true} />}
        ></Route>
      </Routes>
    </>
  )
}

const InvestmentPositionsWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestmentPositions />
    </GraphProvider>
  )
}

export default InvestmentPositionsWithProvider
