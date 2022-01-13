// import React, { useState, useRef } from "react"
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

const MemberMobile = ({ index = 0 }) => {
  return (
    <Card
      initial={{ opacity: 0, y: -15 }}
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
          <TokenIcon size={38} />
          <div>
            <Title>ISDX</Title>
            <Description>BIG TRADE Big Fund</Description>
          </div>
        </PoolInfo>
        <BaseInfo>
          <TokenIcon size={38} />
          <div>
            <Title>
              $22.12
              <PNL>+332.14%</PNL>
            </Title>
            <Description>10, JAN 2022</Description>
          </div>
        </BaseInfo>
      </PoolInfoContainer>
      <Divider />
      <PoolStatisticContainer>
        <Statistic label="TVL" value="230k" />
        <Statistic label="APY" value="35%" />
        <Statistic label="P&L" value="65%" />
        <Statistic
          label="Investors"
          value={
            <>
              34 <PNL>+13%</PNL>
            </>
          }
        />
        <BuyButton onClick={() => {}} />
      </PoolStatisticContainer>
    </Card>
  )
}

export default MemberMobile
