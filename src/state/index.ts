import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { save, load, clear } from "redux-localstorage-simple"

import user from "./user/reducer"
import transactions from "./transactions/reducer"
import pools from "./pools/reducer"
import contracts from "./contracts/reducer"
import pricefeed from "./pricefeed/reducer"
import application from "./application/reducer"

const PERSISTED_KEYS: string[] = ["user", "transactions", "pools"]

const shouldReset = () => {
  const isReseted =
    localStorage.getItem("redux-reset-03-02-2022") === "true" &&
    localStorage.getItem("redux-reset-25-04-2022") === "true"

  if (!isReseted) {
    clear({
      namespace: process.env.REACT_APP_NAMESPACE || "DEXE",
    })
    localStorage.setItem("redux-reset-03-02-2022", "true")
    localStorage.setItem("redux-reset-25-04-2022", "true")
  }
}

shouldReset()

const store = configureStore({
  reducer: {
    user,
    application,
    transactions,
    pools,
    contracts,
    pricefeed,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({
      states: PERSISTED_KEYS,
      namespace: process.env.REACT_APP_NAMESPACE || "DEXE",
    }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    namespace: process.env.REACT_APP_NAMESPACE || "DEXE",
  }),
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
