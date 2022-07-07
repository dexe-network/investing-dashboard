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

  if (!data) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  return (
    <>
      {data.proposals.map((proposal, index) => (
        <InvestProposalCard
          key={proposal.id}
          proposal={proposal}
          poolAddress={data.id}
          onInvest={() => handleInvestCardClick(index)}
        />
      ))}
    </>
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
