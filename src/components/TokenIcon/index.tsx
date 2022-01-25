import React, { useState, useEffect } from "react"
import styled from "styled-components"
import defaultAvatar from "assets/icons/default-avatar.svg"
import unknown from "assets/icons/Unknown.svg"
import { useWeb3React } from "@web3-react/core"
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
  size?: number
  address?: string
}

const getIconsPathByChain = (id, address) => {
  if (!address) return

  const a = address.toLowerCase()
  if (id === 97) {
    return `https://pancake.kiemtienonline360.com/images/coins/${a}.png`
  }
  return `https://pancake.kiemtienonline360.com/images/coins/${a}.png`
}

const TokenIcon: React.FC<IProps> = ({ size, address }) => {
  const [srcImg, setImg] = useState(unknown)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { chainId } = useWeb3React()

  const src = getIconsPathByChain(chainId, address)

  useEffect(() => {
    const token = new Image()
    token.src = src || unknown

    const imageLoad: any = token.addEventListener("load", () => {
      setImg(src || unknown)
      setLoaded(true)
    })

    const imageError: any = token.addEventListener("error", () => {
      setError(true)
    })

    return () => {
      token.removeEventListener(imageLoad, imageError)
    }
  }, [src])

  if (src === unknown || !src) {
    // change icon if token dexe
    return <Icon src={defaultAvatar} size={size} />
  }

  return <Icon src={srcImg} size={size} />
}

export default TokenIcon
