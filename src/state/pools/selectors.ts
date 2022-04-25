import { createSelector } from "@reduxjs/toolkit"
import { poolTypes } from "constants/index"
import { AppState } from "state"

const selectPoolsState = (state: AppState) => state.pools

export const selectPoolsFilters = createSelector(
  [selectPoolsState],
  (pools) => pools.filters
)

export const selectTotalBasicPools = createSelector(
  [selectPoolsState],
  (pools) => pools.pagination.BASIC_POOL.total
)

export const selectTotalInvestPools = createSelector(
  [selectPoolsState],
  (pools) => pools.pagination.INVEST_POOL.total
)

export const selectPools = createSelector(
  [selectPoolsState],
  (pools) => pools[poolTypes.all] || []
)

export const selectBasicPools = createSelector(
  [selectPoolsState],
  (pools) => pools[poolTypes.basic] || []
)

export const selectInvestPools = createSelector(
  [selectPoolsState],
  (pools) => pools[poolTypes.invest] || []
)

export const selectBasicPoolByAddress = createSelector(
  [selectPools, (state, address: string | undefined) => address],
  (pools, address) =>
    pools[poolTypes.basic].filter((value) => value.id === address)[0]
)

export const selectInvestPoolByAddress = createSelector(
  [selectPools, (state, address: string | undefined) => address],
  (pools, address) =>
    pools[poolTypes.invest].filter((value) => value.id === address)[0]
)
