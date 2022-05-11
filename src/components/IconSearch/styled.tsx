import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex } from "theme"

export const SearchOverlay = styled(Flex)`
  position: fixed;
  top: 79px;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  z-index: 25;
  opacity: 0.1;
`

export const IconArea = styled(motion.div)`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  width: 24px;
  background: rgba(90, 96, 113, 0.15);
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  position: absolute;
  right: 60px;
  top: 4px;
  padding: 0 10px;
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  z-index: 10;
`

export const Input = styled(motion.input)`
  appearance: none;
  border: none;
  background: transparent;
  width: fill-available;
  width: -webkit-fill-available;
  outline: none;
  color: #e4f2ff;
  font-size: 14px;
  z-index: 10;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-family: Gilroy;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #6b747b;
  }
`

export const Divider = styled.div``

export const wrapperVariants = {
  visible: {
    width: "calc(100vw - 118px)",
    background: "rgba(90, 96, 113, 0.15)",
    boxShadow: "0px 7px 4px rgba(0, 0, 0, 0.07)",
  },
  hidden: {
    width: "50px",
    background: "rgba(90, 96, 113, 0)",
    boxShadow: "0px 7px 4px rgba(0, 0, 0, 0)",
  },
}

export const inputVariants = {
  visible: {
    transitionEnd: {
      display: "inline",
      opacity: 1,
    },
  },
  hidden: {
    display: "none",
    opacity: 0,
  },
}
