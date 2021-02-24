import { createAction } from "@reduxjs/toolkit"

// export interface Iuser {}

export const createuser = createAction<{ params: any }>("user/create")
export const readuser = createAction<{ params: any }>("user/read")
export const updateuser = createAction<{ params: any }>("user/update")
export const deleteuser = createAction<{ params: any }>("user/delete")

// CUSTOM actions

export const updateUserProMode = createAction("user/update-pro-mode")
