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

export const Block = styled(Flex)`
  position: relative;
  background: linear-gradient(
    270deg,
    rgba(51, 62, 64, 0.5) 0%,
    rgba(128, 128, 128, 0.5) 100%
  );
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  height: 95px;
  width: 100%;
  margin: 5px 0;
  justify-content: space-around;
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
  font-weight: bold;
  font-size: 32px;
  color: #f7f7f7;
`
export const Pnl = styled(Text)<{ side: "BUY" | "SELL" }>`
  font-size: 12px;
  color: ${(props) => (props.side === "BUY" ? "#7FFFD4" : "#FF7F7F")};
`
