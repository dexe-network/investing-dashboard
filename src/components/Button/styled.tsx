import styled from "styled-components"
import { BaseButton, device, GradientBorder, Text } from "theme"
import { ButtonThemeType } from "./types"

const buttonHeights = {
  large: "56px",
  big: "48px",
  normal: "40px",
  small: "31px",
}

const buttonColors = {
  disabled: "",
  primary: "linear-gradient(64.44deg, #63B49B 12.29%, #A4EBD4 76.64%)",
  warn: "linear-gradient(202.28deg, #E77171 4.69%, #B63636 88.18%)",
}

const buttonFontSizes = {
  large: "16px",
  big: "16px",
  normal: "16px",
  small: "14px",
}

const borderedButtonSizes = {
  big: "12px 23px 12px",
  normal: "10px 23px 11px",
  small: "7px 37px 7px",
}

const secondarySizes = {
  normal: "13px 25px 15px 25px",
  small: "10px 10px 11px 10px",
}

const secondaryColors = {
  disabled: "#616D8B",
  primary: "#e4f2ff",
  warn: "#e4f2ff",
}

export const GradientBorderButton = styled(GradientBorder)<{
  size?: string
  m?: string
  p?: string
  fz?: number
  full?: boolean
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
  cursor: pointer;
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  box-sizing: border-box;
  margin: ${(props) => props.m || "0 auto"};
  min-width: fit-content;

  ${Text} {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: ${(props) => secondaryColors[props.color]};
    font-size: ${(props) =>
      props.size ? buttonFontSizes[props.size] : buttonFontSizes.normal};
  }
`

export const GradientButton = styled(BaseButton)<{
  size?: string
  m?: string
  p?: string
  fz?: number
  full?: boolean
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
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  box-sizing: border-box;
  margin: ${(props) => props.m || "0 auto"};
  min-width: fit-content;
  animation: changeButton 3s ease infinite;
  z-index: 20;
  overflow: hidden;
  background: ${(props) => buttonColors[props.color || "primary"]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

  ${Text} {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) =>
      props.size ? buttonFontSizes[props.size] : buttonFontSizes.normal};
    line-height: 22px;
    letter-spacing: 0.1px;

    color: #202020;
    z-index: 21;
  }
`

export const SecondaryContainer = styled(BaseButton)<{ size: string }>`
  padding: ${(props) => secondarySizes[props.size]};
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
  color: #c5d1dc;
  width: 100%;
  margin-left: 16px;
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

export const BorderedContainer = styled(BaseButton)<{ size?: string }>`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  /* identical to box height, or 110% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.5px;
  padding: ${(props) =>
    props.size ? borderedButtonSizes[props.size] : borderedButtonSizes.normal};

  color: #5a6071;
  border-radius: 6px;
  white-space: nowrap;
  border: 2px solid #5a6071;
  width: fill-available;
`
