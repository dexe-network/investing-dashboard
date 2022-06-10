import { MainButtonProps } from "./types"
import { Primary, ButtonText, Secondary } from "./styled"

// MAIN, DEFAULT BUTTON

const Button: React.FC<MainButtonProps> = ({
  size = "normal",
  m,
  fz,
  full,
  theme = "primary",
  children,
  onClick,
}) => {
  return (
    <Primary
      size={size}
      m={m}
      onClick={onClick}
      fz={fz}
      full={full}
      color={theme}
    >
      <ButtonText>{children}</ButtonText>
    </Primary>
  )
}

export default Button

export const SecondaryButton: React.FC<MainButtonProps> = ({
  size = "normal",
  m,
  fz,
  full,
  theme = "primary",
  children,
  onClick,
}) => {
  const handleClick = () => {
    if (theme === "disabled") {
      return
    }

    onClick && onClick()
  }
  return (
    <Secondary
      size={size}
      m={m}
      onClick={handleClick}
      fz={fz}
      full={full}
      color={theme}
    >
      <ButtonText>{children}</ButtonText>
    </Secondary>
  )
}
