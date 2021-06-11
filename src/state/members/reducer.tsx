import { createReducer } from "@reduxjs/toolkit"
import { addMembers, setFilter } from "./actions"
import { sortItemsList, currencies } from "constants/index"
import { IPool, ITopMembersFilters } from "constants/interfaces"
import { addDays } from "date-fns"

export interface membersState {
  filters: ITopMembersFilters
  list: IPool[]
}

export const initialState: membersState = {
  filters: {
    sort: sortItemsList[0],
    period: [addDays(new Date(), -7).toISOString(), new Date().toISOString()],
    query: "",
    currency: currencies[0],
  },
  list: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setFilter, (state, action) => {
      state.filters[action.payload.name] = action.payload.value
    })
    .addCase(addMembers, (state, action) => {
      state.list = action.payload
    })
)
