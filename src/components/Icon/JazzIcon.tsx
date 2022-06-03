import Jazzicon, { jsNumberForAddress } from "react-jazzicon"

interface IProps {
  size?: number
  address: string
  m?: string
  paperStyles?: { [key: string]: React.CSSProperties }
}

const JazzIcon: React.FC<IProps> = ({ size, address, m, paperStyles }) => {
  return (
    <Jazzicon
      diameter={size ?? 28}
      seed={jsNumberForAddress(address)}
      paperStyles={{
        margin: m ?? "0",
        ...(paperStyles !== null ? paperStyles : {}),
      }}
    />
  )
}

export default JazzIcon
