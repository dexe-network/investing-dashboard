import { BigNumber } from "@ethersproject/bignumber"

export interface User {
  avatar_url: string
  name: string
  owner_address: string
  pools_list: string[]
  created_at: number
  updated_at: number
}

export interface Pool {
  // ADRESSES
  pool_address: string
  base_address: string
  creator_address: string

  // LP TOKEN INFO
  symbol: string
  name: string
  lp_decimal: number

  base_symbol: string
  base_name: string
  base_decimal: number

  // POOL CONFIG
  type: "standard" | "risky" | "investment"
  is_actual_on: boolean
  managers_list: string[]

  // COMMISSIONS
  trader_commission: number
  investor_commission: number
  platform_commission: number

  // STATS
  current_price: string
  price_change_24h: number
  copiers_change_24h: number
  total_value_locked: BigNumber
  annual_percentage_yield: number
  profit_and_loss: number
  investors_funds_locked: BigNumber
  investors_funds_locked_24h: number
  personal_funds_locked: BigNumber
  personal_funds_locked_24h: number

  pnl_by_period: {
    m1: number
    m3: number
    all: number
  }
  pnl_chart: { x: number; y: number; pnl: number }[]

  // TX INFO
  block_number: string
  tx_hash: string
  created_at: number
  updated_at: number
}

export interface Investor {
  profitAndLoss24H: number
  profitAndLoss: number

  investedAmountUSDT: BigNumber
  totalValueUSDT: BigNumber
  profitAndLossByPeriod: {
    m1: number
    m3: number
    all: number
  }
  profitAndLossChart: { x: number; y: number; pnl: number }[]
}

export interface PoolTransaction {
  txId: string
  timestamp: Date
  path: string[]
  status: "BUY" | "SELL"
  amount: BigNumber
  basePrice: BigNumber
  stablePrice: BigNumber
}

export interface PoolPosition {
  createdAt: string
  updatedAt: string

  tokenAddress: string
  baseAddress: string
  amount: BigNumber
  avgBasePrice: BigNumber
  avgStablePrice: BigNumber
  pnlBase: BigNumber
  pnlStable: BigNumber
  pnl: number

  transactions: PoolTransaction[]
}

interface InvestingHistory {}

export interface WhiteList {
  address: string
  decimals: number
  symbol: string
}
