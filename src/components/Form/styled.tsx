import styled from "styled-components"
import { Flex, Text, BaseButton } from "theme"
import pen from "assets/icons/pencil-edit.svg"

const Container = styled(Flex)<{ withBottom?: boolean }>`
  background: rgba(37, 42, 53, 0.5);
  border-radius: ${(props) => (props.withBottom ? "6px 6px 0 0" : "6px")};
  height: 47px;
  flex: 1;
  width: 100%;
  padding: 0 12px;
  &:nth-child(2) {
    margin-left: 8px;
  }
`

export const FormLabelGreen = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #63b49b;
`

const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 41px;
  color: #5a6071;
`

const Value = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 41px;
  text-align: right;
  letter-spacing: 0.5px;
  color: #c5d1dc;
`

export const Input = ({ label, value }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  )
}

const Pen = styled.img`
  transform: translateY(-2px);
`

export const IconInput = ({ label, value, symbol }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Flex>
        <Value>{value}</Value>
        <Flex p="0 0 0 5px">
          <Label>{symbol}</Label>
        </Flex>
        <Pen src={pen} />
      </Flex>
    </Container>
  )
}

const DescriptionContainer = styled.div`
  padding: 14px;
  width: 100%;
  background: rgba(37, 42, 53, 0.5);
  border-radius: 0px 0px 6px 6px;
  border-top: 1px solid #2b3039;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  /* or 16px */

  color: rgba(197, 209, 220, 0.9);
`

const DescriptionWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
`

export const AreaInput = ({ label, value, description }) => {
  return (
    <DescriptionWrapper>
      <Container withBottom={!!description.length}>
        <Label>{label}</Label>
        <Flex>
          <Label>{value}</Label>
          <Pen src={pen} />
        </Flex>
      </Container>
      {!!description.length && (
        <DescriptionContainer>{description}</DescriptionContainer>
      )}
    </DescriptionWrapper>
  )
}
