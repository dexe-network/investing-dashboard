import { BigNumber } from "ethers"

import { normalizeBigNumber } from "utils"

import { Flex } from "theme"
import { Body, Label, Value, StablePrice, PNL } from "./styled"

interface Props {
  baseToken?: any
  markPrice: BigNumber
  markPriceUSD: BigNumber
  closed: boolean
}

const PositionCardBody: React.FC<Props> = ({
  baseToken,
  markPriceUSD,
  markPrice,
  closed,
}) => (
  <>
    <Body>
      <Label>Entry Price</Label>
      <Label>{closed ? "Closed price" : "Current price"}</Label>
      <Label>P&L LP</Label>

      <Flex>
        <Value>0.1</Value>
        <Label>{baseToken?.symbol}</Label>
      </Flex>
      <Flex>
        <Value>{normalizeBigNumber(markPrice, 18, 4)}</Value>
        <Label>{baseToken?.symbol}</Label>
      </Flex>
      <Flex>
        <Value>+0.0012</Value>
        <PNL>+0.38%</PNL>
      </Flex>

      <StablePrice>$57</StablePrice>
      <StablePrice>${normalizeBigNumber(markPriceUSD, 18, 2)}</StablePrice>
      <StablePrice>+$30</StablePrice>
    </Body>
  </>
)

export default PositionCardBody
