import { motion } from "framer-motion"
import styled from "styled-components"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const Container = styled(motion.div).attrs(() => ({
  variants,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  transition: { duration: 0.2 },
}))`
  margin: 0 auto;
  width: fill-available;
  height: calc(100vh - 94px);
  overflow-y: auto;
  background-color: #040a0f;

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`
