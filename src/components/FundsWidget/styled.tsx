import styled from "styled-components"
import { Flex, Text } from "theme"

export const HalfBlock = styled(Flex)`
  flex-direction: column;
  align-items: space-around;
  height: 100%;
  width: 100%;
  padding: 20px 0;
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
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: ${(props) =>
    props.side === "BUY" ? "#7FFFD4" : "rgba(238, 76, 76, 0.6)"};
`
