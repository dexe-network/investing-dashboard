import React, { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { RingSpinner } from "react-spinners-kit"
import styled from "styled-components"

import unknown from "assets/icons/Unknown.svg"
import dexe from "assets/icons/dexe.svg"

export const Icon = styled.img<{ size?: number; m: string }>`
  height: ${(props) => (props.size ? props.size : 28)}px;
  width: ${(props) => (props.size ? props.size : 28)}px;
  min-height: ${(props) => (props.size ? props.size : 28)}px;
  min-width: ${(props) => (props.size ? props.size : 28)}px;
  border-radius: 50px;
  margin: ${(props) => props.m};
  border: 2px solid #171b1f;
`

export const Loader = styled.div<{ size?: number; m: string }>`
  height: ${(props) => (props.size ? props.size : 28)}px;
  width: ${(props) => (props.size ? props.size : 28)}px;
  min-height: ${(props) => (props.size ? props.size : 28)}px;
  min-width: ${(props) => (props.size ? props.size : 28)}px;
  margin: ${(props) => props.m};
  border-radius: 50px;
  border: 2px solid #171b1f;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
`

interface IProps {
  size?: number
  address?: string
  m?: string
}

const getIconsPathByChain = (id, address) => {
  if (!address) return

  const a = address.toLowerCase()

  if (a === "0xa651edbbf77e1a2678defae08a33c5004b491457") {
    return dexe
  }
  if (id === 97) {
    return `https://pancake.kiemtienonline360.com/images/coins/${a}.png`
  }
  return `https://pancake.kiemtienonline360.com/images/coins/${a}.png`
}

const TokenIcon: React.FC<IProps> = ({ size, address, m }) => {
  const [srcImg, setImg] = useState(unknown)
  const [isLoading, setLoadingState] = useState(true)
  const { chainId } = useWeb3React()

  const src = getIconsPathByChain(chainId, address)

  useEffect(() => {
    if (!src) return

    const token = new Image()
    token.src = src

    const imageLoad: any = token.addEventListener("load", () => {
      setImg(src)
      setLoadingState(false)
    })

    const imageError: any = token.addEventListener("error", () => {
      setImg(unknown)
      setLoadingState(false)
    })

    return () => {
      token.removeEventListener(imageLoad, imageError)
    }
  }, [src])

  if (isLoading) {
    return (
      <Loader m={m || "0 8px 0 0"} size={size}>
        <RingSpinner color="#A4EBD4" size={20} />
      </Loader>
    )
  }

  return <Icon m={m || "0 8px 0 0"} src={srcImg} size={size} />
}

export default TokenIcon
