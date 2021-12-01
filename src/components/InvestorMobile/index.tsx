// import React, { useState, useRef } from "react"
import { Flex } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"

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
  return (
    <Card ai="flex-end" full>
      <AvatarWrapper>
        <Avatar size={112} />
        <TraderName>Irvin Smith</TraderName>
      </AvatarWrapper>
      <Wrapper full>
        <Flex ai="flex-end" p="0 0 0 36px" full>
          <CopiersLabel>Investor</CopiersLabel>
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
