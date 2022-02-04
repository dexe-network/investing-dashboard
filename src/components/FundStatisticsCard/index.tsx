// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import ProgressBar from "components/ProgressBar"
import chartIcon from "assets/icons/bar-chart-icon.svg"
import { Flex } from "theme"
import { Label, InfoRow, Container, Icon, Emission } from "./styled"

const FundStatisticsCard: React.FC = () => {
  return (
    <Container>
      <Flex p="40px 25px 0" full>
        <ProgressBar label="500/1000" value="Investors" />
        <ProgressBar label="13/25" value="Open trades" />
      </Flex>
      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Total P&L</Label>
      </Flex>

      <Flex full>
        <Flex full p="0 75px 0 0">
          <InfoRow label={"DEXE"} value={"50%"} />
        </Flex>
        <Flex full p="0 0 0 75px">
          <InfoRow label={"USD"} value={"52%"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 75px 0 0">
          <InfoRow label={"ETH"} value={"43.13%"} />
        </Flex>
        <Flex full p="0 0 0 75px">
          <InfoRow label={"BTC"} value={"51%"} />
        </Flex>
      </Flex>
      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Funds</Label>
      </Flex>
      <Flex full p="14px 0 0">
        <Emission total={"10000 ISDX"} current={"3000 ISDX"} />
      </Flex>
      <InfoRow label={"Traders LP"} value={"100 ISDX"} />
      <InfoRow label={"Invested"} value={"5000 DEXE"} />
      <InfoRow label={"Investors LP"} value={"300 ISDX"} />

      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Average</Label>
      </Flex>

      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Trades per Day"} value={"2.1"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Order Size"} value={"6.2%"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Daily Profit"} value={"0.13%"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Time Positions"} value={"28.1H"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Sortino (ETH)"} value={"7.2"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Sortino (BTC)"} value={"4.3"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Trades"} value={"346"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Max.Loss"} value={"-13.21%"} />
        </Flex>
      </Flex>
    </Container>
  )
}

export default FundStatisticsCard
