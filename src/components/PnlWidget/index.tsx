// import React, { useState, useRef } from "react"
import styled from "styled-components"
import AreaChart from "components/AreaChart"
import { Flex, Text, Block } from "theme"
import { HalfBlock, Label, AreaWrapper } from "./styled"
import { IPoolInfo, IDetailedChart } from "constants/interfaces"

const MonthLabel = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: #5a6071;
`

const ProfitLossContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  position: relative;
  z-index: 20;
  padding-top: 10px;
`

const Period = styled(Flex)`
  width: 100%;
  justify-content: space-evenly;
`

const ProfitSm = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
  text-align: center;
  color: #f7f7f7;
`

const ProfitAll = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 31px;
  text-align: center;
  color: #9ae2cb;
`

const PnlWidget: React.FC<{
  pnlPeriod: IPoolInfo["profitAndLossByPeriod"]
  pnlChart: IDetailedChart[]
}> = ({ pnlPeriod, pnlChart }) => {
  return (
    <Block>
      <ProfitLossContainer>
        <Label>Profit & Loss in USD</Label>
        <Period>
          <HalfBlock>
            <ProfitSm>{pnlPeriod.m1.toFixed(1)}%</ProfitSm>
            <MonthLabel>1m</MonthLabel>
          </HalfBlock>
          <HalfBlock>
            <ProfitAll>{pnlPeriod.all.toFixed(1)}%</ProfitAll>
            <MonthLabel>All</MonthLabel>
          </HalfBlock>
          <HalfBlock>
            <ProfitSm>{pnlPeriod.m3.toFixed(1)}%</ProfitSm>
            <MonthLabel>3m</MonthLabel>
          </HalfBlock>
        </Period>
      </ProfitLossContainer>

      <AreaWrapper>
        <AreaChart tooltipSize="sm" width={219} height={75} data={pnlChart} />
      </AreaWrapper>
    </Block>
  )
}

export default PnlWidget
