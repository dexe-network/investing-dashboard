import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"

import { usePriceFeedContract } from "hooks/useContract"

interface IParams {
  tokenAddress: string | undefined
  amount?: BigNumber
}

export default function useTokenPriceOutUSD({
  tokenAddress,
  amount,
}: IParams): BigNumber {
  const priceFeed = usePriceFeedContract()

  const [markPriceUSD, setMarkPriceUSD] = useState(BigNumber.from("0"))

  useEffect(() => {
    if (!priceFeed || !tokenAddress || tokenAddress.length !== 42) return
    ;(async () => {
      const _amount = amount ?? ethers.utils.parseUnits("1", 18)

      const priceUSD = await priceFeed
        ?.getNormalizedPriceOutUSD(tokenAddress, _amount.toHexString())
        .catch(console.error)

      if (!!priceUSD) {
        setMarkPriceUSD(priceUSD?.amountOut.toString())
      }
    })()
  }, [tokenAddress, priceFeed, amount])

  return markPriceUSD
}
