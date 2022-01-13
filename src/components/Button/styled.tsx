import styled from "styled-components"
import { BaseButton, device, Text } from "theme"
import { ButtonThemeType } from "./types"

export const GradientButton = styled(BaseButton)<{
  m?: string
  fz?: number
  full?: boolean
  color: ButtonThemeType
}>`
  position: relative;
  padding: 19px 9px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 5px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  margin: ${(props) => props.m || "0 auto"};
  min-width: fit-content;
  animation: changeButton 3s ease infinite;
  z-index: 20;
  overflow: hidden;

  &:hover {
    border-radius: 4px;
  }

  &:before {
    transition: all 0.3s ease-in-out;
    opacity: 0;
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, #a4ebd4 0%, #63b49b 100%);
  }

  &:after {
    transition: all 0.3s ease-in-out;
    opacity: 1;
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${(props) => props.theme.buttonGradients[props.color]};
  }

  /* &:hover {
      &:before {
        opacity: 1;
      }
      &:after {
        opacity: 0;
      }
    } */

  @media only screen and (${device.sm}) {
    font-size: 14px;
  }

  ${Text} {
    font-size: ${(props) => props.fz || 16}px;
    color: #202020;
    font-family: "Gilroy-Bold";
font-weight: 700;;
    z-index: 21;
  }
`

export const BuyButtonContainer = styled(BaseButton)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: rgb(164, 235, 211);
`

export const BuyArrow = styled.img`
  height: 15px;
  width: 15px;
`
