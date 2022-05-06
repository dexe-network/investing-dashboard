import { Text, Flex } from "theme"
import styled from "styled-components"

export const Container = styled(Flex)`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
  height: 60px;
  z-index: 30;
  padding: 0 21px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  @media all and (display-mode: standalone) {
    padding-bottom: 20px;
    height: 80px;
  }
`

export const TextContainer = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #e4f2ff;
  height: 12px;
  transform: translateY(1px);
  padding-left: 4px;
`

export const Button = styled(TextContainer)`
  color: #0066c2;
  font-weight: 600;
`
