import { createAction } from "@reduxjs/toolkit"

// export interface Iuser {}

export const updateRates = createAction<{ params: any }>("rates/update")
