import Jazzicon, { jsNumberForAddress } from "react-jazzicon"

interface IProps {
  size?: number
  address: string
  m?: string
}

const JazzIcon: React.FC<IProps> = ({ size, address, m }) => {
  return (
    <Jazzicon
      diameter={size ?? 28}
      seed={jsNumberForAddress(address)}
      paperStyles={{
        margin: m ?? "0 8px 0 0",
      }}
    />
  )
}

export default JazzIcon
