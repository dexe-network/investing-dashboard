// import React, { useState, useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import useBlockNumber from "hooks/useBlockNumber"

const StyledBlockNumber = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  color: #2680eb;
  font-size: 14px;
  font-weight: bold;
`

const BlockNumber: React.FC = () => {
  const blockNumber = useBlockNumber()
  return <StyledBlockNumber>{blockNumber}</StyledBlockNumber>
}

export default BlockNumber
