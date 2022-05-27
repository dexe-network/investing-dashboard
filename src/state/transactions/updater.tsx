import { useCallback, useMemo, useEffect } from "react"

import {
  DEFAULT_TXN_DISMISS_MS,
  TRANSACTION_PENDING_DIVIDER,
} from "constants/misc"
import { useAppDispatch, useAppSelector } from "state/hooks"
import { checkedTransaction, finalizeTransaction } from "./actions"
import { useAddToast, useRemoveToast } from "state/application/hooks"

import { useActiveWeb3React } from "hooks"
import useBlockNumber from "hooks/useBlockNumber"
import { retry, RetryableError, RetryOptions } from "utils/retry"

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  n: 10,
  minWait: 250,
  maxWait: 1000,
}

interface Transaction {
  addedTime: number
  receipt?: unknown
  lastCheckedBlockNumber?: number
}

export function shouldCheck(blockNumber: number, tx: Transaction): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending =
    (new Date().getTime() - tx.addedTime) / TRANSACTION_PENDING_DIVIDER
  if (minutesPending > 60) {
    // every 10 blocks if pending longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending longer than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

export function TransactionUpdater() {
  const { chainId, library } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  const blockNumber = useBlockNumber()

  const addToast = useAddToast()
  const removeToast = useRemoveToast()

  const onCheck = useCallback(
    ({ chainId, hash, blockNumber }) => {
      dispatch(checkedTransaction({ params: { chainId, hash, blockNumber } }))
    },
    [dispatch]
  )

  const onReceipt = useCallback(
    ({ chainId, hash, receipt }) => {
      dispatch(finalizeTransaction({ params: { chainId, hash, receipt } }))

      addToast({ txn: { hash } }, hash, DEFAULT_TXN_DISMISS_MS)
      removeToast(`${hash}-wait`)
    },
    [dispatch, removeToast, addToast]
  )

  const getReceipt = useCallback(
    (hash: string) => {
      if (!library || !chainId) throw new Error("No library or chainId")
      const retryOptions = DEFAULT_RETRY_OPTIONS

      return retry(
        () =>
          library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug(`Retrying tranasaction receipt for ${hash}`)
              throw new RetryableError()
            }
            return receipt
          }),
        retryOptions
      )
    },
    [chainId, library]
  )

  const state = useAppSelector((state) => state.transactions)
  const pendingTransactions = useMemo(
    () => (chainId ? state[chainId] ?? {} : {}),
    [chainId, state]
  )

  useEffect(() => {
    if (!chainId || !library || !blockNumber) return

    const cancels = Object.keys(pendingTransactions)
      .filter((hash) => shouldCheck(blockNumber, pendingTransactions[hash]))
      .map((hash) => {
        const { promise, cancel } = getReceipt(hash)
        promise
          .then((receipt) => {
            if (receipt) {
              onReceipt({ chainId, hash, receipt })
            } else {
              onCheck({ chainId, hash, blockNumber })
            }
          })
          .catch((error) => {
            if (!error.isCalcelledError) {
              console.warn(
                `Failed to get transaction receipt for ${hash}`,
                error
              )
            }
          })
        return cancel
      })

    return () => {
      cancels.forEach((cancel) => cancel())
    }
  }, [
    chainId,
    library,
    blockNumber,
    pendingTransactions,
    getReceipt,
    onReceipt,
    onCheck,
  ])

  return null
}

export default null
