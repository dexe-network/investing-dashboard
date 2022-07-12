import { useNavigate } from "react-router-dom"

import RiskyProposalCard from "components/cards/proposal/Risky"

const FundProposalsRisky = ({ data }) => {
  const navigate = useNavigate()

  const handleRiskyCardClick = (poolAddress, index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

  return (
    <>
      {data.map((proposal, index) => (
        <RiskyProposalCard
          key={proposal.token}
          proposal={proposal}
          onInvest={() => handleRiskyCardClick(proposal.basicPool.id, index)}
        />
      ))}
    </>
  )
}

export default FundProposalsRisky
