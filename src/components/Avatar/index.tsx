// import React, { useState, useRef } from "react"
import styled from "styled-components"
// import { motion } from "framer-motion"

interface Props {
  url: string
  size?: number
}

const Img = styled.img<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 50px;
`

const Avatar: React.FC<Props> = ({ url, size = 28 }) => {
  return <Img src={url} size={size} />
}

export default Avatar
