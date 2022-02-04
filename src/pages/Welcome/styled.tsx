import { Flex, BaseButton, Text, device } from "theme"
import styled from "styled-components"

import arrowToLogo from "assets/others/arrow-to-logo.svg"
import arrowToName from "assets/others/arrow-to-name.svg"

import bottomAsset from "assets/background/welcome-bottom.svg"
import rightAsset from "assets/background/welcome-right.svg"

export const Container = styled(Flex)`
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: realtive;
  padding: 40px 32px;
  // background: linear-gradient(8.35deg, #171b1f 0.79%, #1e222d 109.7%);
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(${rightAsset});
    background-position: 100% 0;
    background-repeat: no-repeat;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(${bottomAsset});
    background-position: 0 100%;
    background-repeat: no-repeat;
  }
`

export const Center = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

export const LoadingText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #fff;
  margin-top: 30px;
`

export const Logo = styled.img``

export const Content = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 0;
`

export const Title = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 500;
  font-size: 42px;
  line-height: 110%;
  color: #c5d1dc;
  margin-top: 70px;
`

export const Description = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.3px;
  color: #c5d1dc;
  padding: 35px 0;
`

export const Socials = styled(Flex)`
  justify-content: flex-start;
  width: 100%;
`

export const SocialIcon = styled.img`
  margin-right: 22px;
`

export const Buttons = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  margin-top: 70px;
`
