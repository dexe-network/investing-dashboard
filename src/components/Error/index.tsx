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
  max-width: 300px;
  margin: auto;
  background: #1e2229;
  border-radius: 6px;
  border: 2px solid;
  border-color: rgb(105, 105, 117, 0.3);
  position: absolute;
  top: 210px;
  left: 8px;
  right: 8px;
  z-index: 100;
`
const Content = styled(Flex)`
  box-sizing: border-box;
  padding: 10px 16px 19px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`
const Title = styled.div`
  box-sizing: border-box;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #c5d1dc;
  margin-top: 10px;
  margin-bottom: 2px;
`
const Subtitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #c5d1dc;
  text-align: center;
`
const ButtonContainer = styled(Flex)`
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const ButtonCancel = styled.button`
  width: 100%;
  border: none;
  appearance: none;
  outline: none;
  border-top: 2px solid;
  border-right: 2px solid;
  border-color: rgb(105, 105, 117, 0.3);
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #5a6071;
  background: #1e2229;
  box-sizing: border-box;
  padding: 10px 40px;
`
const ButtonClose = styled.button`
  width: 100%;
  border: none;
  appearance: none;
  outline: none;
  border-top: 2px solid;
  border-color: rgb(105, 105, 117, 0.3);
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #c5d1dc;
  background: #1e2229;
  box-sizing: border-box;
  padding: 10px 24px;
`

const Error: React.FC<{
  isOpen: boolean
  submit: () => void
  toggle: () => void
}> = ({ isOpen, toggle, submit }) => {
  return (
    <>
      <Overlay
        onClick={toggle}
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            opacity: 0.4,
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      />
      <Container
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            opacity: 1,
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      >
        <Content>
          <img src={warningIcon} alt="warning-icon" />
          <Title>Transaction failed</Title>
          <Subtitle>
            Please try again, it may happend when nodes are fully loaded
          </Subtitle>
        </Content>
        <ButtonContainer>
          <ButtonCancel onClick={toggle}>Cancel</ButtonCancel>
          <ButtonClose onClick={submit}>Try again</ButtonClose>
        </ButtonContainer>
      </Container>
    </>
  )
}

export default Error
