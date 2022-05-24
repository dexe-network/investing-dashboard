import { TradeType } from "constants/types"

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

export interface ApproveTransactionInfo {
  type: TransactionType.APPROVAL
  tokenAddress: string
  spender: string
}

export interface DepositLiquidityTransactionInfo {
  type: TransactionType.DEPOSIT_LIQUIDITY_STAKING
  currencyId: string
  poolAddress: string
  amount: string
}

export interface WithdrawLiquidityTransactionInfo {
  type: TransactionType.WITHDRAW_LIQUIDITY_STAKING
  currencyId: string
  poolAddress: string
  amount: string
}

interface BaseSwapTransactionInfo {
  type: TransactionType.SWAP
  tradeType: TradeType
  inputCurrencyId: string
  outputCurrencyId: string
}

export interface ExactInputSwapTransactionInfo extends BaseSwapTransactionInfo {
  tradeType: TradeType.EXACT_INPUT
  inputCurrencyAmountRaw: string
  expectedOutputCurrencyAmountRaw: string
  minimumOutputCurrencyAmountRaw: string
}
export interface ExactOutputSwapTransactionInfo
  extends BaseSwapTransactionInfo {
  tradeType: TradeType.EXACT_OUTPUT
  outputCurrencyAmountRaw: string
  expectedInputCurrencyAmountRaw: string
  maximumInputCurrencyAmountRaw: string
}

export interface FundCreateTransactionInfo {
  type: TransactionType.FUND_CREATE
  baseCurrencyId: string
  fundName: string
}

export interface UpdateCredentialsTransactionInfo {
  type: TransactionType.UPDATE_USER_CREDENTIALS
}

export interface StakeInsuranceTransactionInfo {
  type: TransactionType.STAKE_INSURANCE
  amount: number
}

export interface UnstakeInsuranceTransactionInfo {
  type: TransactionType.UNSTAKE_INSURANCE
  amount: number
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | DepositLiquidityTransactionInfo
  | WithdrawLiquidityTransactionInfo
  | ExactInputSwapTransactionInfo
  | ExactOutputSwapTransactionInfo
  | FundCreateTransactionInfo
  | UpdateCredentialsTransactionInfo
  | StakeInsuranceTransactionInfo
  | UnstakeInsuranceTransactionInfo
  | StakeInsuranceTransactionInfo
  | UnstakeInsuranceTransactionInfo

export interface TransactionDetails {
  hash: string
  receipt?: any // TODO: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
  info: TransactionInfo
}
