import styled from "styled-components"
import TokenIcon from "components/TokenIcon"
import { motion } from "framer-motion"
import { Flex, To } from "theme"
import actionIcon from "assets/icons/stats-action.svg"
import { PoolType } from "constants/interfaces_v2"
import IpfsIcon from "components/IpfsIcon"

export const Container = styled.div`
  padding: 16px 0 60px;
  position: relative;
  height: 80%;
  overflow-y: auto;
`

export const Header = styled(Flex)`
  width: 100%;
  padding: 16px;
`

export const PrimaryLabel = styled(Flex)`
  justify-content: flex-start;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
  width: 200px;
`

export const PlaceholderIcon = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 9px;
`

export const SecondaryLabel = styled(Flex)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #616d8b;
  flex: 1;
  justify-content: flex-start;

  &:nth-child(3) {
    justify-content: center;
  }
  &:nth-child(4) {
    justify-content: flex-end;
  }
`

export const List = styled(motion.div)`
  padding: 0 16px 30px;
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
  width: 200px;
  justify-content: flex-start;
`

const TokenData = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`

const Symbol = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #e4f2ff;
`

const Name = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

const Value = styled(Flex)`
  justify-content: flex-start;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #e4f2ff;
  flex: 1;
  &:nth-child(3) {
    justify-content: center;
  }
  &:nth-child(4) {
    justify-content: flex-end;
  }
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin-right: 9px;
`

const BaseWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: -5px;
  bottom: 0;
`

export const EmptyText = styled(Row)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #5a6071;
  height: 60px;
  align-items: space-between;
  justify-content: flex-start;
  width: 100%;
`

export const Token: React.FC<{
  baseAddress: string
  symbol: string
  name: string
  tvl: string
  pnl: string
  address: string
  descriptionURL: string
  poolType: PoolType
}> = ({
  symbol,
  name,
  tvl,
  pnl,
  address,
  baseAddress,
  poolType,
  descriptionURL,
}) => {
  return (
    <To to={`/me/trader/profile/${poolType}/${address}`}>
      <Row>
        <Info>
          <Avatar>
            <IpfsIcon size={40} hash={descriptionURL} />
            <BaseWrapper>
              <TokenIcon size={20} address={baseAddress} />
            </BaseWrapper>
          </Avatar>
          <TokenData>
            <Symbol>{symbol}</Symbol>
            <Name>{name}</Name>
          </TokenData>
        </Info>
        <Value>{tvl}</Value>
        <Value>{pnl}</Value>
      </Row>
    </To>
  )
}
