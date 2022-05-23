export enum TransactionType {
  APPROVAL = 0,
  SWAP = 1,
  DEPOSIT_LIQUIDITY_STAKING = 2, // invest
  WITHDRAW_LIQUIDITY_STAKING = 3, // divest

  FUND_CREATE = 4,
  FUND_EDIT = 5,
  FUND_UPDATE_MANAGERS = 6,
  FUND_UPDATE_INVESTORS = 7,

  UPDATE_USER_CREDENTIALS = 8,

  CREATE_RISKY_PROPOSAL = 9,
  EDIT_RISKY_PROPOSAL = 10,

  CREATE_INVEST_PROPOSAL = 11,
  EDIT_INVEST_PROPOSAL = 12,

  STAKE_INSURANCE = 13,
  UNSTAKE_INSURANCE = 14,

  CREATE_INSURANCE_PROPOSAL = 15,
  VOTE_INSURANCE_PROPOSAL = 16,
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
