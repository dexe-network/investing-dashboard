import React, { useEffect, useState, useRef } from "react"
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
import { IPoolQuery } from "constants/interfaces_v2"
import { useERC20 } from "hooks/useContract"
import { formatNumber } from "utils"
import Icon from "components/Icon"
import { getLastInArray, getPNL, getPriceLP, getUSDPrice } from "utils/formulas"

import { usePoolMetadata } from "state/ipfsMetadata/hooks"

// @param data - pool data
// @param index - indicating index in all list of pools
const MemberMobile: React.FC<{
  data: IPoolQuery
  index?: number
}> = ({ data, index = 0, children }) => {
  const [baseContract, baseData] = useERC20(data.baseToken)
  const priceLP = getPriceLP(data.priceHistory)
  const pnl = getPNL(priceLP)
  const lastHistoryPoint = getLastInArray(data.priceHistory)

  const [{ poolMetadata }] = usePoolMetadata(data.id, data.descriptionURL)

  return (
    <Card
      initial={!index ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{
        duration: 0.2,
        delay: index / ((20 * index) ^ 2),
        ease: [0.29, 0.98, 0.29, 1],
      }}
    >
      <PoolInfoContainer>
        <PoolInfo>
          <Icon
            size={38}
            source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
            address={data.id}
          />
          <div>
            <Title>{data.ticker}</Title>
            <Description>{data.name}</Description>
          </div>
        </PoolInfo>
        <BaseInfo>
          <TokenIcon address={data.baseToken} size={38} />
          <div>
            <Title>
              {formatNumber(priceLP, 2)}
              <PNL>{pnl}%</PNL>
            </Title>
            <Description>{baseData?.symbol}</Description>
          </div>
        </BaseInfo>
      </PoolInfoContainer>
      <Divider />
      <PoolStatisticContainer>
        <Statistic
          label="TVL"
          value={`$${getUSDPrice(
            lastHistoryPoint ? lastHistoryPoint.usdTVL : 0
          )}`}
        />
        <Statistic label="APY" value="0%" />
        <Statistic label="P&L" value={`0%`} />
        <Statistic label="Depositors" value={<>{data.investorsCount}</>} />
      </PoolStatisticContainer>
      {children}
    </Card>
  )
}

export default MemberMobile
