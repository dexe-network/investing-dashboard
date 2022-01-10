// import React, { useState, useRef } from "react"
import styled from "styled-components"
import defaultAvatar from "assets/icons/default-avatar.svg"
// import { motion } from "framer-motion"

export const Icon = styled.img<{ size?: number }>`
  height: ${(props) => (props.size ? props.size : 28)}px;
  width: ${(props) => (props.size ? props.size : 28)}px;
  min-height: ${(props) => (props.size ? props.size : 28)}px;
  min-width: ${(props) => (props.size ? props.size : 28)}px;
  border-radius: 50px;
  margin-right: 8px;
`

interface IProps {
  src?: string
  size?: number
}

const TokenIcon: React.FC<IProps> = ({ src, size }) => {
  if (
    src ===
      "https://tokens.1inch.exchange/0xde4ee8057785a7e8e800db58f9784845a5c2cbd6.png" ||
    !src
  ) {
    // change icon if token dexe
    return <Icon src={defaultAvatar} size={size} />
  }

  return <Icon src={src} size={size} />
}

export default TokenIcon
