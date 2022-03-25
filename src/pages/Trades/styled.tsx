import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex, BaseButton, Text, device } from "theme"

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: fill-available;
  max-height: fill-available;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  height: calc(100% - 64px);
`

export const Header = styled(Flex)`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  height: 58px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  background: #31383b;
  padding: 0 20px;
`

export const BackIcon = styled.img`
  position: relative;
  z-index: 50;
`

export const Tabs = styled(Flex)`
  justify-content: space-between;
  width: 200px;
  margin-right: -20px;
`

export const LinkWrap = styled.div<{ c: string; fw: number }>`
  font-size: 16px;
  color: ${(props) => props.c};
  user-select: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  user-select: none;
  text-align: center;
  padding: 0 20px;
  width: 100px;

  font-weight: ${(props) => props.fw};

  @media only screen and (${device.md}) {
    font-size: 14px;
  }

  @media only screen and (${device.sm}) {
    padding: 0 10px;
  }
`

export const Tab = ({ children, active, to }) => (
  <LinkWrap
    c={active ? "#F5F5F5" : "#999999"}
    onClick={to}
    fw={active ? 800 : 500}
  >
    {children}
  </LinkWrap>
)

export const IconButtons = styled(Flex)`
  width: 55px;
`

export const List = styled(Flex)`
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 60px;
`

export const ListHead = styled(motion.div)`
  width: 100%;
  padding: 0 15px 10px 50px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "content . .";
  justify-items: stretch;
  align-items: stretch;
`

export const Label = styled(Text)`
  color: #c2c3c4;
  opacity: 0.7;
  font-size: 12px;
  text-align: center;

  &:nth-child(1) {
    /* width: 140px; */
    text-align: left;
  }

  &:nth-child(2) {
    /* width: 110px; */
    text-align: right;
  }

  &:nth-child(3) {
    /* width: 100px; */
    text-align: right;
  }
`

export const SubItems = styled(motion.div)`
  width: 100%;
  /* margin-bottom: 15px; */
`

export const TradeButtons = styled(Flex)`
  width: 100%;
  justify-content: space-around;
  padding: 10px 0;
`

export const TextButtonBase = styled(BaseButton)`
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 700;
  text-align: center;
  background: none;
`

export const BuyMore = styled(TextButtonBase)`
  color: #7fffd4;
`
export const ClosePosition = styled(TextButtonBase)`
  color: #ff7f7f;
`

export const gradients = {
  default:
    "linear-gradient(90deg,rgba(49, 45, 73, 0) 0%,rgba(122, 122, 122, 0.2) 100%);",
  buy: "linear-gradient(90deg,rgba(49, 45, 73, 0) 0%,rgba(127, 255, 212, 0.1) 100%);",
  sell: "linear-gradient(90deg,rgba(49, 45, 73, 0) 0%,rgba(255, 127, 127, 0.1) 100%);",
}

export const Wrapper = styled(Flex)<{ gradient: string; shadow?: boolean }>`
  width: 100%;
  height: 60px;
  min-height: 60px;
  margin-bottom: 5px;
  width: 100%;
  padding: 4px 16px 8px 11px;
  position: relative;
  align-items: flex-start;
  background: ${(props) => props.gradient};
  box-shadow: ${(props) =>
    props?.shadow ? "0px 3px 6px rgba(0, 0, 0, 0.2)" : "none"};
  transition: opacity 0.3s ease-in-out;
`

export const BaseInfo = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`

export const From = styled(Text)`
  white-space: normal;
  color: #95959c;
  font-size: 12px;
`

export const To = styled(Text)`
  white-space: normal;
  color: #ffffff;
  font-family: Gilroy;
  font-weight: 500;
  font-size: 16px;
`

export const Amount = styled(Text)`
  color: #ffffff;
  font-size: 12px;
  max-width: 70px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:not(:first-child) {
    margin-left: 3px;
  }
`

export const AmountSymbol = styled(Text)`
  color: #95959c;
  font-size: 12px;
  margin-left: 3px;
`

export const Buy = styled(Text)`
  color: #7fffd4;
  font-size: 12px;
  text-align: right;
`

export const Sell = styled(Text)`
  color: #ff7f7f;
  font-size: 12px;
  text-align: right;
`

export const PrimaryText = styled(Text)`
  color: #ffffff;
  font-size: 14px;
  text-align: right;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const SecondaryText = styled(Text)`
  font-size: 12px;
  color: #c2c3c4;
  text-align: right;
`

export const TotalSymbol = styled(Text)`
  font-size: 12px;
  color: #c2c3c4;
  height: 12px;
  padding-bottom: 2px;
  margin-left: 3px;
`

export const PositionInfo = styled(Flex)`
  width: 130px;
  justify-content: flex-start;
`

export const Price = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  width: 110px;
`

export const Total = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  width: 100px;
`

export const Date = styled(Text)`
  color: #fff;
  font-size: 12px;
  opacity: 0.5;
  text-align: right;
`
