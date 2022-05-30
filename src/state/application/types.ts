export type BaseToastContent = {
  type: string
  content: any
}

export type TransactionToastContent = {
  wait?: boolean
  txn: {
    hash: string
  }
}

export type ToastContent = BaseToastContent | TransactionToastContent
