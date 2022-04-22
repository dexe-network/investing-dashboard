import styled from "styled-components"
import { Flex } from "theme"
import { motion } from "framer-motion"

export const Container = styled(motion.div)`
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
  bottom: 0;
  margin: auto;
  height: fit-content;
  z-index: 100;
  padding: 0;
`

export const Overlay = styled(motion.div)`
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(6px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  height: 100%;
  width: 100%;
`

export const Head = styled(Flex)`
  width: fill-available;
  jutsify-content: space-between;
  align-items: center;
  padding: 24px 16px;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
`

export const Close = styled.img``
