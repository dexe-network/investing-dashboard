import { useEffect, useState } from "react"
import { InvestProposal } from "constants/interfaces_v2"
import { useInvestProposalContract } from "hooks/useContract"

function useInvestProposals(poolAddress?: string): InvestProposal[] {
  const [proposals, setProposals] = useState<InvestProposal[]>([])

  const [traderPoolInvestProposal] = useInvestProposalContract(poolAddress)

  useEffect(() => {
    if (!traderPoolInvestProposal) return
    ;(async () => {
      const data = await traderPoolInvestProposal.getProposalInfos(0, 100)
      setProposals(data)
    })()
  }, [traderPoolInvestProposal])

  return proposals
}

export function useInvestProposal(
  poolAddress?: string,
  index?: string
): InvestProposal | undefined {
  const [proposal, setProposal] = useState<InvestProposal | undefined>()
  const [traderPoolInvestProposal] = useInvestProposalContract(poolAddress)

  useEffect(() => {
    if (!traderPoolInvestProposal || !index) return
    ;(async () => {
      try {
        const data = await traderPoolInvestProposal.getProposalInfos(
          index,
          parseFloat(index) + 1
        )
        setProposal(data[0])
      } catch (e) {
        console.log(e)
      }
    })()
  }, [index, traderPoolInvestProposal])

  return proposal
}

export default useInvestProposals
