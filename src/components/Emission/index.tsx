import { Flex } from "theme"
import {
  EmissionContainer,
  TotalEmission,
  CurrentEmission,
  EmissionBar,
} from "./styled"

interface IProps {
  total: any
  current: string
  percent: number
}

const Emission: React.FC<IProps> = ({ total, current, percent }) => {
  return (
    <EmissionContainer>
      <Flex full>
        <TotalEmission value={total} />
        <CurrentEmission value={current} />
      </Flex>
      <Flex p="7px 0 6px" full>
        <EmissionBar progress={percent} />
      </Flex>
    </EmissionContainer>
  )
}

export default Emission
