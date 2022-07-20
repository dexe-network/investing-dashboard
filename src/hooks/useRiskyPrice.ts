import { useEffect, useState } from "react"
import { BigNumber, ethers, FixedNumber } from "ethers"
import { useRiskyProposal } from "hooks/useRiskyProposals"

function useRiskyPrice(address?: string, index?: string) {
  const [priceUSD, setPriceUSD] = useState(ethers.utils.parseEther("1"))
  const [priceBase, setPriceBase] = useState(ethers.utils.parseEther("1"))
  const [proposalInfo] = useRiskyProposal(address, index)

  useEffect(() => {
    if (!proposalInfo) return
    ;(async () => {
      if (proposalInfo.lp2Supply.gt("0")) {
        const base = FixedNumber.fromValue(proposalInfo.totalProposalBase, 18)
        const usd = FixedNumber.fromValue(proposalInfo.totalProposalUSD, 18)
        const supply = FixedNumber.fromValue(proposalInfo.lp2Supply, 18)

        const usdPrice = usd.divUnsafe(supply)
        const basePrice = base.divUnsafe(supply)
        setPriceUSD(BigNumber.from(usdPrice._hex))
        setPriceBase(BigNumber.from(basePrice._hex))
      }
    })()
  }, [proposalInfo])

  return { priceUSD, priceBase }
}

export default useRiskyPrice
