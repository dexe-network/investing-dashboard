import { createReducer } from "@reduxjs/toolkit"
import { addPools, setFilter } from "./actions"
import { sortItemsList, currencies } from "constants/index"
import { ITopMembersFilters } from "constants/interfaces"
import { Pool } from "constants/interfaces_v2"
import { addDays } from "date-fns"
import { calendarStaticRanges } from "constants/index"

export interface poolsState {
  filters: ITopMembersFilters
  list: Pool[]
}

const allPeriodRange = calendarStaticRanges[0].range()

const initialRange = [
  addDays(new Date(allPeriodRange.startDate), -7).toISOString(),
  new Date(allPeriodRange.endDate).toISOString(),
]

export const initialState: poolsState = {
  filters: {
    sort: sortItemsList[0],
    period: initialRange,
    query: "",
    currency: currencies[0],
    listStyle: "list",
  },
  list: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setFilter, (state, action) => {
      state.filters[action.payload.name] = action.payload.value
    })
    .addCase(addPools, (state, action) => {
      state.list = action.payload
    })
)
