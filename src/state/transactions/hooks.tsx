import { useCallback } from "react"
import { TransactionReceipt } from "@ethersproject/providers"

import { useActiveWeb3React } from "hooks"
import useStoreTransactionWaiter from "hooks/useStoreTransactionWaiter"

import { useAddToast } from "state/application/hooks"
import { useAppDispatch, useAppSelector } from "state/hooks"

import { addTransation } from "./actions"
import { TransactionDetails } from "./types"

import { DEFAULT_TXN_DISMISS_MS } from "constants/misc"

export function useTransactionAdder() {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const addToast = useAddToast()

  const waitTransaction = useStoreTransactionWaiter()

  return useCallback(
    (response, info) => {
      if (!chainId) return
      if (!account) return

      const { hash } = response
      if (!hash) {
        throw Error("No transaction hash found.")
      }

      return new Promise((resolve) => {
        dispatch(
          addTransation({ params: { hash, from: account, info, chainId } })
        )
        addToast({ wait: true, txn: { hash } }, hash, DEFAULT_TXN_DISMISS_MS)
        resolve(hash)
      }).then(async (txHash) => {
        const { promise } = waitTransaction(txHash)
        const receipt = await promise.then((res) => res)

        return receipt as TransactionReceipt
      })
    },
    [chainId, account, dispatch, addToast, waitTransaction]
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useAppSelector((state) => state.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

export function useTransaction(
  transactionHash?: string
): TransactionDetails | undefined {
  const allTransactions = useAllTransactions()

  if (!transactionHash) {
    return undefined
  }

  return allTransactions[transactionHash]
}
