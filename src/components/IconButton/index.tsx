import { Container, Icon } from "./styled"

interface Props {
  media: string
  onClick: () => void
}

const IconButton: React.FC<Props> = ({ media, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Icon src={media} />
    </Container>
  )
}

export default IconButton
