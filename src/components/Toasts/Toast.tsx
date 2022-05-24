import { useCallback, useEffect } from "react"

import { ToastContent } from "state/application/types"
import { useRemoveToast } from "state/application/hooks"

import ToastTransaction from "./ToastTransaction"

interface IProps {
  toastkey: string
  content: ToastContent
  removeAfterMs: number | null
  visible: boolean
}

const Toast: React.FC<IProps> = ({
  toastkey,
  content,
  removeAfterMs,
  visible,
}) => {
  const removeToast = useRemoveToast()
  const remove = useCallback(
    () => removeToast(toastkey),
    [toastkey, removeToast]
  )

  useEffect(() => {
    if (removeAfterMs === null) return

    const timeout = setTimeout(() => {
      remove()
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, remove])

  if ("txn" in content) {
    const {
      txn: { hash },
    } = content
    return <ToastTransaction hash={hash} onClose={remove} visible={visible} />
  } else {
    return null
  }
}

export default Toast
