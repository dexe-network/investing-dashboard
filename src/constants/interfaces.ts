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

export type ListOrCard = "list" | "card"

export interface ITopMembersFilters {
  sort: string
  period: string[]
  query: string
  currency: string
  listStyle: ListOrCard
}

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
  timestamp: string // new Date().toIsoString()
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

// END of POOL
