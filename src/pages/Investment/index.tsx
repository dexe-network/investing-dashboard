import { Routes, Route } from "react-router-dom"

import { ITab } from "constants/interfaces"

import InvestmentPositions from "pages/InvestmentPositions"
import InvestmentRiskyProposals from "pages/InvestmentRiskyProposals"
import InvestmentInvestProposals from "pages/InvestmentInvestProposals"

import Header from "components/Header/Layout"

import { Container } from "./styled"

const InvestPositions = () => {
  const tabs: ITab[] = [
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
  ]

  return (
    <>
      <Header tabs={tabs}>My investment</Header>
      <Container>
        <Routes>
          <Route path="positions/*" element={<InvestmentPositions />}></Route>
          <Route
            path="risk-proposals/*"
            element={<InvestmentRiskyProposals />}
          ></Route>
          <Route
            path="invest-proposals/*"
            element={<InvestmentInvestProposals />}
          ></Route>
        </Routes>
      </Container>
    </>
  )
}

export default InvestPositions
