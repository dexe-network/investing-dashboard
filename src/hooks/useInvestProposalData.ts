import { useQuery } from "urql"
import { IInvestProposal } from "constants/interfaces_v2"
import { InvestProposalQuery } from "queries"

export function useInvestProposalData(
  proposalId?: string
): IInvestProposal | undefined {
  const [response, executeQuery] = useQuery<{
    proposal: IInvestProposal
  }>({
    query: InvestProposalQuery,
    variables: { proposalId },
  })

  return response.data?.proposal
}

export default useInvestProposalData
