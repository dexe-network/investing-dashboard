import { useCallback, useMemo } from "react"
import { DEFAULT_TXN_DISMISS_MS } from "constants/misc"
import { AppState } from "state"
import { useAppDispatch, useAppSelector } from "state/hooks"
import { addToast, removeToast } from "./actions"
import { ToastContent } from "./types"

// returns a function that allows adding a popup
export function useAddToast(): (
  content: ToastContent,
  key?: string,
  removeAfterMs?: number
) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: ToastContent, key?: string, removeAfterMs?: number) => {
      dispatch(
        addToast({
          params: {
            content,
            key,
            removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS,
          },
        })
      )
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemoveToast(): (key: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removeToast({ params: { key } }))
    },
    [dispatch]
  )
}

// get the list of active toasts
export function useActiveToasts(): AppState["application"]["toastList"] {
  const list = useAppSelector((state: AppState) => state.application.toastList)
  return useMemo(() => list.filter((item) => item.show), [list])
}
