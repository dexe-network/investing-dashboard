import { useQuery } from "urql"
import { IInvestorInvestedPools } from "constants/interfaces_v2"
import { InvestorPoolsInvestedForQuery } from "queries"

function useInvestorProposalPools(address?: string, poolType?: string) {
  const [response, executeQuery] = useQuery<{
    investors: IInvestorInvestedPools[]
  }>({
    query: InvestorPoolsInvestedForQuery,
    variables: { address, poolType },
  })

  if (response.data?.investors && response.data?.investors.length === 0) {
    return []
  }

  return response.data?.investors[0].activePools.map((p) => p.id)
}

export default useInvestorProposalPools
