import { Flex, BaseButton, Text, device } from "theme"
import styled from "styled-components"

import arrowToLogo from "assets/others/arrow-to-logo.svg"
import arrowToName from "assets/others/arrow-to-name.svg"

const AvatarContainer = styled.div`
  height: 112px;
  width: 112px;
  z-index: 5;
  border-radius: 150px;
  position: relative;
`

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
  width: 279px;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.16);
  background: none;
  background: linear-gradient(64.44deg, #24282d 32.35%, #3a393f 100%);
  border-radius: 50px;
  font-size: 15px;
  font-family: Gilroy;
  font-weight: 500;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  margin: 15px 0;
`
export const IconContainer = styled(Flex)`
  min-width: 57px;
  min-height: 57px;
  border-radius: 100px;
  justify-content: center;
  padding-top: 5px;
  align-items: center;
  background: #202020;
  -webkit-box-shadow: inset 0px 12px 27px 0px #202020;
  box-shadow: inset 0px 12px 27px 0px #202020;
`

export const AvatarWrapper = styled(AvatarContainer)`
  &:after {
    content: "+";
    position: absolute;
    right: -5px;
    top: 0px;
    width: 27px;
    height: 27px;
    background: linear-gradient(64.44deg, #3a393f 32.35%, #24282d 100%);
    border-radius: 8px 0 8px 0;
    font-family: Gilroy;
    font-style: normal;
    font-family: Gilroy;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    color: #75ddc1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
export const Icon = styled.img``

export const ButtonText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 700;
  font-size: 16px;
  line-height: 41px;
  padding-left: 17px;
  text-align: left;
`

export const HintText = styled(Text)`
  position: relative;
  text-align: center;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #c4c4c4;
  margin-top: 13px;

  /* &:before {
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
  } */
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

export const TraderName = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: linear-gradient(64.44deg, #24282d 32.35%, #3a393f 100%);
  border-radius: 4px;
  padding: 5px 7px 3px 7px;
  width: 134px;
  height: 27px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7fffd4;
  text-align: center;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.3);
  z-index: 25;

  @media only screen and (${device.xs}) {
    font-size: 15px;
    width: 100%;
  }
`
