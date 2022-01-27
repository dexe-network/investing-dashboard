import { createSelector } from "@reduxjs/toolkit"
import { Pool } from "constants/interfaces_v2"

import { AppState } from "state"

const selectPools = (state: AppState) => state.pools

// TODO: refactor to normalized state
export const selectBasicPoolByAddress = createSelector(
  [
    // Usual first input - extract value from `state`
    selectPools,
    (state, address: string) => address,
  ],
  // Output selector gets (`items, category)` as args
  (pools, address) => pools.list.filter((value) => value.address === address)[0]
)
