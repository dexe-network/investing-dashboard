import { useNavigate } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import RiskyProposalTraderCard from "components/cards/proposal/RiskyTrader"
import { usePoolContract } from "hooks/usePool"

import S from "./styled"

const FundProposalsRisky = ({ data, poolAddress }) => {
  const navigate = useNavigate()
  const [, poolInfo] = usePoolContract(poolAddress)

  const handleRiskyCardClick = (poolAddress, index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

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
          onInvest={() => handleRiskyCardClick(proposal.basicPool.id, index)}
        />
      ))}
    </>
  )
}

export default FundProposalsRisky
