import { useQuery } from "urql"
import { IInvestorProposal } from "constants/interfaces_v2"
import { InvestorPositionsQuery } from "queries"

function useInvestorPositions(address?: string, closed?: boolean) {
  const [response, executeQuery] = useQuery<{
    investorPoolPositions: IInvestorProposal[]
  }>({
    query: InvestorPositionsQuery,
    variables: { address, closed },
  })

  return response.data?.investorPoolPositions
}

export default useInvestorPositions
