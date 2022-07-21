import { motion } from "framer-motion"
import styled from "styled-components"
import { GradientBorder, Flex } from "theme"

const background = {
  black: "#08121a",
  grey: "#191F2C",
}

const height = {
  normal: "50px",
  small: "24px",
}

const padding = {
  normal: "14px 16px",
  small: "6px 8px",
}

const borderRadius = {
  normal: "10px",
  small: "15px",
}

export const Container = styled(GradientBorder)<{
  theme: "grey" | "black"
  size?: string
}>`
  position: relative;
  width: 100%;
  border-radius: ${(props) =>
    props.size ? borderRadius[props.size] : borderRadius.normal};
  padding: ${(props) => (props.size ? padding[props.size] : padding.normal)};
  min-height: ${(props) => (props.size ? height[props.size] : height.normal)};

  &:after {
    background: ${({ theme }) => background[theme]};
  }
`

export const Label = styled(Flex)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #616d8b;
  padding: 4px 8px;
  position: absolute;
  border-radius: 10px;
  width: fit-content;
`

export const LimitText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const InputField = styled(motion.input)`
  outline: none;
  appereance: none;
  background: transparent;
  border: none;
  width: fill-available;
  height: 16px;
  padding: 0;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;

  &::placeholder {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #616d8b;
  }
`
