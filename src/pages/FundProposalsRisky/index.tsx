import { useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import useRiskyProposals from "hooks/useRiskyProposals"

import RiskyProposalCard from "components/cards/proposal/Risky"

import S from "./styled"

const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundProposalsRisky = () => {
  const navigate = useNavigate()
  const { poolAddress } = useParams()

  const proposals = useRiskyProposals(poolAddress)

  const handleRiskyCardClick = (index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

  if (!poolAddress || !proposals) {
    return <>Loading</>
  }

  return (
    <S.Content>
      {proposals.map((proposal, index) => (
        <RiskyProposalCard
          key={proposal.proposalInfo.token}
          proposal={proposal}
          poolAddress={poolAddress}
          onInvest={() => handleRiskyCardClick(index)}
        />
      ))}
    </S.Content>
  )
}

const FundProposalsRiskyWithPorvider = () => {
  return (
    <GraphProvider value={AllPoolsClient}>
      <FundProposalsRisky />
    </GraphProvider>
  )
}

export default FundProposalsRiskyWithPorvider
