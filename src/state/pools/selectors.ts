import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "state"

const selectPools = (state: AppState) => state.pools

export const selectPoolsFilters = createSelector(
  [selectPools],
  (pools) => pools.filters
)

export const selectBasicPools = createSelector(
  [selectPools],
  (pools) => pools.basicList || []
)

export const selectInvestPools = createSelector(
  [selectPools],
  (pools) => pools.investList || []
)

export const selectBasicPoolByAddress = createSelector(
  [selectPools, (state, address: string) => address],
  (pools, address) => pools.basicList.filter((value) => value.id === address)[0]
)

export const selectInvestPoolByAddress = createSelector(
  [selectPools, (state, address: string) => address],
  (pools, address) =>
    pools.investList.filter((value) => value.id === address)[0]
)

export const selectBasicPoolsBatch = createSelector(
  [selectPools, (state, poolsAddresses: string[]) => poolsAddresses],
  (pools, poolsAddresses) =>
    pools.basicList.filter((value) => poolsAddresses.indexOf(value.id) !== -1)
)

export const selectInvestPoolsBatch = createSelector(
  [selectPools, (state, poolsAddresses: string[]) => poolsAddresses],
  (pools, poolsAddresses) =>
    pools.investList.filter((value) => poolsAddresses.indexOf(value.id) !== -1)
)
