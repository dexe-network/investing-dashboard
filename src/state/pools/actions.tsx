import { createAction } from "@reduxjs/toolkit"
import { IBasicPoolQuery } from "constants/interfaces_v2"

export const setFilter = createAction<{ name: string; value: any }>(
  "pools/set-filter"
)

export const setPagination = createAction<{
  name: string
  type: "basic" | "invest"
  value: any
}>("pools/set-pagination")

export const addBasicPools = createAction<IBasicPoolQuery[] | undefined>(
  "pools/add-basic-pools"
)
export const addInvestPools = createAction<IBasicPoolQuery[] | undefined>(
  "pools/add-invest-pools"
)
