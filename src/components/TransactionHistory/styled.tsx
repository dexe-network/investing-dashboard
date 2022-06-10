import styled from "styled-components"
import { motion } from "framer-motion"

import { Flex, GradientBorder } from "theme"

export const Container = styled(motion.div)`
  width: 100%;
`

export const Header = styled(Flex)`
  width: 100%;
  justify-content: space-around;
`

export const HeaderButton = styled(GradientBorder)`
  border-radius: 16px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 0.3px;
  color: ${(props) => (props.focused ? "#9AE2CB" : "#616d8b")};
  height: 25px;
  padding: 0 10px;

  &:after {
    background: #0d121c;
  }
`

export const List = styled.div`
  width: 100%;
  overflow-y: auto;
  margin-top: 15px;
  padding-bottom: 20px;
`

export const ListPlaceholder = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: inherit;
  flex: 1;
  color: #5a6071;
`

// CARD

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 50px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(26, 33, 46, 0.5);
  }
`

export const CardIcons = styled.div<{ relative?: boolean }>`
  width: 30px;
  height: 30px;
  position: relative;
  margin-right: 16px;

  ${({ relative = true }) =>
    relative &&
    `& > *:first-child {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 20;
    }
    & > *:last-child {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 21;
    }`}
`

export const CardTime = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;

  color: #e4f2ff;
`
