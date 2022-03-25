/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit"
import { IFund, IUserData } from "constants/interfaces"
import { OwnedPools } from "constants/interfaces_v2"
import { addOwnedPools, updateUserProMode } from "./actions"

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
      state.ownedPools.basic = action.payload.basic.map((v) =>
        v.toLocaleLowerCase()
      )
      state.ownedPools.invest = action.payload.invest.map((v) =>
        v.toLocaleLowerCase()
      )
    })
)
