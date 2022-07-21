import { FC } from "react"
import { PulseSpinner } from "react-spinners-kit"

import useInvestorRiskyProposals from "hooks/useInvestorRiskyProposals"
import RiskyProposalInvestorCard from "components/cards/proposal/RiskyInvestor"
import S from "./styled"

interface IProps {
  activePools: string[]
}

const InvestmentRiskyProposalsList: FC<IProps> = ({ activePools }) => {
  const [proposals, fetched] = useInvestorRiskyProposals(activePools)

  if (!fetched) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (fetched && proposals && proposals.length === 0) {
    return (
      <S.Content>
        <S.WithoutData>No proposal yet</S.WithoutData>
      </S.Content>
    )
  }

  return (
    <>
      <S.List>
        {proposals.map((p, i) => (
          <RiskyProposalInvestorCard
            key={p.poolAddress + i}
            proposal={p.proposal}
            proposalId={i}
            poolAddress={p.poolAddress}
          />
        ))}
      </S.List>
    </>
  )
}

export default InvestmentRiskyProposalsList
