import styled from "styled-components"
import { Flex, ease, device, rotateVariants } from "theme"
import { motion } from "framer-motion"

export const Container = styled.div`
  padding: 16px 16px 50px;
  height: -webkit-fill-available;
  overflow-y: auto;
  overflow-x: hidden;
`

export const ButtonContainer = styled(Flex)`
  padding: 8px 0 16px;
  justify-content: space-around;
  width: 100%;
`

export const Details = styled.div`
  padding: 16px;
  background: linear-gradient(64.44deg, #24272f 32.35%, #333a48 100%);
  border-radius: 10px;
  margin-top: 27px;
`
