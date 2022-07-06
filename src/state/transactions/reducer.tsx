import { createReducer } from "@reduxjs/toolkit"
import { formatEther } from "@ethersproject/units"

import {
  addTransation,
  checkedTransaction,
  finalizeTransaction,
} from "./actions"
import { TransactionDetails } from "./types"

const now = () => new Date().getTime()

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

export const initialState: TransactionState = {}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addTransation, (state, { payload }) => {
      const { chainId, from, hash, info } = payload.params

      if (state[chainId]?.[hash]) {
        throw Error("Attempted to add existing transaction.")
      }

      const txs = state[chainId] ?? {}
      txs[hash] = { hash, info, from, addedTime: now() }
      state[chainId] = txs
    })
    .addCase(checkedTransaction, (state, { payload }) => {
      const { chainId, hash, blockNumber } = payload.params

      const tx = state[chainId]?.[hash]
      if (!tx) {
        return
      }

      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber
      } else {
        tx.lastCheckedBlockNumber = Math.max(
          blockNumber,
          tx.lastCheckedBlockNumber
        )
      }
    })
    .addCase(finalizeTransaction, (state, { payload }) => {
      const { chainId, hash, receipt } = payload.params

      const tx = state[chainId]?.[hash]
      if (!tx) {
        return
      }

      receipt.cumulativeGasUsed = formatEther(receipt.cumulativeGasUsed)
      receipt.gasUsed = formatEther(receipt.gasUsed)

      tx.receipt = receipt
      tx.confirmedTime = now()
    })
)
