import { Flex, Text, BasicCard } from "theme"
import styled from "styled-components"
import TokenIcon from "components/TokenIcon"
import { Token } from "constants/interfaces"
import { useERC20 } from "hooks/useContract"
import { formatBigNumber } from "utils"

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Card = styled(BasicCard)`
  flex-direction: column;
`

export const CardHeader = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 24px 16px;
  justify-content: flex-start;
  position: relative;

  &:before {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 100%;
    content: "";
    height: 1px;
    background: radial-gradient(
          54.8% 53% at 50% 50%,
          #587eb7 0%,
          rgba(88, 126, 183, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      radial-gradient(
          60% 51.57% at 50% 50%,
          #6d99db 0%,
          rgba(109, 153, 219, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      radial-gradient(
          69.43% 69.43% at 50% 50%,
          rgba(5, 5, 5, 0.5) 0%,
          rgba(82, 82, 82, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    opacity: 0.1;
  }
`

export const TitleContainer = styled(Flex)`
  width: 100%;
  justify-content: flex-start;
  padding-bottom: 24px;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
  margin: 0 0 -2px 16px;
`

export const CardList = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 0 0;
`

// TOKEN item

const TokenContainer = styled(Flex)`
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  padding: 0 16px;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(
      264.39deg,
      rgba(255, 255, 255, 0) -58.22%,
      rgba(255, 255, 255, 0.04) 116.91%
    );
  }
`

const TokenInfo = styled(Flex)`
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
`

const Symbol = styled.div`
  overflow: hidden;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #ffffff;
  text-align: left;
`

const Name = styled.div`
  overflow: hidden;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 142%;
  letter-spacing: 0.03em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #5a6071;
  text-align: left;
`

const BalanceInfo = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`

const TokenBalance = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 142%;
  text-align: right;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #ffffff;
`

const TokenPrice = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const TokenItem: React.FC<{
  tokenData: Token
  onClick: (address: string) => void
}> = ({ tokenData, onClick }) => {
  const { symbol, name, address } = tokenData
  const [_, data, balance] = useERC20(address)
  const balanceFormated = formatBigNumber(balance, data?.decimals)
  return (
    <TokenContainer onClick={() => onClick(address)}>
      <TokenIcon address={address} size={30} />
      <TokenInfo>
        <Symbol>{symbol}</Symbol>
        <Name>{name}</Name>
      </TokenInfo>
      <BalanceInfo>
        <TokenBalance>{balanceFormated}</TokenBalance>
        <TokenPrice>$0.00</TokenPrice>
      </BalanceInfo>
    </TokenContainer>
  )
}
