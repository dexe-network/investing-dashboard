import { useParams } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import useInvestProposals from "hooks/useInvestmentProposals"
import InvestProposalCard from "components/cards/proposal/Invest"
import S from "./styled"

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
          proposalId={index}
          proposal={proposal}
          poolAddress={poolAddress}
        />
      ))}
    </S.Container>
  )
}

export default FundProposalsInvest
