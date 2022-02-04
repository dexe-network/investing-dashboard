import styled from "styled-components"
import { Flex, ease, device, rotateVariants } from "theme"
import { motion } from "framer-motion"

export const Container = styled(motion.div)`
  padding: 16px 16px 50px;
  height: -webkit-fill-available;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`

export const ButtonContainer = styled(Flex)`
  padding: 8px 0 16px;
  justify-content: space-around;
  width: 100%;
`

export const Details = styled.div`
  padding: 16px;
  background: linear-gradient(64.44deg, #1f232c 32.35%, #282f3f 100%);
  border-radius: 10px;
  margin-top: 27px;
`
