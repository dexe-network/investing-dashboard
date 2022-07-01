import { Routes, Route, Link } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import Header from "components/Header/Layout"
import { Container } from "./styled"
import { ITab } from "constants/interfaces"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const TabList = ({ tabs }: { tabs: ITab[] }) => {
  return (
    <div style={{ display: "flex" }}>
      {tabs.map((t) => (
        <Link key={t.source} to={t.source}>
          {t.title}
        </Link>
      ))}
    </div>
  )
}

const PageItem = ({ children }) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "-webkit-fill-available",
    color: "white",
  }
  return (
    <div style={styles}>
      <span>{children}</span>
    </div>
  )
}

const Positions = () => {
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
      <h1 style={{ color: "white", textAlign: "center" }}>Positions</h1>
      <TabList tabs={tabs} />
      <Routes>
        <Route path="open" element={<PageItem>open</PageItem>}></Route>
        <Route path="closed" element={<PageItem>closed</PageItem>}></Route>
      </Routes>
    </>
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
      <h1 style={{ color: "white", textAlign: "center" }}>Risky proposals</h1>
      <TabList tabs={tabs} />
      <Routes>
        <Route path="open" element={<PageItem>live</PageItem>}></Route>
        <Route
          path="positions"
          element={<PageItem>positions</PageItem>}
        ></Route>
        <Route path="closed" element={<PageItem>closed</PageItem>}></Route>
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
      <h1 style={{ color: "white", textAlign: "center" }}>
        Investment proposals
      </h1>
      <TabList tabs={tabs} />
      <Routes>
        <Route path="new" element={<PageItem>new</PageItem>}></Route>
        <Route path="invested" element={<PageItem>invested</PageItem>}></Route>
      </Routes>
    </>
  )
}

const InvestPositions = () => {
  const open = (
    <GraphProvider value={poolsClient}>
      <Positions />
    </GraphProvider>
  )

  const proposals = (
    <GraphProvider value={poolsClient}>
      <RiskyProposals />
    </GraphProvider>
  )

  const closed = (
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
          <Route path="positions/*" element={open}></Route>
          <Route path="risk-proposals/*" element={proposals}></Route>
          <Route path="invest-proposals/*" element={closed}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default InvestPositions
