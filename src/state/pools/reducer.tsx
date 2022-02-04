import { createReducer } from "@reduxjs/toolkit"
import {
  addBasicPools,
  addInvestPools,
  setFilter,
  setPagination,
} from "./actions"
import { sortItemsList, currencies } from "constants/index"
import { ITopMembersFilters, ITopMembersPagination } from "constants/interfaces"
import { Pool } from "constants/interfaces_v2"
import { addDays } from "date-fns"
import { calendarStaticRanges } from "constants/index"

export interface poolsState {
  filters: ITopMembersFilters
  pagination: ITopMembersPagination
  basicList: Pool[]
  investList: Pool[]
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
    listType: "basic",
  },
  pagination: {
    basic: {
      total: 0,
      offset: 0,
      limit: 100,
    },
    invest: {
      total: 0,
      offset: 0,
      limit: 100,
    },
  },
  basicList: [],
  investList: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setFilter, (state, action) => {
      state.filters[action.payload.name] = action.payload.value
    })
    .addCase(setPagination, (state, action) => {
      state.pagination[action.payload.type][action.payload.name] =
        action.payload.value
    })
    .addCase(addBasicPools, (state, action) => {
      state.basicList = action.payload
    })
    .addCase(addInvestPools, (state, action) => {
      state.investList = action.payload
    })
)
