import { Routes, Route } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import { ITab } from "constants/interfaces"

import InvestmentPositions from "pages/InvestmentPositions"
import InvestmentRiskyProposals from "pages/InvestmentRiskyProposals"

import RouteTabs from "components/RouteTabs"
import Header from "components/Header/Layout"
import InvestProposalCard from "components/cards/proposal/Invest"

import { Container, List } from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const InvestmentProposals = () => {
  const poolAddress = "0x8a9424745056Eb399FD19a0EC26A14316684e274"

  const proposals = [
    {
      id: "as;flkajsd;kflasf",
      poolAddress,
      proposalInfo: {
        token: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
      },
      closed: false,
      invested: false,
    },
    {
      id: "as1389047123908kflasf",
      poolAddress,
      proposalInfo: {
        token: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
      },
      closed: true,
      invested: true,
    },
  ]

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
            <List withExtraTabs>
              {proposals
                .filter((p) => p.invested)
                .map((proposal) => (
                  <InvestProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    poolAddress={poolAddress}
                    onInvest={() => console.log("invest")}
                  />
                ))}
            </List>
          }
        ></Route>
        <Route
          path="invested"
          element={
            <List withExtraTabs>
              {proposals
                .filter((p) => !p.invested)
                .map((proposal) => (
                  <InvestProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    poolAddress={poolAddress}
                    onInvest={() => console.log("invest")}
                  />
                ))}
            </List>
          }
        ></Route>
      </Routes>
    </>
  )
}

const InvestPositions = () => {
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
          <Route
            path="risk-proposals/*"
            element={<InvestmentRiskyProposals />}
          ></Route>
          <Route path="invest-proposals/*" element={invest}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default InvestPositions
