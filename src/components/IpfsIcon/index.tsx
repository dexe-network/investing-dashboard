import React, { useState, useEffect } from "react"
import styled from "styled-components"
import defaultAvatar from "assets/icons/default-avatar.svg"
import unknown from "assets/icons/Unknown.svg"
import { parsePoolData } from "utils/ipfs"
import { RingSpinner } from "react-spinners-kit"

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
  hash?: string
  source?: string
  m?: string
}

const IpfsIcon: React.FC<IProps> = ({ size, hash, source, m }) => {
  const [src, setSrc] = useState("")
  const [srcImg, setImg] = useState(unknown)
  const [isLoading, setLoadingState] = useState(true)

  useEffect(() => {
    if (!hash) {
      setSrc(defaultAvatar)
      return
    }

    ;(async () => {
      const data = await parsePoolData(hash)
      if (
        data &&
        data.assets &&
        data.assets.length &&
        data.assets[data.assets.length - 1] !== ""
      ) {
        setSrc(data.assets[data.assets.length - 1])
      } else {
        setSrc(defaultAvatar)
      }
    })()
  }, [hash])

  useEffect(() => {
    if (!source || hash) return
    setSrc(source)
  }, [source, hash])

  useEffect(() => {
    if (!src) return

    const token = new Image()
    token.src = src

    const imageLoad: any = token.addEventListener("load", () => {
      setImg(src)
      setLoadingState(false)
    })

    const imageError: any = token.addEventListener("error", () => {
      setImg(defaultAvatar)
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

export default IpfsIcon
