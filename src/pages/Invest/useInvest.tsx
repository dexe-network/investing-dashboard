import { useCallback, useEffect, useState } from "react"
import { BigNumber } from "ethers"
import { usePoolContract, useTraderPool } from "hooks/usePool"
import { getAllowance } from "utils"
import { useWeb3React } from "@web3-react/core"

// useInvest hook posibilities
// @param poolAddress: string
// @param direction: deposit | withdraw
const useInvest = (
  poolAddress: string | undefined,
  direction: "deposit" | "withdraw"
) => {
  const { account, library } = useWeb3React()
  const traderPool = useTraderPool(poolAddress)
  const [, poolInfo] = usePoolContract(poolAddress)

  const [allowance, setAllowance] = useState<BigNumber | null>(null)

  const fetchAndUpdateAllowance = useCallback(async () => {
    if (!account || !library || !poolAddress || !poolInfo) return

    const allowance = await getAllowance(
      account,
      poolInfo?.parameters.baseToken,
      poolAddress,
      library
    )
    console.log("allowance", allowance.toString())
    setAllowance(allowance)
  }, [account, library, poolAddress, poolInfo])

  // fetch allowance on mount
  useEffect(() => {
    fetchAndUpdateAllowance().catch(console.error)
  }, [fetchAndUpdateAllowance])

  return [{ allowance }]
}

export default useInvest
