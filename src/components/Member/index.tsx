// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import AreaChart from "components/AreaChart"
import BarChart from "components/BarChart"
import Funds from "components/Funds"
import Avatar from "components/Avatar"
import StatisticsCalendar from "components/StatisticsCalendar"
import { Title } from "pages/Profile/styled"
import TokenIcon from "components/TokenIcon"

import { IPool } from "constants/interfaces"
import { Orientation } from "constants/types"

import { useERC20 } from "hooks/useContract"
import { ease, Flex, To } from "theme"
import { shortenAddress, formatNumber } from "utils"
import { useTraderPoolUpgradeable } from "hooks/useContract"
import { BigNumber } from "@ethersproject/bignumber"
import { ethers } from "ethers"

import {
  MemberCard,
  MemberBase,
  AvatarContainer,
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
  ChartContainer,
  FundsLimitGroup,
  PoolInfo,
  FundContainer,
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
    transition: { delay: 0.5, ease, duration: 0.4 },
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
    padding: "15px 12px 15px 20px",
    opacity: 1,
    display: "flex",
    width: 276,
    transition: { delay: 0.5, ease, duration: 0.4 },
  },
  default: {
    padding: "0",
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
    transition: { delay: 0.5, ease, duration: 0.4 },
  },
  default: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

const Member: React.FC<Props> = ({ data }) => {
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
    poolAddress,
    baseAddress,
    ownerAddress,
  } = data

  const [active, setActive] = useState(false)
  const [_, baseTokenData] = useERC20(baseAddress)
  const [traderDeposit, setTraderDeposit] = useState(BigNumber.from(0))
  const [tvl, setTvl] = useState([BigNumber.from(0), BigNumber.from(0)])
  const traderPool = useTraderPoolUpgradeable(poolAddress)

  useEffect(() => {
    if (!traderPool) return

    const getData = async () => {
      const data = await traderPool.getUserData(ownerAddress)
      const tvl = await traderPool.getTotalValueLocked()
      setTvl(tvl)
      setTraderDeposit(data[2])
    }
    getData()
  }, [traderPool, setTraderDeposit, ownerAddress])

  const animate = active ? "active" : "default"
  const traderName =
    firstName.length === 42
      ? shortenAddress(firstName, 4)
      : `${firstName} ${lastName}`

  return (
    <MemberCard
      animate={animate}
      variants={animation}
      initial="default"
      transition={{ duration: 0.3 }}
    >
      <Flex full dir="column" ai="flex-start">
        <MemberBase>
          <FloatingText>
            {traderName}
            <Copiers>{copiers}</Copiers> copiers
          </FloatingText>

          <Row minW={235}>
            <AvatarContainer>
              <Avatar url={avatar} size={64} />
              <Rank>{rank}</Rank>
            </AvatarContainer>

            <PoolInfo>
              <Flex ai="center">
                <TextBig>{symbol}</TextBig>
                <FundContainer>
                  <TokenIcon
                    src={`https://tokens.1inch.exchange/${baseAddress.toLowerCase()}.png`}
                    size={15}
                  />
                </FundContainer>
              </Flex>
              <TextSmall>
                {price} {baseTokenData?.symbol}
              </TextSmall>
              <TextSmall color="#999999">% & White List</TextSmall>
            </PoolInfo>
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

            <FundsLimitGroup>
              <TextSmall align="center">
                {formatNumber(ethers.utils.formatUnits(tvl[1]).toString())} LP/∞
                LP
              </TextSmall>
              <TextBig align="center">
                {formatNumber(
                  ethers.utils.formatUnits(traderDeposit, 18).toString()
                )}{" "}
                {baseTokenData?.symbol}/
                {formatNumber(ethers.utils.formatUnits(tvl[0]).toString())}{" "}
                {baseTokenData?.symbol}
              </TextBig>
              <TextSmall color="#999999" align="center">
                Traders funds/Total funds
              </TextSmall>
            </FundsLimitGroup>

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
            <To to={`/pools/invest/${poolAddress}`}>
              <Button>Invest</Button>
            </To>
            <Button onClick={() => setActive(!active)} secondary>
              Details
            </Button>
          </ButtonGroup>
        </MemberBase>
        <ChartContainer
          initial="default"
          variants={chartVariants}
          animate={animate}
          ai="flex-start"
          dir="column"
          p="0 10px"
        >
          {/* <AreaChart
            title
            period
            tooltipSize="sm"
            width="100%"
            height={286}
            data={pnl.detailed}
          /> */}
          <Title weight={800}>Monthly statistics</Title>
          <StatisticsCalendar currentYear data={data.pnl.monthly} />
          <StatisticsCalendar data={data.pnl.monthly} />
        </ChartContainer>
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
