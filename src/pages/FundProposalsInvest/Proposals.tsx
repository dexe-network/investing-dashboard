import { useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { PulseSpinner } from "react-spinners-kit"

import useInvestProposals from "hooks/useInvestProposals"

import InvestProposalCard from "components/cards/proposal/Invest"
import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_INVEST_POOLS_API_URL || "",
})

const FundProposalsInvest = () => {
  const navigate = useNavigate()
  const { poolAddress } = useParams()

  const data = useInvestProposals(poolAddress)

  const handleInvestCardClick = (index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

  if (!data || !data.proposals) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (data && data.proposals && data.proposals.length === 0) {
    return (
      <S.Content>
        <S.WithoutData>No proposals</S.WithoutData>
      </S.Content>
    )
  }

  return (
    <S.Container>
      {data.proposals.map((proposal, index) => (
        <InvestProposalCard
          key={proposal.id}
          proposal={proposal}
          onInvest={() => handleInvestCardClick(index)}
        />
      ))}
    </S.Container>
  )
}

const FundProposalsInvestWithPorvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <FundProposalsInvest />
    </GraphProvider>
  )
}

export default FundProposalsInvestWithPorvider
