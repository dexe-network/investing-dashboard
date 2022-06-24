import styled from "styled-components"
import { Flex } from "theme"

enum LABEL_TYPE {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

const LabelColor = {
  [LABEL_TYPE.LIGHT]: "#E4F2FF",
  [LABEL_TYPE.DARK]: "#616D8B",
}
const LabelWeight = {
  [LABEL_TYPE.LIGHT]: 600,
  [LABEL_TYPE.DARK]: 400,
}

const Label = styled.div<{ type: LABEL_TYPE }>`
  font-family: Gilroy;
  font-style: normal;
  font-weight: ${({ type }) => LabelWeight[type]};
  font-size: 13px;
  line-height: 130%;
  color: ${({ type }) => LabelColor[type]};
`

export const EmissionGreen = styled.div`
  color: #9ae2cb;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 130%;
  margin-left: 4px;
`

const BarContainer = styled.div`
  width: 100%;
  height: 3px;
  background: #1b212d;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`

const BarProgress = styled.div<{ w: string }>`
  height: 3px;
  background: linear-gradient(65.03deg, #a4ebd4 12.07%, #63b49b 78.73%);
  box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
    0px 2px 5px rgba(164, 235, 212, 0.14);
  border-radius: 6px;
  width: ${(props) => props.w || "0%"};
`

export const EmissionContainer = styled.div`
  width: 100%;
`

export const CurrentEmission = ({ value }) => {
  return (
    <Flex>
      <Label type={LABEL_TYPE.DARK}>Left</Label>
      <EmissionGreen>{value}</EmissionGreen>
    </Flex>
  )
}

export const TotalEmission = ({ value }) => {
  return (
    <Flex>
      <Label type={LABEL_TYPE.LIGHT}>Emission</Label>
      <EmissionGreen>{value}</EmissionGreen>
    </Flex>
  )
}

export const EmissionBar = ({ progress }) => {
  return (
    <BarContainer>
      <BarProgress w={`${progress}%`} />
    </BarContainer>
  )
}
