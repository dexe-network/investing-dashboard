// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import styled from "styled-components"
import { BaseButton, device, Text } from "theme"

const GradientButton = styled(BaseButton)<{
  fz?: number
  full?: boolean
  theme?: "primary" | "warn"
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
  animation: changeButton 3s ease infinite;
  z-index: 20;
  overflow: hidden;

  &:hover {
    border-radius: 4px;
  }

  &:before {
    transition: all 0.3s ease-in-out;
    opacity: ${(props) => (props.theme === "primary" ? "0.75" : "0")};
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      rgba(127, 255, 212, 1) 0%,
      rgba(38, 128, 235, 1) 100%
    );
  }

  &:after {
    transition: all 0.3s ease-in-out;
    opacity: ${(props) => (props.theme === "primary" ? "0" : "1")};
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      rgba(127, 255, 212, 0.75) 0%,
      rgba(255, 127, 127, 0.75) 100%
    );
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }

  @media only screen and (${device.sm}) {
    font-size: 14px;
  }

  ${Text} {
    font-size: ${(props) => props.fz || 16}px;
    color: #202020;
    font-weight: 800;
    z-index: 21;
  }
`

const Button: React.FC<{
  fz?: number
  full?: boolean
  theme?: "primary" | "warn"
  onClick?: () => void
}> = ({ fz, full, theme = "primary", children, onClick }) => {
  return (
    <GradientButton onClick={onClick} fz={fz} full={full} theme={theme}>
      <Text>{children}</Text>
    </GradientButton>
  )
}

export default Button
