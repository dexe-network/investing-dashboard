import { useEffect, useState } from "react"

import { RiskyProposal } from "constants/interfaces_v2"
import { TraderPool, TraderPoolRiskyProposal } from "abi"
import useContract from "hooks/useContract"

export function useRiskyProposals(poolAddress?: string): RiskyProposal[] {
  const [proposalAddress, setProposalAddress] = useState("")
  const [proposals, setProposals] = useState<RiskyProposal[]>([])

  const traderPool = useContract(poolAddress, TraderPool)
  const traderPoolRiskyProposal = useContract(
    proposalAddress,
    TraderPoolRiskyProposal
  )

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const address = await traderPool.proposalPoolAddress()
      setProposalAddress(address)
    })()
  }, [traderPool])

  useEffect(() => {
    if (!traderPoolRiskyProposal) return
    ;(async () => {
      const data = await traderPoolRiskyProposal.getProposalInfos(0, 100)
      setProposals(data)
    })()
  }, [traderPoolRiskyProposal])

  return proposals
}

export function useRiskyProposal(
  poolAddress?: string,
  index?: string
): RiskyProposal | undefined {
  const proposals = useRiskyProposals(poolAddress)

  if (!index || !proposals) {
    return undefined
  }

  return proposals[index]
}

export default useRiskyProposals
