import { Text } from "theme"
import arrow from "assets/icons/buy-button-arrow.svg"
import { ButtonBaseProps, MainButtonProps } from "./types"
import {
  GradientButton,
  GradientButtonText,
  SecondaryContainer,
  BuyButtonContainer,
  BuyArrow,
  BorderedContainer,
} from "./styled"

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
    <GradientButton
      size={size}
      m={m}
      onClick={onClick}
      fz={fz}
      full={full}
      color={theme}
    >
      <GradientButtonText>{children}</GradientButtonText>
    </GradientButton>
  )
}

export default Button

export const SecondaryButton: React.FC = ({ children }) => {
  return <SecondaryContainer>{children}</SecondaryContainer>
}

// BUY BUTTON placed on pool card component

export const BuyButton: React.FC<ButtonBaseProps> = ({ onClick }) => {
  return (
    <BuyButtonContainer onClick={onClick}>
      <BuyArrow src={arrow} alt="" />
    </BuyButtonContainer>
  )
}

// BORDERED BUTTON

export const BorderedButton: React.FC = ({ children }) => {
  return <BorderedContainer>{children}</BorderedContainer>
}
