import { Flex, BaseButton, Text, device } from "theme"
import styled from "styled-components"

import arrowToLogo from "assets/others/arrow-to-logo.svg"
import arrowToName from "assets/others/arrow-to-name.svg"

export const Container = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 50px 32px 70px;
  // background: linear-gradient(8.35deg, #171b1f 0.79%, #1e222d 109.7%);
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
  font-weight: normal;
  font-size: 42px;
  line-height: 110%;
  color: #c5d1dc;
`

export const Description = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 300;
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
`
