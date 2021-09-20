/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit"
import { IFund, IUserData } from "constants/interfaces"
import {
  createuser,
  readuser,
  updateuser,
  deleteuser,
  updateUserProMode,
  addOwnedPools,
  addUserData,
} from "./actions"

export interface userState {
  userProMode: boolean
  ownedPools: IFund[] | null
  data: IUserData | null | false
}

export const initialState: userState = {
  data: null,

  userProMode: false,
  ownedPools: null,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserProMode, (state) => {
      state.userProMode = !state.userProMode
    })
    .addCase(addOwnedPools, (state, action) => {
      state.ownedPools = action.payload.data
    })
    .addCase(addUserData, (state, action) => {
      state.data = action.payload.data
    })
    .addCase(createuser, (state, action) => {
      //
    })
    .addCase(readuser, (state, action) => {
      //
    })
    .addCase(updateuser, (state, action) => {
      //
    })
    .addCase(deleteuser, (state, action) => {
      //
    })
)
