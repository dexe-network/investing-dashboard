enum Orientation {
  horizontal = "row",
  vertical = "column",
}

export interface IconProps {
  active?: boolean
}

export { Orientation }

export enum TradeType {
  EXACT_INPUT = 0,
  EXACT_OUTPUT = 1,
}
