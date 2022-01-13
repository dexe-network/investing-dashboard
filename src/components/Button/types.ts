export type ButtonThemeType = "primary" | "warn" | "disabled"

export interface ButtonBaseProps {
  onClick?: () => void
  theme?: ButtonThemeType
}

export interface MainButtonProps extends ButtonBaseProps {
  m?: string
  fz?: number
  full?: boolean
}
