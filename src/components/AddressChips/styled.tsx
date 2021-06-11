import { Flex, BaseButton, Text } from "theme"
import styled from "styled-components"

export const ChipsWrapper = styled(Flex)`
  flex-wrap: wrap;
`

export const TagItem = styled.div`
  background-color: #2f2f2f;
  display: inline-block;
  font-size: 16px;
  color: #999999;
  border-radius: 30px;
  height: 30px;
  padding: 9px 7px 5px 7px;
  display: inline-flex;
  align-items: center;
  margin: 0 0.3rem 0.3rem 0;
`

export const TagButton = styled(BaseButton)`
  background-color: transparent;
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
  font: inherit;
  margin-left: 6px;
  font-weight: bold;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorText = styled(Text)`
  color: #be0007;
  white-space: normal;
  font-weight: bold;
  padding: 5px 0;
`
