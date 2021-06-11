import { useMemo } from "react"
import { Contract } from "@ethersproject/contracts"
import { TraderPoolFactoryUpgradeable } from "abi"
import { getContract } from "utils/getContract"
import { useActiveWeb3React } from "hooks"

export default function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTraderPoolFactory(): Contract | null {
  return useContract(
    process.env.REACT_APP_TRADER_POOL_FACTORY_UPGRADEABLE,
    TraderPoolFactoryUpgradeable
  )
}
