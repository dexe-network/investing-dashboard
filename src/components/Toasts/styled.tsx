import React, { MouseEventHandler } from "react"
import styled from "styled-components"

import { ToastType } from "./types"

import { GradientBorder, Flex } from "theme"
import link from "assets/icons/link.svg"
import linkSuccess from "assets/icons/link-green.svg"

export const ToastsContainer = styled.div<{ height: string | number }>`
  position: fixed;
  width: 100%;
  height: ${({ height }) => height};
  z-index: 10;
`
export const ToastsInner = styled.div`
  height: 100%;
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

export const TransactionLinkContainer = styled(Flex)<{ type?: ToastType }>`
  margin-top: 10px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: ${({ type }) => (type === ToastType.Success ? "#9AE2CB" : "#e4f2ff")};
`
export const TransactionLinkIcon = styled.img`
  width: 12px;
  height: 12px;
`
export const TransactionLinkText = styled.span`
  margin-right: 7px;
`

export const TransactionLink: React.FC<{
  text?: string
  hash: string
  type?: ToastType
}> = ({ text = "View on bscscan", hash, type }) => {
  const handleTokenRedirect = (address: string) => {
    window.open(`https://bscscan.com/tx/${address}`, "_blank")
  }

  const handleTokenLinkClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    handleTokenRedirect(hash)
  }

  return (
    <TransactionLinkContainer onClick={handleTokenLinkClick} type={type}>
      <TransactionLinkText>{text}</TransactionLinkText>
      <TransactionLinkIcon
        src={type === ToastType.Success ? linkSuccess : link}
      />
    </TransactionLinkContainer>
  )
}
