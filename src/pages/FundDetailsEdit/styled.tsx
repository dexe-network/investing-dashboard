import { ReactNode, FC } from "react"
import styled from "styled-components"

import { Flex, GradientBorder } from "theme"

export const Container = styled.div<{ loading?: boolean }>`
  position: relative;
  padding-top: 93px;
  margin-top: 103px;
  width: fill-available;
  background: #08121a;
  box-shadow: 0px -3px 102px 2px rgba(149, 185, 255, 0.26);
  border-radius: 26px 26px 0px 0px;

  height: ${({ loading = false }) =>
    loading ? "calc(100vh - 94px)" : "initial"};

  @media all and (display-mode: standalone) {
    height: ${({ loading = false }) =>
      loading ? "calc(100vh - 115px)" : "initial"};
  }
`

export const AvatarWrapper = styled.div`
  position: absolute;
  top: -50px;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 117px;

  img {
    margin: 0 auto;
  }
`
export const LinkButton = styled.div`
  background: none;
  appereance: none;
  border: none;
  outline: none;
  color: #2680eb;
  padding: 0;
  margin: 0;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;

  text-align: center;
  margin: 8px auto;
  display: block;
  letter-spacing: 0.03em;
`

export const Steps = styled.div`
  width: 100%;
  padding: 0 16px;
`
export const Step = styled.div`
  margin-bottom: 48px;
`
export const StepTitle = styled.h2`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
  margin-bottom: 24px;
`
export const StepBody = styled.div``
export const BasicContainer = styled(GradientBorder)`
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  flex-direction: column;

  &:after {
    background: #08121a;
  }
`
export const BasicItem = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`
export const BasicTitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #616d8b;
`
export const BasicValue = styled(Flex)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`
export const BasicValueIcon = styled.img`
  width: 12px;
  height: 12px;
`
export const BasicValueText = styled.span`
  margin-right: 7px;
`

// Stepper modal

const ModalIconsContainer = styled(Flex)`
  flex-direction: column;
  margin-top: 28px;
  width: 100%;
`

const IconsContainer = styled(Flex)`
  width: 52px;
  height: 32px;
  position: relative;
`

const LeftIcon = styled.div`
  height: 32px;
  width: 32px;
  position: absolute;
  left: 0;
  top: 0;
`

const RightIcon = styled.div`
  height: 32px;
  width: 32px;
  position: absolute;
  right: 0;
  top: 0;
`

const TickersContainer = styled(Flex)`
  margin-top: 7px;
  justify-content: center;
`

const Ticker = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  letter-spacing: 0.3px;
`

const FundTicker = styled(Ticker)`
  color: #e4f2ff;
  text-align: right;
  padding-right: 4px;
`

const BaseTicker = styled(Ticker)`
  color: #5e6d8e;
  text-align: left;
`

interface ModalIconsProps {
  left: ReactNode
  right: ReactNode
  fund: string
  base: string
}

export const ModalIcons: FC<ModalIconsProps> = ({
  left,
  right,
  fund,
  base,
}) => {
  return (
    <ModalIconsContainer>
      <IconsContainer>
        <LeftIcon>{left}</LeftIcon>
        <RightIcon>{right}</RightIcon>
      </IconsContainer>
      <TickersContainer>
        <FundTicker>{fund}</FundTicker>
        <BaseTicker>{base}</BaseTicker>
      </TickersContainer>
    </ModalIconsContainer>
  )
}
