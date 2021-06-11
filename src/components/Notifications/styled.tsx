import { Flex, Text } from "theme"
import styled from "styled-components"
import { motion } from "framer-motion"

export const NotificationsStyled = styled(motion.div)`
  position: absolute;
  right: 15px;
  top: 60px;
  width: 430px;
  height: 460px;
  background: linear-gradient(
    225deg,
    rgba(47, 60, 58, 1) -50%,
    rgba(45, 40, 67, 1) 100%
  );
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  z-index: 20;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const Header = styled(Flex)`
  height: 75px;
`

export const Body = styled(Flex)`
  height: 385px;
  padding: 5px;
  overflow: auto;
`

export const Title = styled(Text)`
  color: #f5f5f5;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
`
