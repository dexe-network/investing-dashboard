/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit"
import { IFund, IUserData } from "constants/interfaces"
import { updateUserProMode } from "./actions"

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
  builder.addCase(updateUserProMode, (state) => {
    state.userProMode = !state.userProMode
  })
)
