import { createAction } from "@reduxjs/toolkit"
import { IPoolQuery, PoolType } from "constants/interfaces_v2"

export const setFilter = createAction<{ name: string; value: any }>(
  "pools/set-filter"
)

export const setPagination = createAction<{
  name: string
  type: PoolType
  value: any
}>("pools/set-pagination")

export const addPools = createAction<{
  data: IPoolQuery[] | undefined
  type: PoolType
}>("pools/add-pools")
