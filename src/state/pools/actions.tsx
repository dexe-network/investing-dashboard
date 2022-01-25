import { createAction } from "@reduxjs/toolkit"
import { Pool } from "constants/interfaces_v2"

export const setFilter =
  createAction<{ name: string; value: any }>("pools/setFilter")

export const addPools = createAction<Pool[]>("pools/addPools")
