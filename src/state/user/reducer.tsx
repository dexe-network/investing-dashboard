/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit"
import {
  createuser,
  readuser,
  updateuser,
  deleteuser,
  updateUserProMode,
} from "./actions"

export interface userState {
  userProMode: boolean
}

export const initialState: userState = {
  userProMode: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserProMode, (state) => {
      state.userProMode = !state.userProMode
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
