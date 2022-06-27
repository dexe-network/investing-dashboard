import { createReducer } from "@reduxjs/toolkit"
import { GasPriceResponse } from "constants/interfaces_v2"
import { updateGasData } from "./actions"

export interface GasState {
  [chainId: number]: GasPriceResponse
}

export const initialState: GasState = {}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateGasData, (state, action) => {
    state[action.payload.chainId] = action.payload.response
  })
)
