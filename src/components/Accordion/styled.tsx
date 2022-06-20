import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex } from "theme"

export const AccordionContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

export const AccordionHeader = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  cursor: pointer;
`

export const AccordionTitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #788ab4;
  margin-right: 8px;
`

export const AccordionIcon = styled(motion.img)`
  width: 16px;
  height: 16px;
`

export const AccordionSummary = styled(motion.div)`
  width: 100%;
  padding-right: 16px;
`
