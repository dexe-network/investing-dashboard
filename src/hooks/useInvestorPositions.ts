import { useQuery } from "urql"
import { IInvestorProposal } from "constants/interfaces_v2"
import { InvestorProposalsQuery } from "queries"

function useInvestorPositions(address?: string, closed?: boolean) {
  const [response, executeQuery] = useQuery<{
    investorPoolPositions: IInvestorProposal[]
  }>({
    query: InvestorProposalsQuery,
    variables: { address, closed },
  })

  return response.data?.investorPoolPositions
}

export default useInvestorPositions
