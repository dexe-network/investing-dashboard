import { motion } from "framer-motion"
import styled from "styled-components"
import { GradientBorder, Flex } from "theme"

const background = {
  black: "#08121a",
  grey: "#191F2C",
}

export const Container = styled(GradientBorder)<{ theme: "grey" | "black" }>`
  position: relative;
  border-radius: 10px;
  width: 100%;
  padding: 14px 16px;
  min-height: 50px;

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
