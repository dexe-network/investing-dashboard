// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import { useState } from "react"
import AreaChart from "components/AreaChart"
import BarChart from "components/BarChart"
import Funds from "components/Funds"
import { IPool } from "constants/interfaces"
import { Orientation } from "constants/types"
import { ease, Flex } from "theme"

import {
  MemberCard,
  MemberBase,
  AvatarContainer,
  Avatar,
  Rank,
  FloatingText,
  Copiers,
  TextBig,
  TextSmall,
  Row,
  Col,
  Button,
  BarChartWrapper,
  DetailedChart,
  Fee,
  ButtonGroup,
  PnlGroup,
  MiddleContent,
  StatisticsContainer,
  StatisticsTitle,
  StatisticsItem,
} from "./styled"

interface Props {
  data: IPool
}

const animation = {
  active: {
    height: "fit-content",
  },
  default: {
    height: "82px",
    transition: { delay: 1, ease, duration: 0.2 },
  },
}

const middleContentVariants = {
  active: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
  default: {
    display: "flex",
    opacity: 1,
  },
}

const statisticsContainerVariants = {
  active: {
    opacity: 1,
    display: "flex",
    width: 250,
    transition: { delay: 0.8 },
  },
  default: {
    opacity: 0,
    width: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

const chartVariants = {
  active: {
    display: "flex",
    opacity: 1,
  },
  default: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

const Member: React.FC<Props> = ({ data }) => {
  const [active, setActive] = useState(false)

  const {
    avatar,
    firstName,
    lastName,
    copiers,
    rank,
    symbol,
    price,
    pnl,
    commision,
  } = data

  const animate = active ? "active" : "default"

  return (
    <MemberCard
      animate={animate}
      variants={animation}
      initial="default"
      transition={{ duration: 0.3 }}
      onClick={() => setActive(!active)}
    >
      <Flex full dir="column" ai="flex-start">
        <MemberBase>
          <FloatingText>
            {`${firstName} ${lastName}`}
            <Copiers>{copiers}</Copiers> copiers
          </FloatingText>

          <Row minW={215}>
            <AvatarContainer>
              <Avatar src={avatar} />
              <Rank>{rank}</Rank>
            </AvatarContainer>

            <Row m={10}>
              <Funds type={Orientation.vertical} />
            </Row>

            <Col>
              <TextBig>{symbol}</TextBig>
              <TextSmall>{price} ETH</TextSmall>
              <TextSmall color="#999999">% & White List</TextSmall>
            </Col>
          </Row>

          <MiddleContent
            initial="default"
            animate={animate}
            variants={middleContentVariants}
            full
            p="0 20px"
          >
            <PnlGroup>
              <TextBig align="center">{pnl.total}%</TextBig>
              <TextSmall align="center">P&L</TextSmall>
            </PnlGroup>

            <Col>
              <TextSmall align="center">999999 LP/∞ LP</TextSmall>
              <TextBig align="center">
                {999999} ETH/{999999} ETH
              </TextBig>
              <TextSmall color="#999999" align="center">
                Traders funds/Total funds
              </TextSmall>
            </Col>

            <BarChartWrapper>
              <BarChart pnlList={pnl.monthly} />
            </BarChartWrapper>

            <DetailedChart>
              <AreaChart
                tooltipSize="sm"
                width={219}
                height={63}
                data={pnl.detailed}
              />
            </DetailedChart>

            <Fee>
              <TextBig color="#999999" align="center">
                {commision}%
              </TextBig>
              <TextSmall color="#999999" align="center">
                Fee
              </TextSmall>
            </Fee>
          </MiddleContent>

          <ButtonGroup>
            <Button>Invest</Button>
            <Button secondary>Details</Button>
          </ButtonGroup>
        </MemberBase>
        <Flex initial="default" variants={chartVariants} animate={animate} full>
          <AreaChart tooltipSize="sm" height={286} data={pnl.detailed} />
        </Flex>
      </Flex>
      <StatisticsContainer
        variants={statisticsContainerVariants}
        animate={animate}
        initial="default"
      >
        <StatisticsTitle>Detailed statistics</StatisticsTitle>

        <StatisticsItem label="P&L LP-$ETH">+1 ETH</StatisticsItem>
        <StatisticsItem label="P&L LP-$ETH percent">+100%</StatisticsItem>
        <StatisticsItem label="P&L LP-USD">0 USD</StatisticsItem>
        <StatisticsItem label="P&L LP-USD percent">0%</StatisticsItem>
        <StatisticsItem label="Personal funds:">39 ETH(13%)</StatisticsItem>
        <StatisticsItem label="Invested:">2141 ETH</StatisticsItem>
        <StatisticsItem label="Profit Factor:">3.37</StatisticsItem>
        <StatisticsItem label="Trades:">346</StatisticsItem>
        <StatisticsItem label="Average trades per day:">2.1</StatisticsItem>
        <StatisticsItem label="Average daily profit in LP:">
          0.13%
        </StatisticsItem>
        <StatisticsItem label="Average order size:">6.2%</StatisticsItem>
        <StatisticsItem label="Average time position:">28.1H</StatisticsItem>
        <StatisticsItem label="Maximum Loss:">-13.21%</StatisticsItem>
        <StatisticsItem label="Sortino $ETH:">7.2</StatisticsItem>
        <StatisticsItem label="Sortino BTC:">13.8</StatisticsItem>
        <StatisticsItem label="Circulating Supply:">220 ISDX</StatisticsItem>
        <StatisticsItem label="Total Supply:">1000 ISDX</StatisticsItem>
      </StatisticsContainer>
    </MemberCard>
  )
}

export default Member
