import { MouseEventHandler } from "react"
import { Container, Icon } from "./styled"

interface Props {
  media: string
  onClick: MouseEventHandler
}

const IconButton: React.FC<Props> = ({ media, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Icon src={media} />
    </Container>
  )
}

export default IconButton
