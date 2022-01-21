import { createReducer } from "@reduxjs/toolkit"
import { Token } from "constants/interfaces"
import { updateWhitelist } from "./actions"

export interface PricefeedState {
  whitelist: Token[]
}

export const initialState: PricefeedState = {
  whitelist: [],
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateWhitelist, (state, action) => {
    state.whitelist = action.payload.params
  })
)
