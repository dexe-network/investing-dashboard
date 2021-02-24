/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit"
import { createuser, readuser, updateuser, deleteuser } from "./actions"

export interface userState {}

export const initialState: userState = {}

export default createReducer(initialState, (builder) =>
  builder
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
