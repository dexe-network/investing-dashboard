import styled from "styled-components"
import { Flex } from "theme"
import { motion } from "framer-motion"

export const TabContainer = styled(Flex)`
  background: #33363f;
  border-radius: 10px;
  height: 35px;
  width: 100%;
  justify-content: space-around;
`

export const Tab = styled(Flex)<{ active?: boolean }>`
  text-align: center;
  justify-content: center;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  height: 35px;
  flex: 1;
  background: ${(props) =>
    props.active
      ? "linear-gradient(244.44deg, #63B49B 0%, #A4EBD4 67.65%)"
      : "transparent"};
  color: ${(props) => (props.active ? "#24272D" : "#dadada")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-radius: 10px;
`
