import { createAction } from "@reduxjs/toolkit"
import { IPool } from "constants/interfaces"

// export interface IMembersActions {}

export const setFilter = createAction<{ name: string; value: any }>(
  "members/setFilter"
)

export const addMembers = createAction<IPool[]>("members/addMembers")
