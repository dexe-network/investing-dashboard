import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled.div`
  width: 100%;
`

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
