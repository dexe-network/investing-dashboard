import { useState, useEffect } from "react"
import { Pool, BasicPoolHistory } from "constants/interfaces_v2"
import { poolTypes } from "constants/index"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { TraderPoolRegistry } from "abi"
import useContract from "hooks/useContract"
import { useQuery } from "urql"

const BasicPoolQuery = `
  query BasicPool{
    basicPools(first: 100 orderBy: creationTime) {
      id
      creationTime
      priceHistory(orderBy: seconds, orderDirection:desc) {
        price
        supply
        poolBase
        seconds
        loss
      }
      investors {
        id
        insurance
        claimedAmount
      }
    }
  }
`

const InvestPoolQuery = `
  query InvestPool{
    investPools(first: 100 orderBy: creationTime) {
      id
      creationTime
      priceHistory(orderBy: seconds, orderDirection:desc) {
        price
        supply
        poolBase
        seconds
        loss
      }
      investors {
        id
        insurance
        claimedAmount
      }
    }
  }
`

import {
  addBasicPools,
  addInvestPools,
  setFilter,
  setPagination,
} from "state/pools/actions"
import { BigNumber, ethers } from "ethers"
import { selectBasicPools, selectInvestPools } from "./selectors"

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
  if (!data)
    return {
      id: "0",
      creationTime: 0,
      priceHistory: {
        loss: "0",
        poolBase: "0",
        supply: "0",
        seconds: 0,
        price: "1",
      },
    }

  return {
    id: data.id,
    creationTime: data.creationTime,
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
  console.log(base, emission, (Number(base) / Number(emission)).toString())
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
  if (price === "0") return 0

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
  const lpPrice = history
    ? getPriceLP(
        history.priceHistory.length
          ? history.priceHistory[history.priceHistory.length - 1].poolBase
          : "0",
        history.priceHistory.length
          ? history.priceHistory[history.priceHistory.length - 1].supply
          : "0"
      )
    : "0"

  return {
    address,
    name: poolInfos.name,
    ticker: poolInfos.ticker,

    openPositions: poolInfos.openPositions,
    baseAndPositionBalances: poolInfos.baseAndPositionBalances.toString(),
    totalInvestors:
      history && history.investors ? history.investors.length.toString() : "0",
    totalPoolBase: poolInfos.totalPoolBase.toString(),
    lpEmission: poolInfos.lpEmission.toString(),
    lpPrice,
    lpPnl: genPNL(lpPrice),
    stablePrice: !!history
      ? getPriceStable(
          leverageInfos.totalPoolUSD.toString(),
          history.priceHistory.length
            ? history.priceHistory[history.priceHistory.length - 1].supply
            : "0"
        )
      : "1",

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
export function useBasicPools(): [Pool[], boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const traderPoolRegistryAddress = useSelector(
    (state: AppState) => state.contracts.TraderPoolRegistry
  )
  const basicPoolsList = useSelector(selectBasicPools)

  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  const [basicPoolsQueryData, reexecuteQuery] = useQuery({
    query: BasicPoolQuery,
  })

  useEffect(() => {
    if (
      !traderPoolRegistry ||
      !basicPoolsQueryData ||
      !basicPoolsQueryData.data?.basicPools ||
      basicPoolsQueryData.fetching ||
      !dispatch
    )
      return
    ;(async () => {
      try {
        const basicPoolsLength = await traderPoolRegistry.countPools(
          poolTypes.basic
        )

        dispatch(
          setPagination({
            name: "total",
            type: "basic",
            value: basicPoolsLength.toString(),
          })
        )

        const basicPools = await traderPoolRegistry.listPoolsWithInfo(
          poolTypes.basic,
          0,
          basicPoolsLength
        )
        console.log(basicPools.poolInfos)

        dispatch(
          addBasicPools(
            basicPools.pools.map((address, i) =>
              generatePoolsData(
                address,
                basicPools.poolInfos[i],
                basicPools.leverageInfos[i],
                basicPoolsQueryData.data.basicPools[i] || null
              )
            )
          )
        )
        setLoading(false)
      } catch (e) {
        // TODO: show error
        console.log(e)
      }
    })()
  }, [traderPoolRegistry, basicPoolsQueryData, dispatch])

  const handleMore = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      // TODO: handle more for current list
      setLoading(false)
    }, 1300)
  }

  return [basicPoolsList, loading, handleMore]
}

// TODO: move loading to redux state
// @return list of loaded pools
// @return loading indicator of pools
// @return loadMore function to start fetching new batch of pools
export function useInvestPools(): [Pool[], boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const [investPoolsQueryData, reexecuteQuery] = useQuery({
    query: InvestPoolQuery,
  })
  const traderPoolRegistryAddress = useSelector(
    (state: AppState) => state.contracts.TraderPoolRegistry
  )
  const investPoolsList = useSelector(selectInvestPools)
  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  useEffect(() => {
    if (
      !traderPoolRegistry ||
      !investPoolsQueryData ||
      !investPoolsQueryData.data?.investPools ||
      investPoolsQueryData.fetching ||
      !dispatch
    )
      return
    ;(async () => {
      try {
        const investPoolsLength = await traderPoolRegistry.countPools(
          poolTypes.invest
        )

        dispatch(
          setPagination({
            name: "total",
            type: "invest",
            value: investPoolsLength.toString(),
          })
        )
        const investPools = await traderPoolRegistry.listPoolsWithInfo(
          poolTypes.invest,
          0,
          investPoolsLength
        )
        dispatch(
          addInvestPools(
            investPools.pools.map((address, i) =>
              generatePoolsData(
                address,
                investPools.poolInfos[i],
                investPools.leverageInfos[i],
                investPoolsQueryData.data.investPools[i] || null
              )
            )
          )
        )
        setLoading(false)
      } catch (e) {
        // TODO: show error
        console.log(e)
      }
    })()
  }, [traderPoolRegistry, investPoolsQueryData, dispatch])

  const handleMore = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      // TODO: handle more for current list
      setLoading(false)
    }, 1300)
  }

  return [investPoolsList, loading, handleMore]
}
