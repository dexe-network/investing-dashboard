import { createSelector } from "@reduxjs/toolkit"

import { AppState } from "state"

const selectContracts = (state: AppState) => state.contracts

export const selectCorePropertiesAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.CoreProperties || ""
)

export const selectDexeAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.DEXE || ""
)

export const selectDividendsAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.Dividends || ""
)

export const selectInsuranceAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.Insurance || ""
)

export const selectPriceFeedAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.PriceFeed || ""
)

export const selectTraderPoolFactoryAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.TraderPoolFactory || ""
)

export const selectTraderPoolRegistryAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.TraderPoolRegistry || ""
)

export const selectTreasuryAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.Treasury || ""
)

export const selectUsdAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.USD || ""
)

export const selectUniswapAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.UniswapV2Factory || ""
)

export const selectUniswapRouterAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.UniswapV2Router || ""
)

export const selectUserRegistryAddress = createSelector(
  [selectContracts],
  (contracts) => contracts.UserRegistry || ""
)
