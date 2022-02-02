// import React, { useState, useRef } from "react"
import { Flex } from "theme"
import { ethers } from "ethers"

import Avatar from "components/Avatar"
import Tooltip from "components/Tooltip"

import { formatNumber, shortenAddress } from "utils"

import shareIcon from "assets/icons/share.svg"

import {
  Card,
  PoolInfoContainer,
  PoolInfo,
  Title,
  Description,
  Divider,
  PoolStatisticContainer,
  Statistic,
  PNL,
  ShareButton,
} from "./styled"

interface Props {
  account: string | null | undefined
}

const InvestorMobile: React.FC<Props> = ({ account, children }) => {
  return (
    <Card
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.5,
        ease: [0.29, 0.98, 0.29, 1],
      }}
    >
      <PoolInfoContainer>
        <PoolInfo>
          <Avatar size={38} />
          <Flex p="0 0 0 10px" dir="column" ai="flex-start">
            <Title>{shortenAddress(account)}</Title>
            <Description>
              Investing <PNL>0%</PNL>
              <Tooltip size="small" id="1">
                1 week LP price change
              </Tooltip>
            </Description>
          </Flex>
        </PoolInfo>
        <ShareButton src={shareIcon} />
      </PoolInfoContainer>
      <Divider />
      <PoolStatisticContainer>
        <Statistic label="Invested" value={`$213.34`} />
        <Statistic label="TV" value="$328.82" />
        <Statistic label="P&L" value={`12%`} />
        <Statistic label="Pools" value={<>3</>} />
      </PoolStatisticContainer>
      {children}
    </Card>
  )
}

export default InvestorMobile
