import { motion } from "framer-motion"
import styled from "styled-components"
import { Flex, GradientBorder, Text } from "theme"

const background = {
  black: "#08121a",
  grey: "#191F2C",
}

export const Container = styled(GradientBorder)<{
  width?: string
  theme: "grey" | "black"
}>`
  position: relative;
  border-radius: 10px;
  width: 100%;

  &:after {
    background: ${({ theme }) => background[theme]};
  }
`

export const Area = styled(motion.textarea)`
  resize: none;
  box-sizing: border-box;
  position: relative;
  border: none;
  transition: all 0.2s;
  background: transparent;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #848a9a;
  height: 78px;
  width: 100%;
  padding: 19px 70px 19px 16px;

  &::placeholder {
    transition: all 0.2s;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #5a6071;
  }

  &:focus {
    outline: none;
    height: auto;
    height: 78px;

    &::placeholder {
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 0.5px;
      color: #5a6071;
    }
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

export const MaxLength = styled(Text)`
  position: absolute;
  right: 20px;
  bottom: 6px;
  max-width: 50px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: rgba(115, 146, 198, 0.2);
  text-align: right;
`
