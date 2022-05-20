import { createReducer, nanoid } from "@reduxjs/toolkit"

import { DEFAULT_TXN_DISMISS_MS } from "constants/misc"
import { addToast, removeToast } from "./actions"
import { ToastContent } from "./types"

type ToastList = Array<{
  key: string
  show: boolean
  content: ToastContent
  removeAfterMs: number | null
}>

export interface ApplicationState {
  readonly toastList: ToastList
}

export const initialState: ApplicationState = { toastList: [] }

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addToast, (state, { payload }) => {
      const {
        content,
        key,
        removeAfterMs = DEFAULT_TXN_DISMISS_MS,
      } = payload.params

      state.toastList = (
        key
          ? state.toastList.filter((popup) => popup.key !== key)
          : state.toastList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removeToast, (state, { payload }) => {
      const { key } = payload.params

      state.toastList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
)
