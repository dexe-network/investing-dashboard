import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TraderPoolRegistry } from "abi"
import { useQuery } from "urql"
import { ethers, FixedNumber } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"

import useContract from "hooks/useContract"
import { AppDispatch, AppState } from "state"
import { addPools, setFilter, setPagination } from "state/pools/actions"
import { selectPoolsFilters } from "state/pools/selectors"
import { selectTraderPoolRegistryAddress } from "state/contracts/selectors"

import { poolTypes } from "constants/index"

import { isAddress } from "utils"

import {
  IPoolQuery,
  PoolType,
  IPriceHistoryQuery,
  IPriceHistory,
  IPositionQuery,
} from "constants/interfaces_v2"

import {
  OwnedPoolsQuery,
  PriceHistoryQuery,
  BasicPositionsQuery,
  getPoolsQueryVariables,
} from "queries"
import { useTraderPool } from "hooks/usePool"

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

export function usePoolPrice(address: string | undefined) {
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

// Hook that handles fetching and storing pools
// @param poolType - type of pool to fetch (all, basic, invest)
// @return loading indicator of pools
// @return loadMore function to start fetching new batch of pools
export function usePools(poolType: PoolType): [boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const isAll = poolType === "ALL_POOL"

  const filters = useSelector(selectPoolsFilters)

  const queryArgs = getPoolsQueryVariables(isAll, filters, poolType)

  const traderPoolRegistryAddress = useSelector(selectTraderPoolRegistryAddress)
  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  const [response] = useQuery<{
    traderPools: IPoolQuery[]
  }>(queryArgs)

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

export function usePoolPositions(address?: string, closed = false) {
  const [response, executeQuery] = useQuery<{
    basicPool: IPositionQuery
  }>({
    query: BasicPositionsQuery,
    variables: { address, closed },
  })

  return response.data?.basicPool
}
