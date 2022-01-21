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
  max-width: 125px;

  &:hover ${WalletIcon} {
    transform: scale(1.1);
  }
`

export const Body = styled.div<{ opacity: number }>`
  margin-top: 45px;
  padding: 0 16px;
  transition: opacity 0.4s;
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => (props.opacity !== 1 ? "not-allowed" : "normal")};

  & ${Wallet} {
    cursor: ${(props) => (props.opacity !== 1 ? "not-allowed" : "pointer")};
  }
`

export const Header = styled(Flex)``

export const TermsAndPrivacy = styled.span`
  font-family: Gilroy;
  font-style: italic;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  padding-left: 10px;
  padding-top: 3px;
`

export const ChooseWallet = styled(Flex)`
  color: #cad8fc;
`

export const Wallets = styled(Flex)`
  margin-top: 30px;
  border: 1px solid #007ff3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 37px 0 40px;
`

export const WalletTitle = styled(Text)`
  padding-top: 8px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 1px;

  /* Text */

  color: #dadada;
`
