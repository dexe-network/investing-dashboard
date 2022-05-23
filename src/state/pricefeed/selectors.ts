import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "state"

const selectPriceFeed = (state: AppState) => state.pricefeed

export const selectWhitelist = createSelector(
  [selectPriceFeed],
  (priceFeed) => priceFeed.whitelist
)

export const selectWhitelistItem = (address: string) =>
  createSelector(
    [selectWhitelist],
    (whitelist) => whitelist.filter((item) => item.address === address)[0]
  )
