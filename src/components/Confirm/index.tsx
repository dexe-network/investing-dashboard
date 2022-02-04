import React, { useState, useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex } from "theme"
import warningIcon from "assets/icons/warning-icon.svg"

const Overlay = styled(motion.div)`
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(6px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  height: 100%;
  width: 100%;
`
const Container = styled(motion.div)`
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  border-radius: 6px;
  position: absolute;
  top: 210px;
  left: 8px;
  right: 8px;
  z-index: 100;
  padding: 31px 26px;
`
const Content = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #c5d1dc;
`
const Subtitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #c5d1dc;
`

const Confirm: React.FC = () => {
  return (
    <>
      <Overlay />
      <Container>
        <Content>
          <img src={warningIcon} alt="warning-icon" />
          <Title>Are you sure?</Title>
          <Subtitle>
            Закрытие позиции невозможно отменить. После этого действия вы
            сможете
          </Subtitle>
        </Content>
      </Container>
    </>
  )
}

export default Confirm
