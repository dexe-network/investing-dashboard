import { useState, useEffect } from "react"
import { IBasicPoolQuery } from "constants/interfaces_v2"
import { poolTypes } from "constants/index"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { TraderPoolRegistry } from "abi"
import useContract from "hooks/useContract"
import { useQuery } from "urql"
import {
  BasicPoolQuery,
  BasicPoolQueryByName,
  BasicPoolQueryByTicker,
  InvestPoolQuery,
} from "queries"
import {
  addBasicPools,
  addInvestPools,
  setFilter,
  setPagination,
} from "state/pools/actions"
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

// TODO: move loading to redux state
// @return loading indicator of pools
// @return loadMore function to start fetching new batch of pools
export function useBasicPools(): [boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const traderPoolRegistryAddress = useSelector(selectTraderPoolRegistryAddress)
  const filters = useSelector(selectPoolsFilters)

  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  const [basicPoolsQueryData, executeQuery] = useQuery<{
    basicPools: IBasicPoolQuery[]
  }>({
    query: filters.query.length ? BasicPoolQueryByTicker : BasicPoolQuery,
    variables: { q: filters.query },
  })

  useEffect(() => {
    executeQuery()
  }, [filters.query, executeQuery])

  useEffect(() => {
    if (
      !traderPoolRegistry ||
      !basicPoolsQueryData ||
      !basicPoolsQueryData.data ||
      !basicPoolsQueryData.data.basicPools.length ||
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

        dispatch(addBasicPools(basicPoolsQueryData.data?.basicPools))
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

  return [loading, handleMore]
}

// TODO: move loading to redux state
// @return list of loaded pools
// @return loading indicator of pools
// @return loadMore function to start fetching new batch of pools
export function useInvestPools(): [boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const [investPoolsQueryData] = useQuery<{
    investPools: IBasicPoolQuery[]
  }>({
    query: InvestPoolQuery,
  })

  const traderPoolRegistryAddress = useSelector(selectTraderPoolRegistryAddress)
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

        dispatch(addInvestPools(investPoolsQueryData.data?.investPools))
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

  return [loading, handleMore]
}
