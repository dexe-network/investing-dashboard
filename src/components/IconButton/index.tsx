import { MouseEventHandler } from "react"
import { Container, Icon } from "./styled"

interface Props {
  media: string
  filled?: boolean
  size?: number
  onClick?: MouseEventHandler
}

const IconButton: React.FC<Props> = ({
  media,
  filled = false,
  size = 14,
  onClick,
}) => {
  return (
    <Container withBackground={filled} onClick={onClick}>
      <Icon size={size} src={media} />
    </Container>
  )
}

export default IconButton
