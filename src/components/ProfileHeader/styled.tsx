import styled from "styled-components"
import { Text, BaseButton } from "theme"

export const HeadContainer = styled.div`
  height: 49px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled(Text)`
  color: #f5f5f5;
  font-size: 24px;
  font-family: Gilroy;
  font-weight: 700;
  text-align: center;
`

export const FloatingButton = styled(BaseButton)<{
  position: "left" | "right"
}>`
  height: 44px;
  position: absolute;
  ${(props) => props.position}: 15px;
  top: 3px;
  background: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FloatingLabel = styled(Text)`
  color: #c2c3c4;
  font-size: 14px;
`
