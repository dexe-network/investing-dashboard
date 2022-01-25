import { createAction } from "@reduxjs/toolkit"
import { ContractsState } from "./reducer"

// export interface Iuser {}

export const updateContracts =
  createAction<{ params: ContractsState }>("contracts/update")
