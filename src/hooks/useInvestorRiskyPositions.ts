import { useQuery } from "urql"
import { IInvestorRiskyPositions } from "constants/interfaces_v2"
import { InvestorRiskyPositionsQuery } from "queries"

function useInvestorRiskyPositions(
  poolAddressList?: string[],
  closed?: boolean
) {
  const [response, executeQuery] = useQuery<{
    proposals: IInvestorRiskyPositions[]
  }>({
    query: InvestorRiskyPositionsQuery,
    variables: { poolAddressList, closed },
  })

  return response.data?.proposals
}

export default useInvestorRiskyPositions
