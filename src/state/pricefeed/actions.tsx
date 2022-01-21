import { createAction } from "@reduxjs/toolkit"
import { PricefeedState } from "./reducer"

export const updateWhitelist = createAction<{
  params: PricefeedState["whitelist"]
}>("pricefeed/whitelistlist-update")
