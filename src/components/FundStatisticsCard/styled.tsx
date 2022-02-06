import styled from "styled-components"
import { Flex, Text } from "theme"

export const Container = styled.div``

export const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: #9ae2cb;
`
export const LabelIcon = styled.img`
  transform: translate(0, 2px);
`

export const SecondaryLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #5a6071;
`

const ValueLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  color: #c5d1dc;
`

const InfoContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  padding-top: 15px;
`

export const InfoRow = ({ label, value }) => {
  return (
    <InfoContainer>
      <SecondaryLabel>{label}</SecondaryLabel>
      <ValueLabel>{value}</ValueLabel>
    </InfoContainer>
  )
}

export const Icon = styled.img`
  height: 21px;
  transform: translateY(-4px);
`

// EMMISSION

export const EmissionGreen = styled.div`
  color: #62cdb1;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  margin-left: 5px;
`

const BarContainer = styled.div`
  background: #252a35;
  border-radius: 4px;
  height: 10px;
  width: 100%;
`

const BarProgress = styled.div<{ w: string }>`
  height: 10px;
  background: linear-gradient(90deg, #a4ebd4 0%, rgba(164, 235, 212, 0) 80.82%);
  border-radius: 6px;
  width: ${(props) => props.w || "0%"};
`

const EmissionContainer = styled.div`
  width: 100%;
`

const CurrentEmission = ({ value }) => {
  return (
    <Flex>
      <SecondaryLabel>current</SecondaryLabel>
      <EmissionGreen>{value}</EmissionGreen>
    </Flex>
  )
}

const TotalEmission = ({ value }) => {
  return (
    <Flex>
      <ValueLabel>Emission</ValueLabel>
      <EmissionGreen>{value}</EmissionGreen>
    </Flex>
  )
}

const EmissionBar = ({ progress }) => {
  return (
    <BarContainer>
      <BarProgress w={`${progress}%`} />
    </BarContainer>
  )
}

export const Emission: React.FC<{
  total: any
  current: string
  percent: number
}> = ({ total, current, percent }) => {
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
