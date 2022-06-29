import { useEffect, useState } from "react"
import { BigNumber, ethers, FixedNumber } from "ethers"
import { useTraderPool } from "hooks/usePool"

function usePoolPrice(address: string | undefined) {
  const traderPool = useTraderPool(address)
  const [priceUSD, setPriceUSD] = useState(ethers.utils.parseEther("1"))
  const [priceBase, setPriceBase] = useState(ethers.utils.parseEther("1"))

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const poolInfo = await traderPool.getPoolInfo()
      if (poolInfo.lpSupply.gt("0")) {
        const base = FixedNumber.fromValue(poolInfo.totalPoolBase, 18)
        const usd = FixedNumber.fromValue(poolInfo.totalPoolUSD, 18)
        const supply = FixedNumber.fromValue(poolInfo.lpSupply, 18)

        const usdPrice = usd.divUnsafe(supply)
        const basePrice = base.divUnsafe(supply)
        setPriceUSD(BigNumber.from(usdPrice._hex))
        setPriceBase(BigNumber.from(basePrice._hex))
      }
    })()
  }, [traderPool])

  return { priceUSD, priceBase }
}

export default usePoolPrice
