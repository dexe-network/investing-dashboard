import styled from "styled-components"
import { Text, BaseButton } from "theme"

export const HeadContainer = styled.div`
  touch-action: none;
  user-select: none;
  height: 50px;
  width: 100%;
  background: #1e212a;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const FloatingLabel = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #5a6071;
  transform: translateY(2px);
  padding-right: 5px;
`
