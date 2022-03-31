import styled from "styled-components"
import { BasicCard, Flex } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Card = styled(BasicCard)`
  flex-direction: column;
  padding: 20px 16px;
  position: relative;
`

export const CardHeader = styled(Flex)`
  width: 100%;
  padding: 4px 0 24px;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
`

export const IconsGroup = styled(Flex)`
  width: 120px;
`
