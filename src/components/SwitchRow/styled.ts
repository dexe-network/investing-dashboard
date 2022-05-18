import styled from "styled-components"
import { Flex, Text } from "theme"

export const RowContainer = styled(Flex)`
  position: relative;
  width: 100%;
  align-items: center;
  padding: 24px 0;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 32px;
    right: 0;
    margin: auto;
    height: 1px;
    background: linear-gradient(
        89.66deg,
        rgba(254, 254, 255, 0.02) 0.07%,
        rgba(239, 247, 255, 0.06) 98.45%
      ),
      #232731;
    opacity: 0.4;
  }
`

export const InputText = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: right;
  color: #616d8b;
`

export const FormLabel = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #616d8b;

  margin-bottom: -2px;
  margin-left: 8px;
`
