import { Routes, Route } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { PulseSpinner } from "react-spinners-kit"

import RouteTabs from "components/RouteTabs"
import InvestmentPositionsList from "./List"

import { ITab } from "constants/interfaces"
import { useActiveWeb3React } from "hooks"

import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_INVESTORS_API_URL || "",
})

const InvestmentPositions = () => {
  const { account } = useActiveWeb3React()

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

  if (!account) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  return (
    <>
      <RouteTabs tabs={tabs} />
      <Routes>
        <Route
          path="open"
          element={<InvestmentPositionsList account={account} closed={false} />}
        ></Route>
        <Route
          path="closed"
          element={<InvestmentPositionsList account={account} closed={true} />}
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
