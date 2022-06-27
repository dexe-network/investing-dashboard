import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "state"

const selectGasState = (state: AppState) => state.gas

export const selectGasByChain = (chainId) =>
  createSelector([selectGasState], (gas) =>
    chainId in gas ? gas[chainId] : null
  )
