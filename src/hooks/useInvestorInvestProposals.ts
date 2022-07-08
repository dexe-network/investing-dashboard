import { useQuery } from "urql"
import { IInvestorInvestProposal } from "constants/interfaces_v2"
import {
  InvestorInvestProposalsQuery,
  InvestorNewInvestProposalsQuery,
} from "queries"

function useInvestorInvestProposals(
  poolAddressList?: string[],
  invested?: boolean
) {
  const [response, executeQuery] = useQuery<{
    proposals: IInvestorInvestProposal[]
  }>({
    query: invested
      ? InvestorInvestProposalsQuery
      : InvestorNewInvestProposalsQuery,
    variables: { poolAddressList },
  })

  return response.data?.proposals
}

export default useInvestorInvestProposals
