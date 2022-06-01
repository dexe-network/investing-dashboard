import styled from "styled-components"

import { GradientBorder, Flex } from "theme"

export const ToastsContainer = styled.div<{ height: string | number }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height};
  z-index: 10;
`
export const ToastsInner = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 32px;
  padding-bottom: 1px;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const Container = styled(GradientBorder)<{ width?: string }>`
  width: ${({ width }) => (width ? width : "210px")};
  position: relative;
  padding: 16px 24px 16px 11px;
  margin: 16px 16px 0;
  border-radius: 16px;

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

export const TransactionBody = styled(Flex)``
