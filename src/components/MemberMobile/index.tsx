// import React, { useState, useRef } from "react"
import { Flex } from "theme"
import Avatar from "components/Avatar"
import defaultAvatar from "assets/icons/default-avatar.svg"

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
} from "./styled"

const MemberMobile: React.FC = () => {
  return (
    <Card ai="flex-end" full>
      <AvatarContainer>
        <Avatar size={112} url={defaultAvatar} />
        <TraderName>Irvin Smith</TraderName>
      </AvatarContainer>
      <Wrapper full>
        <Flex p="0 0 0 36px">
          <CopiersCounter>1,241</CopiersCounter>
          <CopiersLabel>copiers</CopiersLabel>
          <CopiersPnl>+2.1%</CopiersPnl>
        </Flex>
        <Content>
          <Flex p="13px 0 8px">
            <Ticker>ISDX</Ticker>
            <Price>$2.13</Price>
            <Pnl>+3.14%</Pnl>
          </Flex>
          <Flex jc="flex-start" full p="0 8px 0 0">
            <Tile>
              <Value>$273k</Value>
              <Label>TVL</Label>
            </Tile>
            <Tile>
              <Value>16.1</Value>
              <Label>Coef</Label>
            </Tile>
            <Tile>
              <Value>66%</Value>
              <Label>TFA</Label>
            </Tile>
          </Flex>
        </Content>
      </Wrapper>
    </Card>
  )
}

export default MemberMobile
