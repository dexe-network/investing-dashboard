import { createAction } from "@reduxjs/toolkit"
import { IPool } from "constants/interfaces"

export const setFilter = createAction<{ name: string; value: any }>(
  "pools/setFilter"
)

export const addPools = createAction<IPool[]>("pools/addPools")
