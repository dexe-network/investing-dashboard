// import React, { useState, useRef } from "react"
import { Flex, To } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"
import AreaChart from "components/AreaChart"
import defaultAvatar from "assets/icons/default-avatar.svg"
import { IPool } from "constants/interfaces"
import { useWeb3React } from "@web3-react/core"
import { useSelectOwnedPools } from "state/user/hooks"
import swipeRight from "assets/icons/swipe-arrow-right.svg"
import { useConnectWalletContext } from "context/ConnectWalletContext"
import { useCreateFundContext } from "context/CreateFundContext"
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
  CopiersPnl,
} from "components/MemberMobile/styled"
import { shortenAddress } from "utils"

interface Props {
  onArrowClick: () => void
}

const AvatarWrapper = styled(AvatarContainer)`
  margin-right: -48px;
`

const Stats = styled(Flex)`
  width: 80%;
`

const InvestorMobile: React.FC<Props> = () => {
  const { account } = useWeb3React()
  const ownedPools = useSelectOwnedPools()
  const { toggleConnectWallet } = useConnectWalletContext()
  const { toggleCreateFund } = useCreateFundContext()
  const user = useSelectUserData()

  const handleCreate = () => {
    if (account?.length !== 42) {
      toggleConnectWallet(true)
      return
    }

    toggleCreateFund(true)
  }

  console.log(user)
  if (!user) return null

  return (
    <Card ai="flex-end" full>
      <AvatarWrapper>
        <Avatar size={112} url={user.avatar} />
        <TraderName>{user.nickname}</TraderName>
      </AvatarWrapper>
      <Wrapper full>
        <Flex ai="flex-end" p="0 0 0 36px" full>
          <CopiersLabel>Investor</CopiersLabel>
          {!ownedPools || !ownedPools.length ? (
            <img onClick={handleCreate} src={swipeRight} />
          ) : (
            <To to={`/pool/${ownedPools[0].poolAdr}`}>
              <img src={swipeRight} />
            </To>
          )}
        </Flex>
        <Content>
          <Flex p="13px 0 8px" full jc="space-evenly">
            <Stats>
              <Tile>
                <Value>$0k</Value>
                <Label>Invested</Label>
              </Tile>
              <Tile>
                <Value>$0k</Value>
                <Label>TV</Label>
              </Tile>
              <Tile>
                <Value>0%</Value>
                <Label>P&L</Label>
              </Tile>
            </Stats>
          </Flex>
        </Content>
      </Wrapper>
    </Card>
  )
}

export default InvestorMobile
