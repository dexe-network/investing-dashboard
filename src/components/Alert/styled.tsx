import styled from "styled-components"
import { Flex, GradientBorder } from "theme"

export const Container = styled(GradientBorder)`
  position: fixed;
  margin: auto;
  bottom: 56px;
  left: 0;
  right: 0;
  width: 343px;
  height: fit-content;
  border-radius: 16px;
  z-index: 90;

  @media all and (display-mode: standalone) {
    bottom: 86px;
  }

  &:after {
    background: #181e2c;
  }
`

export const Body = styled(Flex)<{ withHeader: boolean }>`
  width: 100%;
  padding: ${({ withHeader }) =>
    withHeader ? "17px 24px 17px 16px" : "22px 24px 22px 16px"};
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
`

export const Header = styled(Flex)`
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 7px;
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`

export const Title = styled.span`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.03em;

  color: #ffffff;
`

export const Content = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const Close = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  top: 2px;
  right: 6px;
`
