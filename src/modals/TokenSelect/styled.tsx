import styled from "styled-components"
import { Flex } from "theme"
import { motion } from "framer-motion"

export const Container = styled(motion.div)`
  border-radius: 10px;
  position: absolute;
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
  border-radius: 10px;
  top: 210px;
  left: 16px;
  right: 16px;
  z-index: 100;
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
  width: 100%;
  jutsify-content: space-between;
`

export const Title = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height, or 127% */

  letter-spacing: 0.35px;

  /* Text / main */

  color: #c5d1dc;
`

export const Close = styled.img``
