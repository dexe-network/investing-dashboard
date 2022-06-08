import { useCallback } from "react"
import { useActiveWeb3React } from "hooks"
import store from "state"
import { retry, RetryableError, RetryOptions } from "utils/retry"

const RETRY_OPTIONS: RetryOptions = {
  n: 20,
  minWait: 500,
  maxWait: 1000,
}
/**
 * Retry the function that returns the promise
 * until the promise successfully resolves mined transactions
 * up to n retries
 */
function useStoreTransactionWaiter() {
  const { chainId } = useActiveWeb3React()

  const wait = useCallback(
    (hash, opt?: RetryOptions) => {
      if (!chainId) throw new Error("No chainId")

      const options = { ...RETRY_OPTIONS, ...opt }

      return retry(
        () =>
          new Promise((resolve) => {
            const s = store.getState()
            const tx = s.transactions[chainId][hash]

            if (!tx || !tx.receipt) {
              throw new RetryableError()
            }

            resolve(tx.receipt)
          }),
        options
      )
    },
    [chainId]
  )

  return wait
}

export default useStoreTransactionWaiter
