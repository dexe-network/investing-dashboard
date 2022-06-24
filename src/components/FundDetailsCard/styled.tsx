import styled from "styled-components"

import { Flex } from "theme"
import ArrowOutlineRight from "assets/icons/ArrowOutlineRight"

export const Container = styled.div`
  padding: 30px 0 0;
  width: 100%;
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

export const ValueLabel = styled.div`
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

export const EmptyDescription = styled.div`
  min-height: 80px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.03em;
  color: #616d8b;
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

export const ArrowIcon = styled(ArrowOutlineRight)`
  width: 4.7px;
  height: 8px;
  margin-left: 6px;
`
