import { useQuery } from "urql"
import { IRiskyPositionExchanges } from "constants/interfaces_v2"
import { RiskyProposalExchangesQuery } from "queries"

function useRiskyPositionExchanges(address?: string) {
  const [response, executeQuery] = useQuery<{
    proposalExchangeHistories: IRiskyPositionExchanges[]
  }>({
    query: RiskyProposalExchangesQuery,
    variables: { address },
  })

  return response.data?.proposalExchangeHistories
}

export default useRiskyPositionExchanges
