import styled from "styled-components"

import { GradientBorder, Flex } from "theme"

export const ToastsContainer = styled.div<{ height: string | number }>`
  position: relative;
  max-width: 100%;
  height: ${({ height }) => height};
`
export const ToastsInner = styled.div`
  height: 99%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const Container = styled(GradientBorder)`
  position: relative;
  padding: 16px 0 16px 11px;
  margin-top: 16px;

  &:after {
    background: #181e2c;
  }
`

export const Close = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  top: 2px;
  right: 6px;
`

export const Body = styled(Flex)`
  align-items: flex-start;
  width: 100%;
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`

export const Content = styled.div`
  width: 100%;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`
