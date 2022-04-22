import { Text, Flex } from "theme"
import styled from "styled-components"
import { motion } from "framer-motion"

export const Container = styled(motion.div)`
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  border-radius: 26px;
  position: absolute;
  top: 210px;
  left: 8px;
  right: 8px;
  z-index: 100;
  padding: 31px 26px;
`

export const Overlay = styled(motion.div)`
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(6px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  height: 100%;
  width: 100%;
`

export const Head = styled(Flex)`
  width: 100%;
  jutsify-content: space-between;
`

export const Title = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height, or 127% */

  letter-spacing: 0.35px;

  /* Text / main */

  color: #c5d1dc;
`

export const Close = styled.img``

export const WalletIcon = styled.img`
  height: 33px;
  transition: transform 0.2s;
  position: relative;
`

export const Wallet = styled(Flex)`
  position: relative;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 40px;

  &:after {
    content: "";
    position: absolute;
    height: 1px;
    bottom: -20px;
    left: 40px;
    right: 0;
    background: linear-gradient(
      89.66deg,
      rgba(254, 254, 255, 0.04) 0.07%,
      rgba(239, 247, 255, 0.08) 98.45%
    );
  }
`

export const Body = styled.div`
  margin-top: 24px;
  padding: 0;
  transition: opacity 0.4s;
`

export const Wallets = styled(Flex)`
  padding: 60px 0 40px;
  flex-direction: column;
  align-items: flex-start;
`

export const WalletTitle = styled(Text)`
  padding-left: 16px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.5px;
  transform: translateY(2px);
  color: #c5d1dc;
`

export const PrivacyText = styled.p`
  padding: 0;
  margin: 0;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #c2d1dd;
  justify-content: flex-start;
  width: 100%;
`

export const LinkText = styled.a`
  text-decoration: none;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #0076bc;
`
