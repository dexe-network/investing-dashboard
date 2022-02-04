import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex, Text } from "theme"

export const FloatingContainer = styled(motion.div)`
  position: absolute;
  left: 0%;
  right: 0%;
  overflow: hidden;
  width: 100%;
  z-index: 90;
  height: 100vh;
`

export const Container = styled.div`
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  box-shadow: 0px -4px 17px -1px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 30px 30px 0 0;
  height: 100%;
  width: 100%;
`

export const Handle = styled.div<{ active: boolean }>`
  position: relative;
  height: 15px;
  &:after {
    content: "";
    position: absolute;
    transition: all 0.1s ease-in-out;
    left: 0;
    right: 0;
    margin: auto;
    background: ${(props) => (props.active ? "#47635a" : "#ABA7A7")};
    border-radius: 6px;
    width: 38px;
    height: 5px;
    top: 9px;
  }
`

export const Header = styled(Flex)`
  // height: 42px;
  padding-top: 20px;
  padding-bottom: 19px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 1px;
  color: #c5d1dc;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  width: 100%;
  justify-content: center;
`

export const Overlay = styled(motion.div)`
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(6px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  height: 100%;
  width: 100%;
`

export const AccountCard = styled.div`
  background: linear-gradient(64.44deg, #2f3338 32.35%, #3a393f 100%);
  border-radius: 10px;
  width: fill-available;
  margin: 47px auto;
  // filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08));
  max-width: 343px;
`

export const AccountTitle = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  margin-left: -2px;
  margin-bottom: 7px;
`

export const AccountDescription = styled(Text)`
  font-family: Gilroy;
  font-style: italic;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #ffffff;
`

export const AccountIcon = styled.img`
  height: 22px;
  width: 22px;
`

export const AccountAddress = styled(Flex)`
  height: 54px;
  width: fill-available;
  margin: 20px 14px;
  background: #1d2127;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 200%;
  color: #f7f7f7;
  justify-content: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const AccountFooter = styled(Flex)`
  height: 43px;
  width: 100%;
  padding: 0 25px;
`

export const TextButton = styled(Text)<{ theme?: "default" | "primary" }>`
  cursor: pointer;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: ${(props) => (props.theme === "primary" ? "#7BDFC4" : "#ffffff")};
  font-weight: ${(props) => (props.theme === "primary" ? "bold" : "normal")};
`

export default {}
