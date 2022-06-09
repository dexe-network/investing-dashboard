import { TradeType, UpdateListType } from "constants/types"

interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

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
  DEPOSIT_RISKY_PROPOSAL = 11,
  WITHDRAW_RISKY_PROPOSAL = 12,

  CREATE_INVEST_PROPOSAL = 13,
  EDIT_INVEST_PROPOSAL = 14,

  STAKE_INSURANCE = 15,
  UNSTAKE_INSURANCE = 16,

  CREATE_INSURANCE_PROPOSAL = 17,
  VOTE_INSURANCE_PROPOSAL = 18,

  PRIVACY_POLICY_SET_HASH = 19,
  PRIVACY_POLICY_AGREE = 20,
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

export interface FundEditTransactionInfo {
  type: TransactionType.FUND_EDIT
  baseCurrencyId: string
  fundName: string
}
export interface FundUpdateManagersTransactionInfo {
  type: TransactionType.FUND_UPDATE_MANAGERS
  editType: UpdateListType
  poolId: string
}
export interface FundUpdateInvestorsTransactionInfo {
  type: TransactionType.FUND_UPDATE_INVESTORS
  editType: UpdateListType
  poolId: string
}

export interface UpdateCredentialsTransactionInfo {
  type: TransactionType.UPDATE_USER_CREDENTIALS
}

export interface CreateRiskyProposalTransactionInfo {
  type: TransactionType.CREATE_RISKY_PROPOSAL
}
export interface EditRiskyProposalTransactionInfo {
  type: TransactionType.EDIT_RISKY_PROPOSAL
}
export interface DepositRiskyProposalTransactionInfo {
  type: TransactionType.DEPOSIT_RISKY_PROPOSAL
  inputCurrencyAmountRaw: string
  inputCurrencySymbol: string
  expectedOutputCurrencyAmountRaw: string
  expectedOutputCurrencySymbol: string
}
export interface WithdrawRiskyProposalTransactionInfo {
  type: TransactionType.WITHDRAW_RISKY_PROPOSAL
  outputCurrencyAmountRaw: string
  outputCurrencySymbol: string
  expectedInputCurrencyAmountRaw: string
  expectedInputCurrencySymbol: string
}

export interface CreateInvestProposalTransactionInfo {
  type: TransactionType.CREATE_INVEST_PROPOSAL
  amount: string
  ipfsPath: string
  investLpAmountRaw: string
}
export interface EditInvestProposalTransactionInfo {
  type: TransactionType.EDIT_INVEST_PROPOSAL
  amount: string
  ipfsPath: string
  investLpAmountRaw: string
}

export interface StakeInsuranceTransactionInfo {
  type: TransactionType.STAKE_INSURANCE
  amount: number
}

export interface UnstakeInsuranceTransactionInfo {
  type: TransactionType.UNSTAKE_INSURANCE
  amount: number
}

export interface PrivacyPolicySetHashTransactionInfo {
  type: TransactionType.PRIVACY_POLICY_SET_HASH
}
export interface PrivacyPolicyAgreeTransactionInfo {
  type: TransactionType.PRIVACY_POLICY_AGREE
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | DepositLiquidityTransactionInfo
  | WithdrawLiquidityTransactionInfo
  | ExactInputSwapTransactionInfo
  | ExactOutputSwapTransactionInfo
  | FundCreateTransactionInfo
  | FundEditTransactionInfo
  | FundUpdateManagersTransactionInfo
  | FundUpdateInvestorsTransactionInfo
  | UpdateCredentialsTransactionInfo
  | CreateRiskyProposalTransactionInfo
  | EditRiskyProposalTransactionInfo
  | DepositRiskyProposalTransactionInfo
  | WithdrawRiskyProposalTransactionInfo
  | CreateInvestProposalTransactionInfo
  | EditInvestProposalTransactionInfo
  | StakeInsuranceTransactionInfo
  | UnstakeInsuranceTransactionInfo
  | PrivacyPolicySetHashTransactionInfo
  | PrivacyPolicyAgreeTransactionInfo

export interface TransactionDetails {
  hash: string
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
  info: TransactionInfo
}
