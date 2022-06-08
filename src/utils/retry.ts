import { delay } from "utils"

function waitRandom(min: number, max: number): Promise<void> {
  return delay(min + Math.round(Math.random() * Math.max(0, max - min)))
}

/**
 * This error is thrown if the function is cancelled before completing
 */
class CancelledError extends Error {
  public isCancelledError: true = true
  constructor() {
    super("Cancelled")
  }
}

/**
 * Throw this error if the function should retry
 */
export class RetryableError extends Error {
  public isRetryableError: true = true
}

export interface RetryOptions {
  n: number
  minWait: number
  maxWait: number
}

export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  n: 10,
  minWait: 250,
  maxWait: 1000,
}

/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
export function retry<T>(
  fn: () => Promise<T>,
  { n, minWait, maxWait }: RetryOptions
): { promise: Promise<T>; cancel: () => void } {
  let completed = false
  let rejectCancelled: (error: Error) => void
  const promise = new Promise<T>(async (resolve, reject) => {
    rejectCancelled = reject

    while (true) {
      let result: T
      try {
        result = await fn()
        if (!completed) {
          resolve(result)
          completed = true
        }
        break
      } catch (error) {
        if (completed) {
          break
        }

        if (n <= 0 || !(error as RetryableError).isRetryableError) {
          reject(error)
          completed = true
          break
        }
        n--
      }

      await waitRandom(minWait, maxWait)
    }
  })

  return {
    promise,
    cancel: () => {
      if (completed) return
      completed = true
      rejectCancelled(new CancelledError())
    },
  }
}
