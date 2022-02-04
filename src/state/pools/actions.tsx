import { createAction } from "@reduxjs/toolkit"
import { Pool } from "constants/interfaces_v2"

export const setFilter = createAction<{ name: string; value: any }>(
  "pools/set-filter"
)

export const setPagination = createAction<{
  name: string
  type: "basic" | "invest"
  value: any
}>("pools/set-pagination")

export const addBasicPools = createAction<Pool[]>("pools/add-basic-pools")
export const addInvestPools = createAction<Pool[]>("pools/add-invest-pools")
