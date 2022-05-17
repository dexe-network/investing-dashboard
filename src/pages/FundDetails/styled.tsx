import { Flex } from "theme"
import styled from "styled-components"

export const Container = styled.div`
  background: linear-gradient(64.44deg, #0e121b 32.35%, #0d121b 100%);
`

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const ContentContainer = styled(Flex).attrs(() => ({
  variants,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  transition: { duration: 0.2 },
}))`
  width: 100%;
  height: 100%;
  padding: 16px;
  flex-direction: column;
`
