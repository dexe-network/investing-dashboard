import { Flex } from "theme"
import styled from "styled-components"

import bottomAsset from "assets/background/welcome-bottom.svg"
import rightAsset from "assets/background/welcome-right.svg"

export const Container = styled(Flex)`
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: realtive;
  padding: 40px 32px;

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
  margin-top: 34px;
`

export const Description = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.3px;
  color: #c5d1dc;
  padding: 12px 0 27px;
`

export const Socials = styled(Flex)`
  justify-content: flex-start;
  width: 100%;
  margin-left: -8px;
  z-index: 1;
`

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
  margin-right: 11px;
`

export const SocialIcon = styled.img``

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 180px 119px;
  gap: 12px;
  width: fit-content;
  justify-content: space-between;
  align-self: baseline;
  margin-top: auto;
`

export const LoginContainer = styled(Flex)`
  width: fit-content;
  margin-top: 24px;
  margin-right: auto;
  margin-left: 19%;
  margin-left: 61px;
  justify-content: center;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #616d8b;
  z-index: 1;
`

export const ArrowOutlineRight = styled.img`
  width: 4.69px;
  height: 8px;
  margin-left: 5.31px;
`
