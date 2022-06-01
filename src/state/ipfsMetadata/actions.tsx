import { createAction } from "@reduxjs/toolkit"

import { IPoolMetadata, IUserMetadata } from "./types"

interface IAddPool extends IPoolMetadata {
  poolId: string
  hash: string
}
// Add pools data
export const addPool = createAction<{ params: IAddPool }>("ipfs/add-pool")

interface IRemovePool {
  poolId: string
}
// Update pool data
export const removePool = createAction<{ params: IRemovePool }>(
  "ipfs/remove-pool"
)

// Add user data
export const addUser = createAction<{ params: IUserMetadata }>("ipfs/add-user")

// Update user data
export const removeUser = createAction<{ params: { hash: string } }>(
  "ipfs/remove-user"
)

// TODO: proposals
