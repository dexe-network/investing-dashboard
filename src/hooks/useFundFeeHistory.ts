import { useQuery } from "urql"
import { IFundFeeHistory } from "constants/interfaces_v2"
import { FundFeeHistoryQuery } from "queries"

function useFundFeeHistory(address?: string) {
  const [response, executeQuery] = useQuery<{
    feeHistories: IFundFeeHistory[]
  }>({
    query: FundFeeHistoryQuery,
    variables: { address },
  })

  return response.data?.feeHistories
}

export default useFundFeeHistory
