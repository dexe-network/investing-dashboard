import React, { useState, useRef } from "react"
import { format, formatDistance, formatRelative, subDays } from "date-fns"
import { Flex, To } from "theme"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Avatar from "components/Avatar"
import TokenIcon from "components/TokenIcon"
import { BuyButton } from "components/Button"

import {
  Card,
  PoolInfoContainer,
  PoolInfo,
  Title,
  Description,
  BaseInfo,
  Divider,
  PoolStatisticContainer,
  Statistic,
  PNL,
} from "./styled"
import { Pool } from "constants/interfaces_v2"
import { useERC20 } from "hooks/useContract"
import { ethers } from "ethers"
import { formatNumber } from "utils"

// @param data - pool data
// @param index - indicating index in all list of pools
const MemberMobile: React.FC<{ data: Pool; index?: number }> = ({
  data,
  index = 0,
  children,
}) => {
  const [baseContract, baseData] = useERC20(data.parameters.baseToken)

  return (
    <Card
      initial={!index ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.5,
        delay: index / ((20 * index) ^ 2),
        ease: [0.29, 0.98, 0.29, 1],
      }}
    >
      <PoolInfoContainer>
        <PoolInfo>
          <TokenIcon size={42} />
          <div>
            <Title>{data.ticker}</Title>
            <Description>{data.name}</Description>
          </div>
        </PoolInfo>
        <BaseInfo>
          <TokenIcon address={baseData?.address} size={42} />
          <div>
            <Title>
              {formatNumber(data.lpPrice) === "1"
                ? "1.00"
                : formatNumber(data.lpPrice, 4)}
              <PNL>{data.lpPnl}%</PNL>
            </Title>
            <Description>
              {/* {format(data.history.creationTime * 1000, "dd, MMM yyyy")} */}
              {baseData?.symbol}
            </Description>
          </div>
        </BaseInfo>
      </PoolInfoContainer>
      <Divider />
      <PoolStatisticContainer>
        <Statistic
          label="TVL"
          value={`$${formatNumber(
            ethers.utils
              .formatUnits(data.leverageInfo.totalPoolUSD, 18)
              .toString(),
            2
          )}`}
        />
        <Statistic label="APY" value="0%" />
        <Statistic label="P&L" value={`${data.lpPnl}%`} />
        <Statistic
          label="Investors"
          value={
            <>
              {data.totalInvestors} <PNL>0%</PNL>
            </>
          }
        />
      </PoolStatisticContainer>
      {children}
    </Card>
  )
}

export default MemberMobile
