import { useState, useEffect } from "react"
import {
  IPoolQuery,
  PoolType,
  LeverageInfo,
  PoolInfo,
  UsersInfo,
  IPriceHistoryQuery,
  IPriceHistory,
} from "constants/interfaces_v2"
import { poolTypes } from "constants/index"
import { Contract } from "@ethersproject/contracts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { TraderPoolRegistry, TraderPool } from "abi"
import useContract from "hooks/useContract"
import { useQuery } from "urql"
import {
  OwnedPoolsQuery,
  PoolQuery,
  PoolsQuery,
  PriceHistoryQuery,
} from "queries"
import { addPools, setFilter, setPagination } from "state/pools/actions"
import { selectPoolsFilters } from "./selectors"
import { selectTraderPoolRegistryAddress } from "state/contracts/selectors"
import { isAddress } from "utils"

/**
 * Returns top members filter state variables and setter
 */
export function usePoolsFilters(): [
  AppState["pools"]["filters"],
  (name: string, value: string) => void
] {
  const filters = useSelector(selectPoolsFilters)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  return [filters, handleChange]
}

/**
 * Returns owned pools data
 */
export function useOwnedPools(
  address: string | null | undefined
): [IPoolQuery[], boolean] {
  const [pools, setPools] = useState<IPoolQuery[]>([])

  const [pool] = useQuery<{
    traderPools: IPoolQuery[]
  }>({
    pause: !isAddress(address),
    query: OwnedPoolsQuery,
    variables: { address },
  })

  useEffect(() => {
    if (pool.fetching || pool.error || !pool.data) return
    setPools(pool.data.traderPools)
  }, [pool])

  return [pools, pool.fetching]
}

/**
 * Returns contract info about the pool
 */
export function usePool(
  address: string | undefined
): [
  Contract | null,
  IPoolQuery | undefined,
  LeverageInfo | null,
  PoolInfo | null
] {
  const traderPool = useContract(address, TraderPool)
  const [leverageInfo, setLeverageInfo] = useState<LeverageInfo | null>(null)
  const [poolInfo, setPoolInfo] = useState<PoolInfo | null>(null)

  const [pool] = useQuery<{
    traderPool: IPoolQuery
  }>({
    pause: !isAddress(address),
    query: PoolQuery,
    variables: { address },
  })

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const leverage = await traderPool?.getLeverageInfo()
      const poolInfo = await traderPool?.getPoolInfo()
      setPoolInfo(poolInfo)
      setLeverageInfo(leverage)
    })()
  }, [traderPool])

  return [traderPool, pool.data?.traderPool, leverageInfo, poolInfo]
}

/**
 * Returns map of pool price history
 */
export function usePriceHistory(
  address: string | undefined
): IPriceHistory[] | undefined {
  const [history, setHistory] = useState<IPriceHistory[] | undefined>(undefined)
  const [pool] = useQuery<{
    traderPool: IPriceHistoryQuery
  }>({
    query: PriceHistoryQuery,
    variables: { address },
  })

  useEffect(() => {
    if (
      !pool ||
      !pool.data ||
      !pool.data.traderPool ||
      !pool.data.traderPool.priceHistory
    )
      return

    setHistory(pool.data.traderPool.priceHistory)
  }, [pool])

  return history
}

// Hook that handles fetching and storing pools
// @param poolType - type of pool to fetch (all, basic, invest)
// @return loading indicator of pools
// @return loadMore function to start fetching new batch of pools
export function usePools(poolType: PoolType): [boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const filters = useSelector(selectPoolsFilters)

  const traderPoolRegistryAddress = useSelector(selectTraderPoolRegistryAddress)
  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  const [response, executeQuery] = useQuery<{
    traderPools: IPoolQuery[]
  }>({
    query: PoolsQuery,
    variables: { q: filters.query },
  })

  // update data on search change
  useEffect(() => {
    executeQuery()
  }, [filters.query, executeQuery])

  // Fetch total number of pools
  useEffect(() => {
    if (!traderPoolRegistry || !dispatch) return
    ;(async () => {
      const basicPoolsLength = await traderPoolRegistry.countPools(
        poolTypes.basic
      )
      dispatch(
        setPagination({
          name: "total",
          type: "BASIC_POOL",
          value: Number(basicPoolsLength.toString()),
        })
      )
      const investPoolsLength = await traderPoolRegistry.countPools(
        poolTypes.invest
      )
      dispatch(
        setPagination({
          name: "total",
          type: "INVEST_POOL",
          value: Number(investPoolsLength.toString()),
        })
      )
    })()
  }, [traderPoolRegistry, dispatch])

  // Store pools to redux
  useEffect(() => {
    if (!response || !response.data || response.fetching || !dispatch) return

    dispatch(
      addPools({
        data: response.data?.traderPools,
        type: poolType,
      })
    )
    setLoading(false)
  }, [response, dispatch, poolType])

  const handleMore = () => {
    // TODO: handle more for current list
  }

  return [loading, handleMore]
}
