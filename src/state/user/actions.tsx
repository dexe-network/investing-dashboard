import { createAction } from "@reduxjs/toolkit"

// export interface Iuser {}

// CUSTOM actions

export const updateUserProMode = createAction("user/update-pro-mode")
export const addOwnedPools = createAction<{
  basic: string[]
  invest: string[]
}>("user/add-owned-pools")
