import { BigNumber } from "@ethersproject/bignumber"

export interface IPost {
  description: string
  comments: number[]
  created_at: string
}

export interface IPostGroup {
  id: string
  symbol: string
  name: string
  price: string
  pnl: number
  posts: IPost[]
}

export interface IStaticRanges {
  label: string
  isSelected: (period: string[]) => void
  range: () => void
}

export interface ITopMembersFilters {
  sort: string
  period: string[]
  query: string
  currency: string
  listType: "basic" | "invest" | "all" | "risk"
}

export interface PaginationType {
  total: number
  offset: number
  limit: number
}

export interface ITopMembersPagination {
  basic: PaginationType
  invest: PaginationType
}

export interface Token {
  address: string
  name: string
  symbol: string
  decimals: number
}

export type FundTypes = "basic" | "investment"

export interface ITokenBase {
  address: string
  name: string
  symbol: string
  decimals: number
  balance?: BigNumber
  chainId?: number
  logoURI?: string
}

export interface INotification {
  createdAt: string
  description: string
  title: string
  link: string
  __v: number
  _id: string
}

// POOL

export interface ILpPnl {
  lpBasic: string // BigNumber
  lpBasicPercent: number
  lpUsd: string // BigNumber
  lpUsdPercent: number
}

export interface IDetailedChart extends ILpPnl {
  x: string // new Date().toIsoString()
  y: number
}

export interface IPnl extends ILpPnl {
  total: number
  monthly: number[] // length 12 CHART
  detailed: IDetailedChart[] // any length FULL CHART
}

export interface IAvg {
  tradesPerDay: number
  dailyLpProfit: number
  orderSize: number
  timePosition: string
}

export interface ISortino {
  base: number
  btc: number
}

export interface ISupply {
  circulating: string // BigNumber
  total: string // BigNumber
}

export interface IPool {
  firstName: string
  lastName: string
  avatar: string

  ownerAddress: string
  poolAddress: string
  baseAddress: string

  symbol: string
  price: string // BigNumber
  priceUsd: number

  copiers: number
  rank: number
  commision: number
  personalFunds: string // BigNumber
  personalFundsPercent: number
  invested: string // BigNumber
  profitFactor: number
  trades: string // BigNumber
  maxLoss: number

  avg: IAvg
  pnl: IPnl
  sortino: ISortino
  supply: ISupply
}

export interface IFund {
  basicTokenAdr: string
  blockNumber: number
  createdAt: string
  creatorAdr: string
  date: string
  dexeCommissionDen: number
  dexeCommissionNum: number
  id: number
  investorCommissionDen: number
  investorCommissionNum: number
  investorRestricted: boolean
  isActualOn: boolean
  name: string
  poolAdr: string
  symbol: string
  totalSupply: string
  traderCommissionDen: number
  traderCommissionNum: number
  tx: string
  updatedAt: string
}

export interface IPoolInfo {
  symbol: string
  currentPrice: string
  priceChange24H: number
  totalValueLocked: string
  annualPercentageYield: number
  profitAndLoss: number

  basicTokenAdr: string
  basicTokenDecimal: number
  basicTokenSymbol: string
  copiers24H: number
  fund: number
  investorsFundsLocked: string
  investorsFundsLocked24H: number
  personalFundsLocked: string
  personalFundsLocked24H: number
  profitAndLossByPeriod: {
    m1: number
    m3: number
    all: number
  }
  profitAndLossChart: IDetailedChart[]
}

export interface IUserData {
  id: number
  avatar: string
  createdAt: string
  nickname: string
  updatedAt: string
  wallet: string
}

export interface IPoolTransaction {
  txId: string
  timestamp: Date
  path: string[]
  status: "BUY" | "SELL"
  amount: BigNumber
  basePrice: BigNumber
  stablePrice: BigNumber
}

export interface IPoolPosition {
  id: string
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

  transactions: IPoolTransaction[]
}

// END of POOL
