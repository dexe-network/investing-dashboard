// import React, { useState, useRef } from "react"
import { Flex, To } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"
import AreaChart from "components/AreaChart"
import defaultAvatar from "assets/icons/default-avatar.svg"
import { IPool } from "constants/interfaces"

import {
  Card,
  AvatarContainer,
  Wrapper,
  TraderName,
  Content,
  Ticker,
  Price,
  Pnl,
  Tile,
  Value,
  Label,
  CopiersCounter,
  CopiersLabel,
  CopiersPnl,
  BuyButton,
  ChartContainer,
  Chart,
} from "./styled"
import { useERC20 } from "hooks/useContract"

interface Props {
  data: IPool
}

const AvatarWrapper = styled(AvatarContainer)`
  margin-right: -48px;
`

const MemberMobile: React.FC<Props> = ({ data }) => {
  const {
    avatar,
    firstName,
    lastName,
    copiers,
    rank,
    symbol,
    price,
    pnl,
    commision,
    poolAddress,
    baseAddress,
    ownerAddress,
  } = data

  const [baseData] = useERC20(baseAddress)

  return (
    <Card ai="flex-end" full>
      <AvatarWrapper>
        <Avatar size={112} />
        <TraderName>{`${firstName} ${lastName}`}</TraderName>
      </AvatarWrapper>
      <Wrapper full>
        <Flex p="0 0 0 36px">
          <CopiersCounter>{copiers}</CopiersCounter>
          <CopiersLabel>copiers</CopiersLabel>
          <CopiersPnl>0%</CopiersPnl>
        </Flex>
        <Content>
          <Flex dir="column" full>
            <Flex p="13px 0 8px" full jc="space-evenly">
              <Ticker>{symbol}</Ticker>
              <Flex>
                <Price>$1</Price>
                <Pnl>0%</Pnl>
              </Flex>
              <To to={`/pool/${poolAddress}/invest`}>
                <BuyButton>Buy</BuyButton>
              </To>
            </Flex>
            <ChartContainer jc="space-between" full p="0 8px 0 0">
              <Chart>
                <AreaChart width={219} height={47} data={pnl.detailed} />
              </Chart>
              <Tile>
                <Value>$0</Value>
                <Label>TVL</Label>
              </Tile>
              <Tile>
                <Value>1.1</Value>
                <Label>Coef</Label>
              </Tile>
              <Tile>
                <Value>0%</Value>
                <Label>TFA</Label>
              </Tile>
            </ChartContainer>
          </Flex>
        </Content>
      </Wrapper>
    </Card>
  )
}

export default MemberMobile
