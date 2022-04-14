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
import { PoolQuery, PoolsQuery, PriceHistoryQuery } from "queries"
import { addPools, setFilter, setPagination } from "state/pools/actions"
import { selectPoolsFilters } from "./selectors"
import { selectTraderPoolRegistryAddress } from "state/contracts/selectors"

export function usePoolsFilters(): [
  AppState["pools"]["filters"],
  (name: string, value: string) => void
] {
  const filters = useSelector(selectPoolsFilters)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  return [filters, handleChange]
}

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
  const [usersInfo, setUsersInfo] = useState<UsersInfo[] | null>(null)

  const [pool] = useQuery<{
    traderPool: IPoolQuery
  }>({
    query: PoolQuery,
    variables: { address },
  })

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const leverage = await traderPool?.getLeverageInfo()
      const poolInfo = await traderPool?.getPoolInfo()
      const usersInfo = await traderPool?.getUsersInfo(0, 1)
      setPoolInfo(poolInfo)
      setLeverageInfo(leverage)
      setUsersInfo(usersInfo)
    })()
  }, [traderPool])

  return [traderPool, pool.data?.traderPool, leverageInfo, poolInfo]
}

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
          type: "basic",
          value: Number(basicPoolsLength.toString()),
        })
      )
      const investPoolsLength = await traderPoolRegistry.countPools(
        poolTypes.invest
      )
      dispatch(
        setPagination({
          name: "total",
          type: "invest",
          value: Number(investPoolsLength.toString()),
        })
      )
    })()
  }, [traderPoolRegistry, dispatch])

  // Store pools to redux
  useEffect(() => {
    if (
      !response ||
      !response.data ||
      !response.data.traderPools.length ||
      response.fetching ||
      !dispatch
    )
      return

    dispatch(
      addPools({
        data: response.data?.traderPools,
        type: poolType,
      })
    )
    setLoading(false)
  }, [response, dispatch, poolType])

  const handleMore = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      // TODO: handle more for current list
      setLoading(false)
    }, 1300)
  }

  return [loading, handleMore]
}
