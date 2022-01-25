import styled from "styled-components"
import { motion } from "framer-motion"

export const IconArea = styled(motion.div)`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background: rgba(90, 96, 113, 0.15);
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  position: fixed;
  right: 60px;
  top: 8px;
  padding: 2px 0 0 10px;
`

export const Icon = styled.img`
  margin: 0 3px;
`

export const Input = styled(motion.input)`
  appearance: none;
  border: none;
  background: transparent;
  width: fill-available;
  outline: none;

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
    width: "calc(100vw - 78px)",
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
    width: "150px",
    transitionEnd: {
      display: "inline",
      opacity: 1,
    },
  },
  hidden: {
    width: "0px",
    display: "none",
    opacity: 0,
  },
}
