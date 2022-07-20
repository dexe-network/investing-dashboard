import { MouseEvent } from "react"

export type ButtonThemeType = "primary" | "warn" | "disabled"

export interface ButtonBaseProps {
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void
  theme?: ButtonThemeType
}

export interface MainButtonProps extends ButtonBaseProps {
  size?: "normal" | "big" | "small" | "large"
  m?: string
  br?: string
  fz?: number
  full?: boolean
}
