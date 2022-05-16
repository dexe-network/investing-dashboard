import React from "react"
import styled from "styled-components"
import { opacityVariants } from "motion/variants"

import { Flex, Text, GradientBorder } from "theme"
import Switch from "components/Switch"

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

interface SwitchRowProps {
  icon: React.ReactNode
  title: string
  isOn: boolean
  name: string
  onChange: (state: boolean) => void
}

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
