import styled from "styled-components"
import { Flex, Text } from "theme"

export const Card = styled.a`
  text-decoration: none;
  cursor: pointer;
  margin: 5px 0;
  width: 100%;
  min-height: 104px;
  border-radius: 7px;
  background: linear-gradient(
    225deg,
    rgba(55, 65, 70, 1) -50%,
    rgba(56, 55, 78, 1) 100%
  );
`

export const Header = styled(Flex)``

export const Time = styled(Text)`
  color: #707070;
`

export const Title = styled(Text)`
  color: #f5f5f5;
  font-family: "Gilroy-Bold";
font-weight: 700;;
  text-overflow: ellipsis;
  white-space: normal;
`

export const Description = styled(Text)`
  color: #f5f5f5;
  font-family: "Gilroy-Light";
font-weight: 300;
  text-overflow: ellipsis;
  white-space: normal;
`

export const Body = styled(Flex)`
  max-height: 55px;
  overflow: hidden;
`
