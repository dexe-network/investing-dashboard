// import React, { useState, useRef } from "react"
import styled from "styled-components"
// import { motion } from "framer-motion"

export const Icon = styled.img<{ size?: number }>`
  height: ${(props) => (props.size ? props.size : 28)}px;
  width: ${(props) => (props.size ? props.size : 28)}px;
  border-radius: 50px;
  margin-right: 10px;
`

interface IProps {
  src: string
  size?: number
}

const TokenIcon: React.FC<IProps> = ({ src, size }) => {
  return <Icon src={src} size={size} />
}

export default TokenIcon
