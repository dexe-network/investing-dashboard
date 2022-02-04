import styled from "styled-components"
import { Flex, Text } from "theme"

export const Container = styled.div`
  padding: 30px 0 0;
`

export const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.5px;
  color: #9ae2cb;
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

export const DescriptionText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #c5d1dc;
  padding: 8px 0 38px;
  opacity: 0.9;
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
