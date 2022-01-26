import styled from "styled-components"
import { BaseButton, device, Text } from "theme"
import { ButtonThemeType } from "./types"

const buttonSizes = {
  normal: "12px 9px 13px",
  small: "9px 39px 9px",
}

export const GradientButton = styled(BaseButton)<{
  size?: string
  m?: string
  p?: string
  fz?: number
  full?: boolean
  color: ButtonThemeType
}>`
  position: relative;
  padding: ${(props) =>
    props.size ? buttonSizes[props.size] : buttonSizes.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  margin: ${(props) => props.m || "0 auto"};
  min-width: fit-content;
  animation: changeButton 3s ease infinite;
  z-index: 20;
  overflow: hidden;
  background: linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${Text} {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1px;

    color: #202020;
    z-index: 21;
  }
`

export const SecondaryContainer = styled(BaseButton)`
  padding: 10px 10px 11px 10px;
  background: #22252c;
  border-radius: 6px;
  border: 1px solid #303a4a;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #5a6575;
`

export const GradientButtonText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.1px;
  color: #232830;
`

// BUY BUTTON

export const BuyButtonContainer = styled(BaseButton)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: rgb(164, 235, 211);
`

export const BuyArrow = styled.img`
  height: 15px;
  width: 15px;
`

// BORDERED BUTTON

export const BorderedContainer = styled(BaseButton)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  /* or 100% */
  color: #2680eb;

  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  border-radius: 6px;
  // border: 1px solid #2680eb;
  height: 47px;
  white-space: nowrap;
`
