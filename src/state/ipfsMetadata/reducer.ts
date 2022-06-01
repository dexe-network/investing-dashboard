import { createReducer } from "@reduxjs/toolkit"

import { IPoolMetadata, IUserMetadata } from "./types"
import { addPool, removePool, addUser, removeUser } from "./actions"

export interface IpfsMetadataState {
  user: IUserMetadata | null
  pools: {
    [poolId: string]: {
      [hash: string]: IPoolMetadata
    }
  }
}

export const initialState: IpfsMetadataState = {
  user: null,
  pools: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addPool, (state, { payload }) => {
      const {
        params: { poolId, hash, ...poolMeta },
      } = payload
      if (!state.pools[poolId] || !state.pools[poolId][hash]) {
        state.pools[poolId] = {
          [hash]: { ...poolMeta },
        }
      }
    })
    .addCase(removePool, (state, { payload: { params } }) => {
      const { poolId } = params

      if (state.pools[poolId]) {
        delete state.pools[poolId]
      }
    })
    .addCase(addUser, (state, { payload: { params } }) => {
      const { hash, ...userMeta } = params

      if (state.user?.hash !== hash) {
        state.user = {
          ...userMeta,
          hash,
        }
      }
    })
    .addCase(removeUser, (state) => {
      state.user = null
    })
)
