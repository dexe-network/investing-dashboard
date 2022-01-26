import { Text, Flex } from "theme"
import styled from "styled-components"

export const Title = styled(Text)`
  font-size: 24px;
  font-family: Gilroy;
  font-weight: 700;
  color: #f5f5f5;
`

export const WalletIcon = styled.img`
  height: 33px;
  transition: transform 0.2s;
  position: relative;
`

export const Checked = styled.img`
  position: absolute;
  right: 20px;
  bottom: 25px;
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

export const Header = styled(Flex)``

export const ChooseWallet = styled(Flex)`
  color: #cad8fc;
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
