import { useQuery } from "urql"
import { IRiskyProposalQuery } from "constants/interfaces_v2"
import { RiskyProposalsQuery } from "queries"

function useRiskyPositions(address?: string, closed?: boolean) {
  const [response, executeQuery] = useQuery<{
    basicPool: IRiskyProposalQuery
  }>({
    query: RiskyProposalsQuery,
    variables: { address, closed },
  })

  return response.data?.basicPool.proposals
}

export default useRiskyPositions
