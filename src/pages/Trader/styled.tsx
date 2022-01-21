import styled from "styled-components"
import { Flex, Text } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  padding: 33px 22px;
  flex-direction: column;
  min-height: fill-available;
  max-height: fill-available;
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  overflow-y: auto;
  justify-content: space-between;
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
  color: #c2c3c4;
  font-size: 13px;
`
export const Value = styled(Text)`
  font-family: Gilroy;
  font-weight: 700;
  font-size: 32px;
  color: #f7f7f7;
`
export const Pnl = styled(Text)<{ side: "BUY" | "SELL" }>`
  font-size: 12px;
  color: ${(props) => (props.side === "BUY" ? "#7FFFD4" : "#FF7F7F")};
`
