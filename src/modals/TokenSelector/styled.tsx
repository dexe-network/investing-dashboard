import styled from "styled-components"
import { Text, Flex } from "theme"
import { motion } from "framer-motion"

export const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: linear-gradient(
    233deg,
    rgba(53, 52, 75, 1) 0%,
    rgba(41, 49, 52, 1) 100%
  );
  border-radius: 5px;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.4);
  z-index: 5;
`

export const Title = styled(Text)`
  color: #c2c3c4;
  font-size: 14px;
  font-size: 500;
`

export const Close = styled.img`
  cursor: pointer;
  width: 8px;
  height: 8px;
`
