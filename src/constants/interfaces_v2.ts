import { BigNumber } from "@ethersproject/bignumber"

export interface User {
  avatar_url: string
  name: string
  owner_address: string
  pools_list: string[]
  created_at: number
  updated_at: number
}

export type PoolType = "ALL_POOL" | "INVEST_POOL" | "BASIC_POOL"

export interface IPriceHistory {
  usdTVL: number
  baseTVL: number
  supply: number
  absPNL: number
  percPNL: number
  seconds: number
}

export interface IPoolQuery {
  id: string
  baseToken: string
  type: PoolType
  name: string
  ticker: string
  creationTime: number
  descriptionURL: string
  maxLoss: number
  totalTrades: number
  totalClosedPositions: number
  averageTrades: number
  investorsCount: number
  averagePositionTime: number
  priceHistory: IPriceHistory[]
}

export interface IPriceHistoryQuery {
  priceHistory: IPriceHistory[]
}

/// @notice The structure that is returned from the TraderPoolView contract and stores static information about the pool
/// @param address pool address
/// @param ticker the ERC20 symbol of this pool
/// @param name the ERC20 name of this pool
/// @param parameters the active pool parametrs (that are set in the constructor)
/// @param openPositions the array of open positions addresses
/// @param baseAndPositionBalances the array of balances. [0] is the balance of base tokens (array is normalized)
/// @param totalPoolUSD is the current USD TVL in this pool
/// @param lpEmission is the current number of LP tokens
export interface PoolInfo {
  baseAndPositionBalances: BigNumber[]
  lpLockedInProposals: BigNumber
  lpSupply: BigNumber
  name: string
  openPositions: string[]
  ticker: string
  totalInvestors: BigNumber
  totalPoolBase: BigNumber
  totalPoolUSD: BigNumber
  parameters: PoolParameters
}

export interface UsersInfo {
  investedBase: BigNumber
  poolBaseShare: BigNumber
  poolLPBalance: BigNumber
  poolUSDShare: BigNumber
}

interface PoolParameters {
  baseToken: string
  trader: string
  baseTokenDecimals: BigNumber
  commissionPercentage: BigNumber
  comissionPeriod: number
  descriptionURL: string
  minimalInvestment: BigNumber
  privatePool: boolean
  totalLPEmission: BigNumber
}

interface RiskyProposalLimits {
  investLPLimit: BigNumber
  maxTokenPriceLimit: BigNumber
  timestampLimit: BigNumber
}

interface RiskyProposalInfo {
  balanceBase: BigNumber
  balancePosition: BigNumber
  lpLocked: BigNumber
  propoosalLimits: RiskyProposalLimits
  token: string
  tokenDecimals: BigNumber
}

export interface RiskyProposal {
  lp2Supply: BigNumber
  proposalInfo: RiskyProposalInfo
  totalProposalBase: BigNumber
  totalProposalUSD
}

/// @notice The struct that is returned from the TraderPoolView contract and stores information about the trader leverage
/// @param totalPoolUSDWithProposals the total USD value of the pool
/// @param traderLeverageUSDTokens the maximal amount of USD that the trader is allowed to own
/// @param freeLeverageUSD the amount of USD that could be invested into the pool
/// @param freeLeverageBase the amount of base tokens that could be invested into the pool (basically converted freeLeverageUSD)
export interface LeverageInfo {
  totalPoolUSDWithProposals: BigNumber
  freeLeverageBase: BigNumber
  freeLeverageUSD: BigNumber
  traderLeverageUSDTokens: BigNumber
}

export interface WhiteList {
  address: string
  decimals: number
  symbol: string
}

export interface OwnedPools {
  basic: string[]
  invest: string[]
}

export interface IExchange {
  fromToken: string
  toToken: string
  fromVolume: string
  toVolume: string
  day: {
    day: number
  }
}

export interface IPosition {
  closed: boolean
  id: string
  positionToken: string
  exchanges: IExchange[]
}

export interface IPositionQuery {
  baseToken: string
  ticker: string
  descriptionURL: string
  positions: IPosition[]
}
