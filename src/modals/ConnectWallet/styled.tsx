import { Text, Flex } from "theme"
import styled from "styled-components"

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #f5f5f5;
`

export const WalletIcon = styled.img`
  max-width: 60px;
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
  max-width: 125px;

  &:hover ${WalletIcon} {
    transform: scale(1.1);
  }
`

export const Body = styled.div<{ opacity: number }>`
  margin-top: 20px;
  transition: opacity 0.4s;
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => (props.opacity !== 1 ? "not-allowed" : "normal")};

  & ${Wallet} {
    cursor: ${(props) => (props.opacity !== 1 ? "not-allowed" : "pointer")};
  }
`

export const Header = styled(Flex)``

export const TermsAndPrivacy = styled.span`
  color: #f5f5f5;
  padding-left: 10px;
  padding-top: 3px;
`

export const ChooseWallet = styled(Flex)`
  color: #cad8fc;
`

export const Wallets = styled(Flex)`
  flex-wrap: wrap;
`

export const WalletTitle = styled(Text)`
  padding-top: 15px;
  color: #f5f5f5;
  font-size: 16px;
  font-weight: 600;
  white-space: normal;
  text-align: center;
`
