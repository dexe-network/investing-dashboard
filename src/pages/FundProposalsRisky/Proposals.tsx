import { useNavigate } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import RiskyProposalTraderCard from "components/cards/proposal/RiskyTrader"
import { usePoolContract } from "hooks/usePool"

import S from "./styled"

const FundProposalsRisky = ({ data, poolAddress }) => {
  const navigate = useNavigate()
  const [, poolInfo] = usePoolContract(poolAddress)

  if (!poolInfo) {
    return (
      <S.ListLoading full ai="center" jc="center">
        <PulseSpinner />
      </S.ListLoading>
    )
  }

  return (
    <>
      {data.map((proposal, index) => (
        <RiskyProposalTraderCard
          key={proposal.token}
          proposal={proposal}
          proposalId={index}
          poolAddress={poolAddress}
          poolInfo={poolInfo}
        />
      ))}
    </>
  )
}

export default FundProposalsRisky
