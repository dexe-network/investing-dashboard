import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { save, load } from "redux-localstorage-simple"

import user from "./user/reducer"

const PERSISTED_KEYS: string[] = ["user", "transactions"]

const store = configureStore({
  reducer: {
    user,
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
