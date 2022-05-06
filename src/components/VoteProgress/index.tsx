import { FC } from "react"
import { Container, TrackerPart, UpFill, DownFill } from "./styled"

interface Props {
  up?: number
  down?: number
}

const VoteProgress: FC<Props> = ({ up, down }) => {
  return (
    <Container>
      <TrackerPart>
        <UpFill percent={up} />
      </TrackerPart>
      <TrackerPart>
        <DownFill percent={down} />
      </TrackerPart>
    </Container>
  )
}

export default VoteProgress
