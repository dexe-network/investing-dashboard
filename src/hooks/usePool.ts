import { useCallback, useEffect, useState } from "react"
import { Contract } from "@ethersproject/contracts"
import { IPoolQuery, LeverageInfo, PoolInfo } from "constants/interfaces_v2"
import useContract from "hooks/useContract"
import { useQuery } from "urql"
import { isAddress } from "utils"
import { TraderPool } from "abi"
import { PoolQuery } from "queries"

export function useTraderPool(address: string | undefined): Contract | null {
  const traderPool = useContract(address, TraderPool)

  return traderPool
}

/**
 * Returns TheGraph info about the pool
 */
export function usePoolQuery(
  address: string | undefined
): [IPoolQuery | undefined, () => void] {
  const [pool, executeQuery] = useQuery<{
    traderPool: IPoolQuery
  }>({
    pause: !isAddress(address),
    query: PoolQuery,
    variables: { address },
  })

  return [pool.data?.traderPool, executeQuery]
}

/**
 * Returns Contract info about the pool
 */
export function usePoolContract(
  address: string | undefined
): [LeverageInfo | null, PoolInfo | null, () => void] {
  const traderPool = useTraderPool(address)
  const [update, setUpdate] = useState(false)
  const [leverageInfo, setLeverageInfo] = useState<LeverageInfo | null>(null)
  const [poolInfo, setPoolInfo] = useState<PoolInfo | null>(null)

  const fetchUpdate = useCallback(() => {
    setUpdate(!update)
  }, [update])

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const leverage = await traderPool?.getLeverageInfo()
      const poolInfo = await traderPool?.getPoolInfo()
      setPoolInfo(poolInfo)
      setLeverageInfo(leverage)
    })()
  }, [traderPool, update])

  return [leverageInfo, poolInfo, fetchUpdate]
}
