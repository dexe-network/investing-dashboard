// import React, { useState, useRef } from "react"
import styled from "styled-components"
// import { motion } from "framer-motion"

import Chart from "components/Chart"
import BarChart from "components/BarChart"
import { BaseButton } from "theme"
import Funds from "components/Funds"
import { Orientation } from "constants/types"

interface Props {
  avatar: string
  rank: number
  name: string
  copiers: number
  pnl: number
  tradersFunds: number
  totalFunds: number
  traderFee: number
}

const MemberCard = styled.div`
  position: relative;
  background: rgb(41, 49, 52);
  background: linear-gradient(
    204deg,
    rgba(41, 49, 52, 1) -10%,
    rgba(53, 52, 75, 1) 100%
  );
  border-radius: 10px;
  height: 72px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  margin-bottom: 20px;
  transition: transform 0.3s;

  &:first-child {
    margin-top: 15px;
  }
`

const AvatarContainer = styled.div`
  height: 64px;
  width: 64px;
  position: relative;
`

const Avatar = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50px;
`

const Rank = styled.div`
  position: absolute;
  bottom: 0px;
  right: -5px;
  color: #f5f5f5;
  font-weight: bold;
  font-size: 16px;
`

const FloatingText = styled.span`
  position: absolute;
  top: -15px;
  font-size: 14px;
  color: #999999;
`

const Copiers = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #7fffd4;
  margin-left: 10px;
`

const TextBig = styled.div<{ color?: string; align?: string }>`
  font-size: 22px;
  font-weight: bold;

  color: ${(props) => (props.color ? props.color : "#f5f5f5")};
  text-align: ${(props) => (props.align ? props.align : "left")};
`

const TextSmall = styled.div<{ color?: string; align?: string }>`
  font-size: 14px;
  font-weight: 300;

  color: ${(props) => (props.color ? props.color : "#f5f5f5")};
  text-align: ${(props) => (props.align ? props.align : "left")};
`

const Row = styled.div<{ m?: number }>`
  display: flex;

  margin: 0 ${(props) => (props.m ? props.m : 0)}px;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

// TODO: inherit from base button
const Button = styled(BaseButton)<{ secondary?: boolean }>`
  margin: 1px;
  border-radius: 7px;
  color: ${(props) => (props.secondary ? "#B2B2B2" : "#000000")};
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  height: 31px;
  padding: 0 22px;

  background: ${(props) =>
    props.secondary
      ? "#21272A"
      : "radial-gradient(circle,rgba(127, 255, 212, 1) 0%,rgba(64, 128, 106, 1) 120%);"};

  &:hover {
    background: ${(props) =>
      props.secondary
        ? "#21272A"
        : "radial-gradient(circle,rgba(127, 255, 212, 1) 0%,rgba(64, 128, 106, 1) 120%);"};
  }
  &:focus {
    background: ${(props) =>
      props.secondary
        ? "#21272A"
        : "radial-gradient(circle,rgba(127, 255, 212, 1) 0%,rgba(64, 128, 106, 1) 120%);"};
    outline: 0px solid transparent;
  }
`

const Member: React.FC<Props> = (props) => {
  return (
    <MemberCard>
      <FloatingText>
        {props.name}
        <Copiers>{props.copiers}</Copiers> copiers
      </FloatingText>

      <Row>
        <AvatarContainer>
          <Avatar src={props.avatar} />
          <Rank>{props.rank}</Rank>
        </AvatarContainer>

        <Row m={10}>
          <Funds type={Orientation.vertical} />
        </Row>

        <Col>
          <TextBig>ISDX</TextBig>
          <TextSmall>0.1492 ETH</TextSmall>
          <TextSmall color="#999999">% & White List</TextSmall>
        </Col>
      </Row>

      <Col>
        <TextBig align="center">{props.pnl}%</TextBig>
        <TextSmall align="center">P&L</TextSmall>
      </Col>

      <Col>
        <TextSmall align="center">39.13 LP/∞ LP</TextSmall>
        <TextBig align="center">122.86 ETH/439.6 ETH</TextBig>
        <TextSmall color="#999999" align="center">
          Traders funds/Total funds
        </TextSmall>
      </Col>

      <Row>
        <BarChart />
      </Row>

      <Row>
        <Chart width={220} height={90} />
      </Row>

      <Col>
        <TextBig color="#999999" align="center">
          {props.traderFee}%
        </TextBig>
        <TextSmall color="#999999" align="center">
          Fee
        </TextSmall>
      </Col>

      <Col>
        <Button>Invest</Button>
        <Button secondary>Details</Button>
      </Col>
    </MemberCard>
  )
}

export default Member
