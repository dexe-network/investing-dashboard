// import React, { useState, useRef } from "react"
import { Flex, To } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"
import AreaChart from "components/AreaChart"
import defaultAvatar from "assets/icons/default-avatar.svg"
import { IPool } from "constants/interfaces"
import { useWeb3React } from "@web3-react/core"
import swipeLeft from "assets/icons/swipe-arrow-left.svg"
import { ethers } from "ethers"

import {
  Card,
  AvatarContainer,
  Wrapper,
  TraderName,
  Content,
  Tile,
  Value,
  Label,
  CopiersLabel,
  Ticker,
  Price,
  Pnl,
  CopiersPnl,
} from "components/MemberMobile/styled"
import { shortenAddress, formatNumber } from "utils"

const AvatarWrapper = styled(AvatarContainer)`
  margin-right: -48px;
`

const TraderMobile = () => {
  const { account } = useWeb3React()

  return (
    <Card ai="flex-end" full>
      <AvatarWrapper>
        <Avatar size={112} />
        <TraderName>Irvin Smith</TraderName>
      </AvatarWrapper>
      <Wrapper full>
        <Flex ai="flex-end" p="0 0 0 36px" full>
          <CopiersLabel>Fund</CopiersLabel>
        </Flex>
        <Content>
          <Flex dir="column" jc="space-between" full>
            <Flex p="13px 0 8px 32px" full jc="flex-start">
              <Ticker>ISDX</Ticker>
              <Flex ai="center">
                <Price>${formatNumber("2.13", 2)}</Price>
                <Pnl>{formatNumber("2.13", 2)}%</Pnl>
              </Flex>
            </Flex>
            <Flex p="5px 0 0 25px" full jc="space-evenly">
              <Tile>
                <Value>${formatNumber("213000", 0)}</Value>
                <Label>TVL</Label>
              </Tile>
              <Tile>
                <Value>{formatNumber("25.13", 2)}%</Value>
                <Label>APY</Label>
              </Tile>
              <Tile>
                <Value>{formatNumber("31.2", 2)}%</Value>
                <Label>P&L</Label>
              </Tile>
            </Flex>
          </Flex>
        </Content>
      </Wrapper>
    </Card>
  )
}

export default TraderMobile
