import { useCallback } from "react"
import { retry, RetryableError, DEFAULT_RETRY_OPTIONS } from "utils/retry"

function useTransactionWaiter(library) {
  const wait = useCallback(
    (hash) => {
      if (!library) throw new Error("No library or chainId")

      return retry(
        () =>
          library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug(`Retrying tranasaction receipt for ${hash}`)
              throw new RetryableError()
            }
            return receipt
          }),
        DEFAULT_RETRY_OPTIONS
      )
    },
    [library]
  )

  return wait
}

export default useTransactionWaiter
