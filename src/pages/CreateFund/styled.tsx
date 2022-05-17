import styled from "styled-components"
import { Flex, Text } from "theme"

import { opacityVariants } from "motion/variants"
import Switch from "components/Switch"
import { ReactNode, FC } from "react"

export const Container = styled.div`
  margin: 0 auto;
  bacground-color: #040a0f;
  width: fill-available;
  height: calc(100vh - 94px);
  overflow-y: auto;

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const AvatarWrapper = styled(Flex)`
  position: absolute;
  top: -35px;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 117px;
`

export const LinkButton = styled.button`
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

export const Body = styled.div`
  position: relative;
  padding-top: 117px;
  margin-top: 67px;
  width: fill-available;
  background: #08121a;
  box-shadow: 0px -3px 102px 2px rgba(149, 185, 255, 0.26);
  border-radius: 26px 26px 0px 0px;
`

export const Steps = styled.div``

export const Step = styled.div``

export const StepBody = styled.div<{ isLast?: boolean }>`
  padding: ${(props) =>
    props.isLast ? "24px 17px 24px 44px" : "24px 17px 48px 44px"};
`

export const FundTypeCards = styled.div``

export const FeeCards = styled.div``

export const ValidationError = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #fc6d6d;
  margin: 12px 0 0 3px;
`

export const InputRow = styled(Flex)`
  width: 100%;
  padding: 12px 0;
  flex-direction: column;
  align-items: flex-start;
`

//-------
// # SWITCH
//-------

const RowContainer = styled(Flex)`
  position: relative;
  width: 100%;
  align-items: center;
  padding: 24px 0;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 32px;
    right: 0;
    margin: auto;
    height: 1px;
    background: linear-gradient(
        89.66deg,
        rgba(254, 254, 255, 0.02) 0.07%,
        rgba(239, 247, 255, 0.06) 98.45%
      ),
      #232731;
    opacity: 0.4;
  }
`

export const InputText = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: right;
  color: #616d8b;
`

const FormLabel = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #616d8b;

  margin-bottom: -2px;
  margin-left: 8px;
`

interface SwitchRowProps {
  icon: React.ReactNode
  title: string
  isOn: boolean
  name: string
  onChange: (state: boolean) => void
}

export const SwtichRow: React.FC<SwitchRowProps> = ({
  icon,
  title,
  isOn,
  name,
  children,
  onChange,
}) => {
  return (
    <>
      <RowContainer>
        <Flex ai="center">
          {icon}
          <FormLabel>{title}</FormLabel>
        </Flex>
        <Switch isOn={isOn} name={name} onChange={(n, s) => onChange(s)} />
      </RowContainer>
      <Flex
        p="15px 0 15px"
        initial={isOn ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isOn ? "visible" : "hidden"}
        full
        dir="column"
      >
        {children}
      </Flex>
    </>
  )
}

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
