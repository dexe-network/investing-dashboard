import styled from "styled-components"
import { motion } from "framer-motion"

export const Container = styled.div`
  cursor: pointer;
  user-select: none;
`

export const OuterCircle = styled.div<{ unselected: boolean }>`
  backdrop-filter: blur(4px);
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  border: 2px solid
    ${(props) => (props.unselected ? "#6C757D" : "rgba(127, 255, 212, 0.4);")};
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
  height: ${(props) => (props.unselected ? "0px" : "8px")};
  width: ${(props) => (props.unselected ? "0px" : "8px")};
  background: #f7f7f7;
  filter: blur(2px);
`
