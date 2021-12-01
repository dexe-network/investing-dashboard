// import React, { useState, useRef } from "react"
import styled from "styled-components"
import AreaChart from "components/AreaChart"
import { Flex, Text, Block } from "theme"
import { HalfBlock, Label, AreaWrapper } from "pages/Trader/styled"
import { IPoolInfo, IDetailedChart } from "constants/interfaces"

const MonthLabel = styled(Text)`
  color: #f5f5f5;
  text-align: center;
  font-size: 14px;
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
  color: #f5f5f5;
  font-size: 19px;
  font-weight: bold;
`

const ProfitAll = styled(Text)`
  color: #7fffd4;
  font-size: 32px;
  font-weight: bold;
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
