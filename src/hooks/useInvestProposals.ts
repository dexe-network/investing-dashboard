import { useEffect, useState } from "react"
import { RiskyProposal } from "constants/interfaces_v2"
import { InvestTraderPool, TraderPoolRiskyProposal } from "abi"
import useContract from "hooks/useContract"

function useInvestProposals(poolAddress?: string): RiskyProposal[] {
  const [proposalAddress, setProposalAddress] = useState("")
  const [proposals, setProposals] = useState<RiskyProposal[]>([])

  const investPool = useContract(poolAddress, InvestTraderPool)
  const traderPoolRiskyProposal = useContract(
    proposalAddress,
    TraderPoolRiskyProposal
  )

  useEffect(() => {
    if (!investPool) return
    ;(async () => {
      const address = await investPool.proposalPoolAddress()
      setProposalAddress(address)
    })()
  }, [investPool])

  useEffect(() => {
    if (!traderPoolRiskyProposal) return
    ;(async () => {
      const data = await traderPoolRiskyProposal.getProposalInfos(0, 100)
      setProposals(data)
    })()
  }, [traderPoolRiskyProposal])

  return proposals
}

export function useInvestProposal(
  poolAddress?: string,
  index?: string
): RiskyProposal | undefined {
  const proposals = useInvestProposals(poolAddress)

  if (!index) {
    return undefined
  }

  return proposals[index]
}

export default useInvestProposals
