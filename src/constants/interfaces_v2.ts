/* eslint-disable @typescript-eslint/no-namespace */
import { BigNumber } from "@ethersproject/bignumber"
import { ReactNode } from "react"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NAMESPACE: string
      REACT_APP_UPDATE_INTERVAL: string

      REACT_APP_INFURA_ID: string
      REACT_APP_ETHERSCAN_API_KEY: string

      REACT_APP_CONTRACTS_REGISTRY_ADDRESS: string

      REACT_APP_ALL_POOLS_API_URL: string
      REACT_APP_BASIC_POOLS_API_URL: string
      REACT_APP_INVEST_POOLS_API_URL: string

      REACT_APP_IPFS_PROJECT_ID: string
      REACT_APP_IPFS_PROJECT_SECRET: string
    }
  }
}

export interface User {
  avatar_url: string
  name: string
  owner_address: string
  pools_list: string[]
  created_at: number
  updated_at: number
}

export interface Investor {
  id: string
  insurance: BigNumber
  claimedAmount: BigNumber
  activePools: string[]
  allPools: string[]
}

export type PoolType = "ALL_POOL" | "INVEST_POOL" | "BASIC_POOL"

export interface IPriceHistory {
  usdTVL: number
  baseTVL: number
  supply: number
  absPNL: number
  percPNL: number
  timestamp: number
}

export interface IPoolQuery {
  id: string
  baseToken: string
  type: PoolType
  name: string
  ticker: string
  trader: string
  creationTime: number
  descriptionURL: string
  maxLoss: number
  totalTrades: number
  totalClosedPositions: number
  averageTrades: number
  investorsCount: number
  averagePositionTime: number
  priceHistory: IPriceHistory[]
  privateInvestors: Investor[]
  admins: string[]
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
/// @param traderBase is amount of trader base tokens in this pool
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
  traderBase: BigNumber
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

/// @notice The enum of exchange types
/// @param FROM_EXACT the type corresponding to the exchangeFromExact function
/// @param TO_EXACT the type corresponding to the exchangeToExact function
export enum ExchangeType {
  FROM_EXACT,
  TO_EXACT,
}

// used to display the exchange data
interface FormElement {
  address: string | undefined
  amount: string
  balance: BigNumber
  symbol?: string
  decimals?: number
  icon?: ReactNode
  price: BigNumber
}

export interface ExchangeForm {
  from: FormElement
  to: FormElement
}

export interface GasPriceResponse {
  LastBlock: string
  SafeGasPrice: string
  ProposeGasPrice: string
  FastGasPrice: string
  UsdPrice: string
}
