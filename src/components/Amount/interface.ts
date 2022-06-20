import { ReactNode } from "react"

export interface IAmountStyle {
  fz?: string
  lh?: string
}

export interface IAmountSharedProps extends IAmountStyle {
  value: ReactNode
  symbol?: ReactNode
  m?: string
}
