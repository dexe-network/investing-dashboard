import { createReducer } from "@reduxjs/toolkit"
import { updateRates } from "./actions"

export interface userState {
  prices: any
}

export const initialState: userState = {
  prices: {},
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateRates, (state, action) => {
    state.prices = action.payload.params
  })
)
