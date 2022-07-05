import { useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"

import InvestProposalCard from "components/cards/proposal/Invest"
import { usePoolContract } from "hooks/usePool"
import useInvestProposals from "hooks/useInvestProposals"
import useRiskyProposals from "hooks/useRiskyProposals"
import S from "./styled"

const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundProposalsInvest = () => {
  const navigate = useNavigate()
  const { poolAddress } = useParams()

  const [, poolInfo] = usePoolContract(poolAddress)
  // const proposals = useInvestProposals(poolAddress)
  const proposals = [
    {
      id: "as;flkajsd;kflasf",
      poolAddress,
      proposalInfo: {
        token: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
      },
    },
  ]

  const handleInvestCardClick = (index) => {
    navigate(`/invest-risky-proposal/${poolAddress}/${index}`)
  }

  if (!poolAddress || !poolInfo || !proposals) {
    return <>Loading</>
  }

  return (
    <S.Content>
      {proposals.map((proposal, index) => (
        <InvestProposalCard
          key={proposal.id}
          proposal={proposal}
          poolAddress={poolAddress}
          onInvest={() => handleInvestCardClick(index)}
        />
      ))}
    </S.Content>
  )
}

const FundProposalsInvestWithPorvider = () => {
  return (
    <GraphProvider value={AllPoolsClient}>
      <FundProposalsInvest />
    </GraphProvider>
  )
}

export default FundProposalsInvestWithPorvider
