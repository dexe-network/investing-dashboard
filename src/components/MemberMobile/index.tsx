// import React, { useState, useRef } from "react"
import { Flex, To } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"
import { Link } from "react-router-dom"
import AreaChart from "components/AreaChart"
import { Pool } from "constants/interfaces_v2"

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

const AvatarWrapper = styled(AvatarContainer)`
  margin-right: -48px;
`

const MemberMobile = ({ index = 0 }) => {
  return (
    <Card
      initial={{ opacity: 0, y: -15, scaleY: 0.9 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -15, scaleY: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index / ((20 * index) ^ 2),
        ease: [0.29, 0.98, 0.29, 1],
      }}
      ai="flex-end"
      full
    >
      <AvatarWrapper>
        <Avatar size={112} />
        <TraderName>{`Irvin Smith`}</TraderName>
      </AvatarWrapper>
      <Wrapper full>
        <Flex p="0 0 0 36px">
          <CopiersCounter>17</CopiersCounter>
          <CopiersLabel>investors</CopiersLabel>
          <CopiersPnl>0.00%</CopiersPnl>
        </Flex>
        <Content>
          <Flex dir="column" full>
            <Flex full jc="space-evenly">
              <Ticker>ISDX</Ticker>
              <Flex>
                <Price>$1.00</Price>
                <Pnl>0.00%</Pnl>
              </Flex>
              <To to={"#"}>
                <Link to="/pool/0x9e8D0235f1ccF9bff025Ad8504dd4438d749f9F9/exchange">
                  <BuyButton>Buy</BuyButton>
                </Link>
              </To>
            </Flex>
            <ChartContainer jc="space-between" full p="0 8px 0 0">
              <Chart>
                <AreaChart width={219} height={47} data={[]} />
              </Chart>
              <Tile>
                <Value>$0.00</Value>
                <Label>TVL</Label>
              </Tile>
              <Tile>
                <Value>25.5%</Value>
                <Label>APY</Label>
              </Tile>
              <Tile>
                <Value>31.22%</Value>
                <Label>P&L</Label>
              </Tile>
            </ChartContainer>
          </Flex>
        </Content>
      </Wrapper>
    </Card>
  )
}

export default MemberMobile
