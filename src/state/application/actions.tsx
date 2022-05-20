import { createAction } from "@reduxjs/toolkit"

export const addToast = createAction<{ params: any }>("application/addToast")

export const removeToast = createAction<{ params: any }>(
  "application/removeToast"
)
