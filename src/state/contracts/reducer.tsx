import { createReducer } from "@reduxjs/toolkit"
import { updateContracts } from "./actions"

export interface ContractsState {
  PoolFactory: string
  TraderPoolRegistry: string
  DEXE: string
  USD: string
  PriceFeed: string
  UniswapV2Router: string
  UniswapV2Factory: string
  Insurance: string
  Treasury: string
  Dividends: string
  CoreProperties: string
  UserRegistry: string
}

export const initialState: ContractsState = {
  PoolFactory: "",
  TraderPoolRegistry: "",
  DEXE: "",
  USD: "",
  PriceFeed: "",
  UniswapV2Router: "",
  UniswapV2Factory: "",
  Insurance: "",
  Treasury: "",
  Dividends: "",
  CoreProperties: "",
  UserRegistry: "",
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateContracts, (state, action) => {
    state.PoolFactory = action.payload.params.PoolFactory
    state.TraderPoolRegistry = action.payload.params.TraderPoolRegistry
    state.DEXE = action.payload.params.DEXE
    state.USD = action.payload.params.USD
    state.PriceFeed = action.payload.params.PriceFeed
    state.UniswapV2Router = action.payload.params.UniswapV2Router
    state.UniswapV2Factory = action.payload.params.UniswapV2Factory
    state.Insurance = action.payload.params.Insurance
    state.Treasury = action.payload.params.Treasury
    state.Dividends = action.payload.params.Dividends
    state.CoreProperties = action.payload.params.CoreProperties
    state.UserRegistry = action.payload.params.UserRegistry
  })
)
