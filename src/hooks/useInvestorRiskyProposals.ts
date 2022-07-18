import { useEffect, useMemo, useState } from "react"

import { useActiveWeb3React } from "hooks"
import { getContract } from "utils/getContract"
import { RiskyProposal } from "constants/interfaces_v2"
import { TraderPool, TraderPoolRiskyProposal } from "abi"

interface IProposalData {
  proposal: RiskyProposal
  poolAddress: string
}

function useInvestorRiskyProposals(
  activePools?: string[]
): [IProposalData[], boolean] {
  const { library, account } = useActiveWeb3React()
  const [proposals, setProposals] = useState<any[]>([])
  const [fetched, setFetched] = useState<boolean>(false)

  const lastPool = useMemo(() => {
    if (!activePools) return ""
    return activePools[activePools.length - 1]
  }, [activePools])

  useEffect(() => {
    if (
      fetched ||
      !activePools ||
      activePools.length === 0 ||
      !library ||
      !account
    ) {
      return
    }

    ;(async () => {
      let payload: any[] = []

      for (const poolAddress of activePools) {
        const traderPool = await getContract(
          poolAddress,
          TraderPool,
          library,
          account
        )
        const proposalAddress = await traderPool.proposalPoolAddress()

        const proposalPool = getContract(
          proposalAddress,
          TraderPoolRiskyProposal,
          library,
          account
        )
        const data = await proposalPool.getProposalInfos(0, 100)

        const dataWithPoolAddress = data.map((p) => ({
          poolAddress,
          proposal: p,
        }))

        if (data && data.length > 0) {
          payload = [...payload, ...dataWithPoolAddress]
        }
        if (poolAddress === lastPool) setFetched(true)
      }
      setProposals(payload)
    })()
  }, [account, activePools, fetched, lastPool, library, proposals])

  return [proposals, fetched]
}

export default useInvestorRiskyProposals
