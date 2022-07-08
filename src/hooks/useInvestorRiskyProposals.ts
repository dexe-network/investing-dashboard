import { useQuery } from "urql"
import { IInvestorRiskyProposal } from "constants/interfaces_v2"
import { InvestorRiskyProposalsQuery } from "queries"

function useInvestorRiskyProposals(poolAddressList?: string[]) {
  const [response, executeQuery] = useQuery<{
    proposals: IInvestorRiskyProposal[]
  }>({
    query: InvestorRiskyProposalsQuery,
    variables: { poolAddressList },
  })

  return response.data?.proposals
}

export default useInvestorRiskyProposals
