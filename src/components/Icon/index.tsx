import { useState, useEffect } from "react"

import IconLoader from "./IconLoader"
import BaseIcon from "./BaseIcon"
import IpfsIcon from "./IpfsIcon"
import JazzIcon from "./JazzIcon"

interface IProps {
  size?: number
  hash?: string
  source?: string
  address?: string
  m?: string
}

enum IconType {
  BaseIcon = "BaseIcon",
  IpfsIcon = "IpfsIcon",
  JazzIcon = "JazzIcon",
}

const Icon: React.FC<IProps> = ({ m, size, hash, source, address }) => {
  const [type, setType] = useState(IconType.BaseIcon)
  const [isLoading, setLoadingState] = useState(true)

  useEffect(() => {
    if (!source && !hash && !address) {
      setType(IconType.BaseIcon)
    } else if (source && source.length > 0) {
      setType(IconType.BaseIcon)
    } else if (hash && hash.length === 42) {
      setType(IconType.IpfsIcon)
    } else if (address && address.length === 42) {
      setType(IconType.JazzIcon)
    } else {
      setType(IconType.BaseIcon)
    }
    setLoadingState(false)
  }, [address, hash, source])

  if (isLoading) {
    return <IconLoader m={m} size={size} />
  }

  switch (type) {
    case IconType.IpfsIcon:
      return <IpfsIcon m={m} size={size} hash={hash} />
    case IconType.JazzIcon:
      return <JazzIcon m={m} size={size} address={address!} />
    case IconType.BaseIcon:
    default:
      return <BaseIcon m={m} size={size} source={source} />
  }
}

export default Icon
