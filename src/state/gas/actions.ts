import { createAction } from "@reduxjs/toolkit"
import { GasPriceResponse } from "constants/interfaces_v2"

// Update gas data
export const updateGasData = createAction<{
  chainId: number
  response: GasPriceResponse
}>("gas/updateGasData")
