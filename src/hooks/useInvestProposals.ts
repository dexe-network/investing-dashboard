import { useQuery } from "urql"
import { IInvestProposalQuery, IInvestProposal } from "constants/interfaces_v2"
import { InvestProposalsQuery } from "queries"

function useInvestProposals(address?: string) {
  const [response, executeQuery] = useQuery<{
    investPool: IInvestProposalQuery
  }>({
    query: InvestProposalsQuery,
    variables: { address },
  })

  return response.data?.investPool
}
export function useInvestProposal(
  poolAddress?: string,
  index?: string
): IInvestProposal | undefined {
  const proposals = useInvestProposals(poolAddress)

  if (!index || !proposals) {
    return undefined
  }

  return proposals[index]
}

export default useInvestProposals
