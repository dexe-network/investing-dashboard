import { Text } from "theme"
import { GradientButton, BuyButtonContainer, BuyArrow } from "./styled"
import arrow from "assets/icons/buy-button-arrow.svg"
import { ButtonBaseProps, MainButtonProps } from "./types"

// MAIN, DEFAULT BUTTON

const Button: React.FC<MainButtonProps> = ({
  m,
  fz,
  full,
  theme = "primary",
  children,
  onClick,
}) => {
  return (
    <GradientButton m={m} onClick={onClick} fz={fz} full={full} color={theme}>
      <Text>{children}</Text>
    </GradientButton>
  )
}

export default Button

// BUY BUTTON placed on pool card component

export const BuyButton: React.FC<ButtonBaseProps> = ({ onClick }) => {
  return (
    <BuyButtonContainer onClick={onClick}>
      <BuyArrow src={arrow} alt="" />
    </BuyButtonContainer>
  )
}
