import { createAction } from "@reduxjs/toolkit"

interface IAddTransaction {
  hash: string
  from: string
  info: any
  chainId: number
}
interface ICheckTransaction {
  hash: string
  blockNumber: any
  chainId: number
}
interface IFinalizeTransaction {
  hash: string
  chainId: number
  receipt: any
}

export const addTransation = createAction<{
  params: IAddTransaction
}>("transation/add")

export const checkedTransaction = createAction<{
  params: ICheckTransaction
}>("transation/check")

export const finalizeTransaction = createAction<{
  params: IFinalizeTransaction
}>("transation/finalize")
