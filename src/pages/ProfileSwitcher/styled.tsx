import { Flex, BaseButton, Text } from "theme"
import styled from "styled-components"

import { AvatarContainer } from "components/MemberMobile/styled"

import arrowToLogo from "assets/others/arrow-to-logo.svg"
import arrowToName from "assets/others/arrow-to-name.svg"

export const Container = styled(Flex)`
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const ProfileSetup = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 141px;
`
export const BigIconButton = styled(BaseButton)`
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.16);
  background: none;
  background: linear-gradient(
    267deg,
    rgba(51, 62, 64, 0.25) 0%,
    rgba(128, 128, 128, 0.25) 100%
  );
  border-radius: 50px;
  color: #47bef9;
  font-size: 15px;
  font-weight: 500;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`
export const IconContainer = styled(Flex)`
  min-width: 68px;
  min-height: 68px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background: #332e47;
`

export const AvatarWrapper = styled(AvatarContainer)``
export const Icon = styled.img``

export const ButtonText = styled(Text)`
  color: #47bef9;
  font-size: 15px;
  font-weight: 500;
  width: 216px;
  padding-left: 36px;
  text-align: left;
`

export const HintText = styled(Text)`
  position: relative;
  text-align: center;
  font-size: 14px;
  color: #c2c3c4;
  margin-top: 13px;

  &:before {
    content: "";
    position: absolute;
    width: 12px;
    height: 15px;
    background: url(${arrowToName});
    background-repeat: no-repeat;
    background-size: contain;
    bottom: 18px;
    left: 50px;
  }
  &:after {
    content: "";
    position: absolute;
    right: -40px;
    bottom: 19px;
    width: 87px;
    height: 68px;
    background: url(${arrowToLogo});
    background-repeat: no-repeat;
    background-size: contain;
  }
`

export const ButtonsContainer = styled(Flex)`
  flex-direction: column;
`

export const FloatingButton = styled(BaseButton)`
  height: 44px;
  position: absolute;
  right: 15px;
  top: 30px;
  background: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const ArrowButton = styled(BaseButton)`
  background: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`
