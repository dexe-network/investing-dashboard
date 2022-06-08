import { Icon } from "./styled"

import defaultAvatar from "assets/icons/default-avatar.svg"

interface IProps {
  size?: number
  source?: string
  m?: string
}

const BaseIcon: React.FC<IProps> = ({ size, source, m }) => {
  return <Icon m={m || "0 8px 0 0"} src={source ?? defaultAvatar} size={size} />
}

export default BaseIcon
