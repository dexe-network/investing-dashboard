import { FC } from "react"
import { Flex } from "theme"

import TokenIcon from "components/TokenIcon"
import IpfsIcon from "components/IpfsIcon"

import useContract, { useERC20 } from "hooks/useContract"

import {
  Card,
  Head,
  Body,
  PositionSymbol,
  FundSymbol,
  Amount,
  Label,
  Value,
  StablePrice,
  PNL,
} from "./styled"

interface Props {
  positionAddress: string
  baseTokenAddress?: string
  fundSymbol?: string
  description?: string
  onClick: () => void
}

const RiskyCard: FC<Props> = ({
  positionAddress,
  baseTokenAddress,
  fundSymbol,
  description,
  onClick,
}) => {
  const [, tokenData] = useERC20(positionAddress)
  const [, baseData] = useERC20(baseTokenAddress)

  return (
    <Card onClick={onClick}>
      <Head>
        <Flex>
          <TokenIcon address={positionAddress} m="0" size={24} />
          <Amount>5</Amount>
          <PositionSymbol>{tokenData?.symbol}</PositionSymbol>
        </Flex>
        <Flex>
          <FundSymbol>{fundSymbol}</FundSymbol>
          <IpfsIcon hash={description} m="0" size={24} />
        </Flex>
      </Head>
      <Body>
        <Label>Entry Price</Label>
        <Label>Mark price</Label>
        <Label>P&L LP</Label>

        <Flex>
          <Value>0.1</Value>
          <Label>{baseData?.symbol}</Label>
        </Flex>
        <Flex>
          <Value>0</Value>
          <Label>{baseData?.symbol}</Label>
        </Flex>
        <Flex>
          <Value>+0.0012</Value>
          <PNL>+0.38%</PNL>
        </Flex>

        <StablePrice>$57</StablePrice>
        <StablePrice>0</StablePrice>
        <StablePrice>+$30</StablePrice>
      </Body>
    </Card>
  )
}

export default RiskyCard
