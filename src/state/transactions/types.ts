export enum TransactionType {
  APPROVAL = 0,
  SWAP = 1,
  DEPOSIT_LIQUIDITY_STAKING = 2,
  WITHDRAW_LIQUIDITY_STAKING = 3,
  CLAIM = 4,
  VOTE = 5,
  DELEGATE = 6,
  WRAP = 7,

  CREATE_POOL = 8,
  UPDATE_POOL_PARAMETERS = 9,
  ADD_POOL_INVESTORS = 10,
  REMOVE_POOL_INVESTORS = 11,
  ADD_POOL_MANAGERS = 12,
  REMOVE_POOL_MANAGERS = 13,
}

export interface TransactionDetails {
  hash: string
  receipt?: any // TODO: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
  info: any // TODO: TransactionInfo
}
