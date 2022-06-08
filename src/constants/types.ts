export enum Orientation {
  horizontal = "row",
  vertical = "column",
}

export interface IconProps {
  active?: boolean
}

export enum TradeType {
  EXACT_INPUT = 0,
  EXACT_OUTPUT = 1,
}


export type SwapDirection = "deposit" | "withdraw"

export enum UpdateListType {
  REMOVE = 0,
  ADD = 1,
}
