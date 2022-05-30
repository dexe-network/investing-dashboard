import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BigNumber, ethers } from "ethers"

import { PriceFeed } from "abi"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import useContract from "hooks/useContract"

interface IParams {
  tokenAddress: string | undefined
}

export default function useTokenPriceOutUSD({
  tokenAddress,
}: IParams): BigNumber {
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [markPriceUSD, setMarkPriceUSD] = useState(BigNumber.from(0))

  useEffect(() => {
    if (!priceFeed || !tokenAddress || tokenAddress.length !== 42) return
    ;(async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      const priceUSD = await priceFeed
        ?.getNormalizedPriceOutUSD(tokenAddress, amount.toHexString())
        .catch(console.error)

      setMarkPriceUSD(priceUSD?.amountOut.toString())
    })()
  }, [tokenAddress, priceFeed])

  return markPriceUSD
}
