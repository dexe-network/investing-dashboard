import { useState, useEffect } from "react"
import { Pool, BasicPoolHistory } from "constants/interfaces_v2"
import { poolTypes } from "constants/index"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { TraderPoolRegistry } from "abi"
import useContract from "hooks/useContract"
import { useQuery } from "urql"

const BasicPoolQuery = `
  query BasiPool{
    basicPools(first: 100 orderBy: creatingTime) {
      id
      creatingTime
      priceHistory(orderBy: seconds, orderDirection:desc) {
        price
        supply
        poolBase
        seconds
        loss
      }
    }
  }
`

import { addPools, setFilter } from "state/pools/actions"
import { BigNumber, ethers } from "ethers"

export function usePoolsFilters(): [
  AppState["pools"]["filters"],
  (name: string, value: string) => void
] {
  const filters = useSelector((state: AppState) => state.pools.filters)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  return [filters, handleChange]
}

const generateBasicPoolQueryData = (data): BasicPoolHistory => {
  return {
    id: data.id,
    creatingTime: data.creatingTime,
    priceHistory: data.priceHistory,
  }
}

const getPriceLP = (base: string, emission: string): string => {
  if (
    !base ||
    !emission ||
    emission.toString() === "0" ||
    base.toString() === "0"
  )
    return "1"
  return (Number(base) / Number(emission)).toString()
}

const calculatePNL = (CP: number, SP: number) => {
  // calculate profit
  if (SP > CP) {
    const profit = SP - CP
    const profitPercent = ((profit / CP) * 100).toFixed(2)
    CP = 1
    return profitPercent
  }

  // calculate loss
  if (SP < CP) {
    const loss = CP - SP
    const lossPercent = ((loss / CP) * 100).toFixed(2)
    CP = 1
    return -lossPercent
  }

  // price not changed
  if (SP === CP) {
    CP = 1
    return 0
  }
  return 0
}

const genPNL = (price) => {
  return calculatePNL(1, parseFloat(price))
}

const getPriceStable = (stable: string, emission: string): string => {
  if (
    !stable ||
    !emission ||
    emission.toString() === "0" ||
    stable.toString() === "0"
  )
    return "1"
  return (Number(stable) / Number(emission)).toString()
}

const generatePoolsData = (
  address,
  poolInfos,
  leverageInfos,
  history
): Pool => {
  const lpPrice = getPriceLP(
    history.priceHistory[history.priceHistory.length - 1].poolBase,
    history.priceHistory[history.priceHistory.length - 1].supply
  )

  return {
    address,
    name: poolInfos.name,
    ticker: poolInfos.ticker,

    openPositions: poolInfos.openPositions,
    baseAndPositionBalances: poolInfos.baseAndPositionBalances.toString(),
    totalInvestors: poolInfos.totalInvestors.toString(),
    totalPoolBase: poolInfos.totalPoolBase.toString(),
    lpEmission: poolInfos.lpEmission.toString(),
    lpPrice,
    lpPnl: genPNL(lpPrice),
    stablePrice: getPriceStable(
      leverageInfos.totalPoolUSD.toString(),
      history.priceHistory[history.priceHistory.length - 1].supply
    ),

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
    history: generateBasicPoolQueryData(history),
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
  const [basiPoolQueryData, reexecuteQuery] = useQuery({
    query: BasicPoolQuery,
  })
  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  useEffect(() => {
    if (
      !traderPoolRegistry ||
      !basiPoolQueryData ||
      !basiPoolQueryData.data?.basicPools ||
      basiPoolQueryData.fetching ||
      !dispatch
    )
      return
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
                basicPools.leverageInfos[i],
                basiPoolQueryData.data.basicPools[i]
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
  }, [traderPoolRegistry, basiPoolQueryData, dispatch])

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
