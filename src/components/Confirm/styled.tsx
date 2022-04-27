import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex, GradientBorder } from "theme"

export const Overlay = styled(motion.div)`
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(6px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  height: 100%;
  width: 100%;
  z-index: 104;
`

export const Container = styled(GradientBorder)`
  margin: 0 auto;
  border-radius: 16px;
  position: absolute;
  transform: translateY(-60%);
  top: 50%;
  left: 16px;
  right: 16px;
  height: fit-content;
  width: 343px;
  box-sizing: border-box;
  padding: 24px 16px;
  z-index: 105;
  flex-direction: column;
`

export const Header = styled(Flex)`
  width: fill-available;
  justify-content: center;
  position: relative;
`

export const Content = styled(Flex)`
  width: fill-available;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  justify-self: center;
  color: #e4f2ff;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: -2px;
`
