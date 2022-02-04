import styled from "styled-components"
import TokenIcon from "components/TokenIcon"
import { motion } from "framer-motion"
import { Flex, To } from "theme"
import actionIcon from "assets/icons/stats-action.svg"

export const Container = styled.div`
  padding: 16px;
`

export const Header = styled(Flex)`
  width: 100%;
  padding: 16px 0;
`

export const PrimaryLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.5px;
  color: #c5d1dc;
`

export const SecondaryLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  letter-spacing: 1px;
  color: #5a6071;
`

export const List = styled.div`
  padding: 0 0 30px;
  max-height: 250px;
  overflow-y: auto;
`

const Row = styled(Flex)`
  position: relative;
  width: 100%;
  padding: 10px 0;

  &:after {
    content: "";
    bottom: 0;
    position: absolute;
    left: 30px;
    right: 0;
    background: rgba(90, 96, 113, 0.1);
    height: 1px;
  }
`

const Info = styled(Flex)`
  width: 40%;
  justify-content: flex-start;
`

const TokenData = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`

const Symbol = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #c5d1dc;
`

const Name = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.005em;
  color: #5a6071;
`

const Value = styled.div`
  width: 25%;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.5px;
  color: #c5d1dc;
`

const ActionButton = styled.div``

const Action = styled.img``

export const EmptyText = styled(Flex)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #5a6071;
  height: 60px;
  padding: 10px 0 0;
  align-items: space-between;
  width: 100%;
`

export const Token: React.FC<{
  baseAddress: string
  symbol: string
  name: string
  tvl: string
  pnl: string
  address: string
  poolType: "basic" | "invest"
}> = ({ symbol, name, tvl, pnl, address, baseAddress, poolType }) => {
  return (
    <Row>
      <Info>
        <TokenIcon size={40} address={baseAddress} />
        <TokenData>
          <Symbol>{symbol}</Symbol>
          <Name>{name}</Name>
        </TokenData>
      </Info>
      <Value>{tvl}</Value>
      <Value>{pnl}</Value>
      <To to={`/me/trader/profile/${poolType}/${address}`}>
        <ActionButton>
          <Action src={actionIcon} />
        </ActionButton>
      </To>
    </Row>
  )
}
