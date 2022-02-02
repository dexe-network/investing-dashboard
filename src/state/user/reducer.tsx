/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit"
import { IFund, IUserData } from "constants/interfaces"
import { addOwnedPools, updateUserProMode } from "./actions"

interface OwnedPools {
  basic: string[]
  invest: string[]
}

export interface userState {
  userProMode: boolean
  ownedPools: OwnedPools
  data: IUserData | null | false
}

export const initialState: userState = {
  data: null,

  userProMode: false,
  ownedPools: {
    basic: [],
    invest: [],
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserProMode, (state) => {
      state.userProMode = !state.userProMode
    })
    .addCase(addOwnedPools, (state, action) => {
      state.ownedPools = action.payload
    })
)
