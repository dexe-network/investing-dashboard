export interface IPost {
  description: string
  comments: number[]
  created_at: string
}

export interface IPostGroup {
  id: string
  symbol: string
  name: string
  price: string
  pnl: number
  posts: IPost[]
}
