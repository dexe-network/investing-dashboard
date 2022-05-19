import { createReducer } from "@reduxjs/toolkit"
import { ethers } from "ethers"

import {
  addTransation,
  checkedTransaction,
  finalizeTransaction,
  readTransation,
  updateTransation,
  deleteTransation,
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

      receipt.cumulativeGasUsed = ethers.utils.formatEther(
        receipt.cumulativeGasUsed
      )
      receipt.gasUsed = ethers.utils.formatEther(receipt.gasUsed)

      tx.receipt = receipt
      tx.confirmedTime = now()
    })
    .addCase(readTransation, (state, action) => {
      //
    })
    .addCase(updateTransation, (state, action) => {
      //
    })
    .addCase(deleteTransation, (state, action) => {
      //
    })
)
