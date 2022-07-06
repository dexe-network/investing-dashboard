import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"

import { usePriceFeedContract } from "hooks/useContract"

interface IParams {
  tokenAddress: string | undefined
}

export default function useTokenPriceOutUSD({
  tokenAddress,
}: IParams): BigNumber {
  const priceFeed = usePriceFeedContract()

  const [markPriceUSD, setMarkPriceUSD] = useState(BigNumber.from("0"))

  useEffect(() => {
    if (!priceFeed || !tokenAddress || tokenAddress.length !== 42) return
    ;(async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      const priceUSD = await priceFeed
        ?.getNormalizedPriceOutUSD(tokenAddress, amount.toHexString())
        .catch(console.error)

      if (!!priceUSD) {
        setMarkPriceUSD(priceUSD?.amountOut.toString())
      }
    })()
  }, [tokenAddress, priceFeed])

  return markPriceUSD
}
