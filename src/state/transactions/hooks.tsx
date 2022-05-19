import { useCallback } from "react"

import { useActiveWeb3React } from "hooks"

import { useAppDispatch } from "state/hooks"
import { addTransation } from "./actions"

export function useTransactionAdder() {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  return useCallback(
    (response, info) => {
      if (!chainId) return
      if (!account) return

      const { hash } = response
      if (!hash) {
        throw Error("No transaction hash found.")
      }

      dispatch(
        addTransation({ params: { hash, from: account, info, chainId } })
      )
    },
    [chainId, account, dispatch]
  )
}
