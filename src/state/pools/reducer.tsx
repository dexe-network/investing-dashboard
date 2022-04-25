import { createReducer } from "@reduxjs/toolkit"
import { addPools, setFilter, setPagination } from "./actions"
import { sortItemsList, currencies, poolTypes } from "constants/index"
import { ITopMembersFilters, ITopMembersPagination } from "constants/interfaces"
import { IPoolQuery } from "constants/interfaces_v2"
import { addDays } from "date-fns"
import { calendarStaticRanges } from "constants/index"

export interface poolsState {
  filters: ITopMembersFilters
  pagination: ITopMembersPagination
  ALL_POOL: IPoolQuery[]
  BASIC_POOL: IPoolQuery[]
  INVEST_POOL: IPoolQuery[]
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
  },
  pagination: {
    ALL_POOL: {
      total: 0,
      offset: 0,
      limit: 100,
    },
    BASIC_POOL: {
      total: 0,
      offset: 0,
      limit: 100,
    },
    INVEST_POOL: {
      total: 0,
      offset: 0,
      limit: 100,
    },
  },
  [poolTypes.all]: [],
  [poolTypes.basic]: [],
  [poolTypes.invest]: [],
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
    .addCase(addPools, (state, action) => {
      state[action.payload.type] = (action.payload.data || []).map((v) => ({
        ...v,
        id: v.id.toLocaleLowerCase(),
      }))
    })
)
