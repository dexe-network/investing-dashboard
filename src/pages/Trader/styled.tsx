import styled from "styled-components"
import { Flex, Text } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  padding: 16px 16px 80px;
  flex-direction: column;
  justify-cotnent: flex-start;
  overflow-y: auto;
  height: 100%;
`

export const ButtonContainer = styled(Flex)`
  padding: 8px 0 16px;
  justify-content: space-around;
  width: 100%;
`

export const AreaWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0.5;
`

export const Buttons = styled(Flex)`
  width: 100%;
  justify-self: flex-end;
  margin-top: auto;
`

export const Section = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

export const HalfBlock = styled(Flex)`
  flex-direction: column;
  align-items: space-around;
  height: 100%;
  width: 100%;
  padding: 10px 0;
`

export const Label = styled(Text)`
  text-align: center;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #5a6071;
`
export const Value = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  text-align: center;
  color: #f7f7f7;
`
export const Pnl = styled(Text)<{ side: "BUY" | "SELL" }>`
  font-size: 12px;
  color: ${(props) => (props.side === "BUY" ? "#7FFFD4" : "#FF7F7F")};
`
