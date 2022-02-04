// import React, { useState, useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const Container = styled(motion.div)<{ active?: boolean }>``

const Tab = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: #5a6071;
`

const TabsLight: React.FC = () => {
  return (
    <Container>
      <Tab>TabsLight</Tab>
      <Tab>TabsLight</Tab>
    </Container>
  )
}

export default TabsLight
