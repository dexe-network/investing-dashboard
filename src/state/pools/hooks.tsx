import { useState, useEffect } from "react"
import { Pool } from "constants/interfaces_v2"
import { poolTypes } from "constants/index"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { TraderPoolRegistry } from "abi"
import useContract from "hooks/useContract"

import { addPools, setFilter } from "state/pools/actions"

export function usePoolsFilters(): [
  AppState["pools"]["filters"],
  (name: string, value: string) => void
] {
  const filters = useSelector((state: AppState) => state.pools.filters)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  return [filters, handleChange]
}

const generatePoolsData = (address, poolInfos, leverageInfos): Pool => {
  console.log(poolInfos, leverageInfos)

  return {
    address,
    name: poolInfos.name,
    ticker: poolInfos.ticker,

    openPositions: poolInfos.openPositions,
    baseAndPositionBalances: poolInfos.baseAndPositionBalances.toString(),
    totalInvestors: poolInfos.totalInvestors.toString(),
    totalPoolBase: poolInfos.totalPoolBase.toString(),
    lpEmission: poolInfos.lpEmission.toString(),

    parameters: {
      baseToken: poolInfos.parameters.baseToken,
      trader: poolInfos.parameters.trader,
      baseTokenDecimals: poolInfos.parameters.baseTokenDecimals.toString(),
      comissionPercentage: poolInfos.parameters.commissionPercentage.toString(),
      comissionPeriod: poolInfos.parameters.comissionPeriod,
      descriptionURL: poolInfos.parameters.descriptionURL,
      minimalInvestment: poolInfos.parameters.minimalInvestment.toString(),
      privatePool: poolInfos.parameters.privatePool,
      totalLPEmission: poolInfos.parameters.totalLPEmission.toString(),
    },
    leverageInfo: {
      freeLeverageBase: leverageInfos.freeLeverageBase.toString(),
      freeLeverageUSD: leverageInfos.freeLeverageUSD.toString(),
      totalPoolUSD: leverageInfos.totalPoolUSD.toString(),
      traderLeverageUSDTokens: leverageInfos.traderLeverageUSDTokens.toString(),
    },
  }
}

// TODO: move loading to redux state
// @return list of loaded pools
// @return loading indicator of pools
// @return loadMore function to start fetching new batch of pools
export function usePools(): [Pool[], boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const traderPoolRegistryAddress = useSelector(
    (state: AppState) => state.contracts.TraderPoolRegistry
  )
  const pools = useSelector((state: AppState) => state.pools.list)

  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  useEffect(() => {
    if (!traderPoolRegistry || !dispatch) return
    ;(async () => {
      try {
        const basicPoolsLength = await traderPoolRegistry.countPools(
          poolTypes.basic
        )
        const investPoolsLength = await traderPoolRegistry.countPools(
          poolTypes.invest
        )

        const basicPools = await traderPoolRegistry.listPoolsWithInfo(
          poolTypes.basic,
          0,
          basicPoolsLength
        )
        const investPools = await traderPoolRegistry.listPoolsWithInfo(
          poolTypes.invest,
          0,
          investPoolsLength
        )
        console.log(basicPools)
        dispatch(
          addPools(
            basicPools.pools.map((address, i) =>
              generatePoolsData(
                address,
                basicPools.poolInfos[i],
                basicPools.leverageInfos[i]
              )
            )
          )
        )
        setLoading(false)
        console.log(basicPools, investPools)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [traderPoolRegistry, dispatch])

  const handleMore = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      // TODO: handle more for current list
      // setPools([...pools, ...Pools])
      setLoading(false)
    }, 1300)
  }

  return [pools, loading, handleMore]
}
