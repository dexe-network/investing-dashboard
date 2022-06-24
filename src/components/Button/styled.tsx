import styled from "styled-components"
import { BaseButton, GradientBorder, Text } from "theme"
import { ButtonThemeType } from "./types"

const buttonHeights = {
  large: "56px",
  big: "48px",
  normal: "40px",
  small: "31px",
}

const buttonFontSizes = {
  large: "16px",
  big: "16px",
  normal: "16px",
  small: "14px",
}

const primaryTextColors = {
  disabled: "#616D8B",
  primary: "#202020",
  warn: "#202020",
}

const primaryBackgrounds = {
  disabled: "#616D8B",
  primary: "#9AE2CB",
  warn: "#DB6D6D",
}

export const Primary = styled(BaseButton)<{
  size?: string
  m?: string
  p?: string
  fz?: number
  full?: boolean
  disabled?: boolean
  color: ButtonThemeType
}>`
  position: relative;
  height: ${(props) =>
    props.size ? buttonHeights[props.size] : buttonHeights.normal};
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  box-sizing: border-box;
  margin: ${(props) => props.m || "0 auto"};
  min-width: fit-content;
  background: ${(props) => primaryBackgrounds[props.color]};

  ${Text} {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    color: ${(props) => primaryTextColors[props.color]};
    font-size: ${(props) =>
      props.size ? buttonFontSizes[props.size] : buttonFontSizes.normal};
  }
`

export const Secondary = styled(GradientBorder)<{
  size?: string
  m?: string
  p?: string
  fz?: number
  full?: boolean
  disabled?: boolean
  color: ButtonThemeType
}>`
  position: relative;
  padding: 0 8px;
  height: ${(props) =>
    props.size ? buttonHeights[props.size] : buttonHeights.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.1s ease-in-out;
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  box-sizing: border-box;
  margin: ${(props) => props.m || "0 auto"};
  min-width: fit-content;
  animation: changeButton 3s ease infinite;
  z-index: 20;

  &:after {
    background: #181e2c;
  }

  ${Text} {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) =>
      props.size ? buttonFontSizes[props.size] : buttonFontSizes.normal};
    line-height: 22px;
    letter-spacing: 0.1px;

    color: #788ab4;
    z-index: 21;
  }
`

export const ButtonText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.1px;
  color: #232830;
`
