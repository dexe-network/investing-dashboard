import { useInvestProposal } from "hooks/useInvestmentProposals"
import usePoolIcon from "hooks/usePoolIcon"
import { useMemo } from "react"
import { useInvestProposalMetadata } from "state/ipfsMetadata/hooks"

export interface DividendToken {
  icon: JSX.Element
  symbol?: string
  name?: string
}

const useRequestDividend = (poolAddress: string, proposalId: string) => {
  const [poolIcon, poolInfo] = usePoolIcon(poolAddress, 38)
  const proposal = useInvestProposal(poolAddress, proposalId)
  const [{ investProposalMetadata }] = useInvestProposalMetadata(
    poolAddress,
    proposal?.proposalInfo.descriptionURL
  )

  const token: DividendToken = useMemo(() => {
    return {
      icon: poolIcon,
      symbol: investProposalMetadata?.ticker,
      name: poolInfo?.name,
    }
  }, [poolIcon, poolInfo, investProposalMetadata])

  return { token }
}

export default useRequestDividend
