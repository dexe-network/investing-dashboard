import { createSelector } from "@reduxjs/toolkit"
import { Pool } from "constants/interfaces_v2"

import { AppState } from "state"

const selectPools = (state: AppState) => state.pools

// TODO: refactor to normalized state
export const selectBasicPools = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
  ],
  // Output selector gets (`items, category)` as args
  (pools) => pools.basicList || []
)

// TODO: refactor to normalized state
export const selectInvestPools = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
  ],
  // Output selector gets (`items, category)` as args
  (pools) => pools.investList || []
)

// TODO: refactor to normalized state
export const selectBasicPoolByAddress = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
    (state, address: string) => address,
  ],
  // Output selector gets (`items, category)` as args
  (pools, address) =>
    pools.basicList.filter((value) => value.address === address)[0]
)

// TODO: refactor to normalized state
export const selectInvestPoolByAddress = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
    (state, address: string) => address,
  ],
  // Output selector gets (`items, category)` as args
  (pools, address) =>
    pools.investList.filter((value) => value.address === address)[0]
)

// TODO: refactor to normalized state
export const selectBasicPoolsBatch = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
    (state, poolsAddresses: string[]) => poolsAddresses,
  ],
  // Output selector gets (`items, category)` as args
  (pools, poolsAddresses) =>
    pools.basicList.filter(
      (value) => poolsAddresses.indexOf(value.address) !== -1
    )
)

// TODO: refactor to normalized state
export const selectInvestPoolsBatch = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
    (state, poolsAddresses: string[]) => poolsAddresses,
  ],
  // Output selector gets (`items, category)` as args
  (pools, poolsAddresses) =>
    pools.investList.filter(
      (value) => poolsAddresses.indexOf(value.address) !== -1
    )
)
