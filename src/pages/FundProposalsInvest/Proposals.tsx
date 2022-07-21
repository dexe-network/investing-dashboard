import { useParams } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"
import { createClient, Provider as GraphProvider } from "urql"

import useInvestProposals from "hooks/useInvestmentProposals"
import InvestProposalCard from "components/cards/proposal/Invest"
import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_INVEST_POOLS_API_URL || "",
})

const FundProposalsInvest = () => {
  const { poolAddress } = useParams()

  const proposals = useInvestProposals(poolAddress)

  if (!poolAddress || !proposals) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (proposals && proposals.length === 0) {
    return (
      <S.Content>
        <S.WithoutData>No proposals</S.WithoutData>
      </S.Content>
    )
  }

  return (
    <S.Container>
      {proposals.map((proposal, index) => (
        <InvestProposalCard
          key={index}
          proposal={proposal}
          poolAddress={poolAddress}
        />
      ))}
    </S.Container>
  )
}

const FundProposalsInvestWithProvider = (props) => {
  return (
    <GraphProvider value={poolsClient}>
      <FundProposalsInvest {...props} />
    </GraphProvider>
  )
}

export default FundProposalsInvestWithProvider
