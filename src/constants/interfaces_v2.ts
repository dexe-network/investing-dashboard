import { BigNumber } from "@ethersproject/bignumber"

export interface User {
  avatar_url: string
  name: string
  owner_address: string
  pools_list: string[]
  created_at: number
  updated_at: number
}

export interface BasicPoolHistory {
  id: string
  creationTime: number
  priceHistory: {
    price: string // usdTVS
    supply: string
    poolBase: string // baseTVL
    seconds: number
    loss: string
  }
}

export interface IBasicPoolQuery {
  id: string
  baseToken: string
  name: string
  ticker: string
  creationTime: number
  priceHistory: {
    price: number // usdTVL
    supply: number
    poolBase: number // baseTVL
    seconds: number
    loss: number
  }[]
  investors: {
    id: string
  }[]
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
export interface Pool {
  address: string
  name: string
  ticker: string

  lpPrice: string
  lpPnl: string | number
  stablePrice: string

  parameters?: PoolParameters
  leverageInfo?: LeverageInfo

  openPositions: string[]
  baseAndPositionBalances: BigNumber[]
  totalInvestors: BigNumber
  totalPoolBase: BigNumber
  lpEmission: BigNumber
  history: BasicPoolHistory
}

interface PoolParameters {
  baseToken: string
  trader: string
  baseTokenDecimals: BigNumber
  comissionPercentage: BigNumber
  comissionPeriod: number
  descriptionURL: string
  minimalInvestment: BigNumber
  privatePool: boolean
  totalLPEmission: BigNumber
}

/// @notice The struct that is returned from the TraderPoolView contract and stores information about the trader leverage
/// @param totalPoolUSD the total USD value of the pool
/// @param traderLeverageUSDTokens the maximal amount of USD that the trader is allowed to own
/// @param freeLeverageUSD the amount of USD that could be invested into the pool
/// @param freeLeverageBase the amount of base tokens that could be invested into the pool (basically converted freeLeverageUSD)
interface LeverageInfo {
  totalPoolUSD: BigNumber
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
