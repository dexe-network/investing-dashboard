import styled from "styled-components"
import { motion } from "framer-motion"

export const Container = styled.div`
  cursor: pointer;
  user-select: none;
`

export const OuterCircle = styled.div<{ unselected: boolean }>`
  backdrop-filter: blur(4px);
  width: 19px;
  height: 19px;
  min-width: 19px;
  min-height: 19px;
  border: 1px solid
    ${(props) => (props.unselected ? "#5A6071" : "rgba(112, 192, 166, 1);")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  transition: all 0.1s linear;
`

export const InnerCircle = styled.div<{ unselected: boolean }>`
  border-radius: 50%;
  transition: all 0.1s linear;
  height: ${(props) => (props.unselected ? "0px" : "11px")};
  width: ${(props) => (props.unselected ? "0px" : "11px")};
  background: linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%);
`
