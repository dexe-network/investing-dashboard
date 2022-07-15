import { useQuery } from "urql"
import { InvestorRiskyProposalsQuery } from "queries"
import { IInvestorRiskyProposal } from "constants/interfaces_v2"

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
