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

import { useSelectUserData } from "state/user/hooks"

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

interface Props {
  decimal: number
  symbol: string
  currentPrice: string
  priceChange24H: number
  totalValueLocked: string
  annualPercentageYield: number
  profitAndLoss: number
}

const AvatarWrapper = styled(AvatarContainer)`
  margin-right: -48px;
`

const TraderMobile: React.FC<Props> = ({
  decimal,
  symbol,
  currentPrice,
  priceChange24H,
  totalValueLocked,
  annualPercentageYield,
  profitAndLoss,
}) => {
  const { account } = useWeb3React()
  const user = useSelectUserData()

  if (!user) return null

  return (
    <Card ai="flex-end" full>
      <AvatarWrapper>
        <Avatar size={112} url={user.avatar} />
        <TraderName>{user.nickname || shortenAddress(account, 4)}</TraderName>
      </AvatarWrapper>
      <Wrapper full>
        <Flex ai="flex-end" p="0 0 0 36px" full>
          <CopiersLabel>Fund</CopiersLabel>
          <To to="/investor">
            <img src={swipeLeft} />
          </To>
        </Flex>
        <Content>
          <Flex dir="column" jc="space-between" full>
            <Flex p="13px 0 8px 32px" full jc="flex-start">
              <Ticker>{symbol}</Ticker>
              <Flex ai="center">
                <Price>
                  $
                  {formatNumber(
                    ethers.utils
                      .formatUnits(currentPrice.toString(), decimal)
                      .toString(),
                    2
                  )}
                </Price>
                <Pnl>{priceChange24H}%</Pnl>
              </Flex>
            </Flex>
            <Flex p="5px 0 0 25px" full jc="space-evenly">
              <Tile>
                <Value>
                  $
                  {formatNumber(
                    ethers.utils
                      .formatUnits(totalValueLocked.toString(), decimal)
                      .toString(),
                    3
                  )}
                </Value>
                <Label>TVL</Label>
              </Tile>
              <Tile>
                <Value>
                  {formatNumber(annualPercentageYield.toString(), 3)}%
                </Value>
                <Label>APY</Label>
              </Tile>
              <Tile>
                <Value>{formatNumber(profitAndLoss.toString(), 3)}%</Value>
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
