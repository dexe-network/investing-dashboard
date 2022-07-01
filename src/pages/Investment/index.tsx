import { Routes, Route } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import { ITab } from "constants/interfaces"

import InvestmentPositions from "pages/InvestmentPositions"

import Header from "components/Header/Layout"
import RouteTabs from "components/RouteTabs"

import { Container } from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const PageItem = ({ children }) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "16px",
    height: "-webkit-fill-available",
    color: "white",
  }
  return (
    <div style={styles}>
      <span>{children}</span>
    </div>
  )
}

const RiskyProposals = () => {
  const tabs: ITab[] = [
    {
      title: "Risk proposals",
      source: `/investment/risk-proposals/open`,
    },
    {
      title: "Risk positions",
      source: `/investment/risk-proposals/positions`,
    },
    {
      title: "Closed",
      source: `/investment/risk-proposals/closed`,
    },
  ]

  return (
    <>
      <RouteTabs tabs={tabs} />
      <Routes>
        <Route
          path="open"
          element={
            <PageItem>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Risky proposals open
              </h1>
            </PageItem>
          }
        ></Route>
        <Route
          path="positions"
          element={
            <PageItem>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Risky proposals positions
              </h1>
            </PageItem>
          }
        ></Route>
        <Route
          path="closed"
          element={
            <PageItem>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Risky proposals closed
              </h1>
            </PageItem>
          }
        ></Route>
      </Routes>
    </>
  )
}

const InvestmentProposals = () => {
  const tabs: ITab[] = [
    {
      title: "New",
      source: `/investment/invest-proposals/new`,
    },
    {
      title: "Invested",
      source: `/investment/invest-proposals/invested`,
    },
  ]
  return (
    <>
      <RouteTabs tabs={tabs} />
      <Routes>
        <Route
          path="new"
          element={
            <PageItem>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Investment proposals new
              </h1>
            </PageItem>
          }
        ></Route>
        <Route
          path="invested"
          element={
            <PageItem>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Investment proposals invested
              </h1>
            </PageItem>
          }
        ></Route>
      </Routes>
    </>
  )
}

const InvestPositions = () => {
  const risky = (
    <GraphProvider value={poolsClient}>
      <RiskyProposals />
    </GraphProvider>
  )

  const invest = (
    <GraphProvider value={poolsClient}>
      <InvestmentProposals />
    </GraphProvider>
  )

  return (
    <>
      <Header
        tabs={[
          {
            title: "My positions",
            source: "/investment/positions/open",
            activeSource: [
              "/investment/positions/open",
              "/investment/positions/closed",
            ],
          },
          {
            title: "Risk proposals",
            source: "/investment/risk-proposals/open",
            activeSource: [
              "/investment/risk-proposals/open",
              "/investment/risk-proposals/positions",
              "/investment/risk-proposals/closed",
            ],
          },
          {
            title: "Investment",
            source: `/investment/invest-proposals/new`,
            activeSource: [
              "/investment/invest-proposals/new",
              "/investment/invest-proposals/invested",
            ],
          },
        ]}
      >
        My investment
      </Header>
      <Container>
        <Routes>
          <Route path="positions/*" element={<InvestmentPositions />}></Route>
          <Route path="risk-proposals/*" element={risky}></Route>
          <Route path="invest-proposals/*" element={invest}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default InvestPositions
