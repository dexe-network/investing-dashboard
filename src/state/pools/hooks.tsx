import { useState, useEffect } from "react"
import { Pool } from "constants/interfaces_v2"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"

import { setFilter } from "state/pools/actions"
import Pools from "./data"

export function usePoolsFilters(): [
  AppState["pools"]["filters"],
  (name: string, value: string) => void
] {
  const filters = useSelector((state: AppState) => state.pools.filters)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  return [filters, handleChange]
}

export function usePools(): [
  { all: Pool[]; risk: Pool[] },
  boolean,
  () => void
] {
  const [pools, setPools] = useState<{ all: Pool[]; risk: Pool[] }>({
    all: [],
    risk: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setPools({ all: Pools, risk: Pools.slice(0, 4) })
      setLoading(false)
    }, 1000)
  }, [])

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
