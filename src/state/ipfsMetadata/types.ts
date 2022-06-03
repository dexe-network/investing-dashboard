export interface IPoolMetadata {
  assets: string[]
  description: string
  strategy: string
  account: string
}

export interface IUserMetadata {
  hash: string
  assets: string[]
  name: string
  timestamp: number
  account: string
}
