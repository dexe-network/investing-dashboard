import React, { useState, useRef, useEffect } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { useWeb3React } from "@web3-react/core"
import ProgressBar from "components/ProgressBar"
import chartIcon from "assets/icons/bar-chart-icon.svg"
import unlim from "assets/icons/unlimited-emmission.svg"
import { Flex } from "theme"
import { Label, InfoRow, Container, Icon, Emission, LabelIcon } from "./styled"
import { Pool } from "constants/interfaces_v2"
import { BigNumber, ethers } from "ethers"
import { formatBigNumber, formatNumber } from "utils"
import useContract from "hooks/useContract"
import { TraderPool } from "abi"

const FundStatisticsCard: React.FC<{ data: Pool }> = ({ data }) => {
  const [traderLp, setTraderLp] = useState<BigNumber>(BigNumber.from("0"))
  const [accountLp, setAccountLp] = useState<BigNumber>(BigNumber.from("0"))
  const { account } = useWeb3React()
  // const totalEmission = ethers.utils.formatEther(
  //   data.parameters.totalLPEmission
  // )
  // const traderPool = useContract(data.address, TraderPool)
  // const circulatingSupply = formatBigNumber(data.lpEmission, 18, 6)

  // useEffect(() => {
  //   if (!traderPool || !account || !data.parameters.trader) return
  //   ;(async () => {
  //     const userLpBalance = await traderPool.balanceOf(account)
  //     const traderLpBalance = await traderPool.balanceOf(data.parameters.trader)
  //     setTraderLp(traderLpBalance)
  //     setAccountLp(userLpBalance)
  //   })()
  // }, [traderPool, account, data.parameters.trader])

  return (
    <Container>
      <Flex p="40px 25px 0" full>
        <ProgressBar
          percent={Number(data.totalInvestors) / 10}
          label={`${data.totalInvestors}/1000`}
          value="Investors"
        />
        <ProgressBar percent={0} label="0/25" value="Open trades" />
      </Flex>
      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Total P&L</Label>
      </Flex>

      <Flex full>
        <Flex full p="0 75px 0 0">
          <InfoRow label={"DEXE"} value={`${data.lpPnl}%`} />
        </Flex>
        <Flex full p="0 0 0 75px">
          <InfoRow label={"USD"} value={`${data.lpPnl}%`} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 75px 0 0">
          <InfoRow label={"ETH"} value={`${data.lpPnl}%`} />
        </Flex>
        <Flex full p="0 0 0 75px">
          <InfoRow label={"BTC"} value={`${data.lpPnl}%`} />
        </Flex>
      </Flex>
      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Funds</Label>
      </Flex>
      {/* <Flex full p="14px 0 0">
        <Emission
          percent={9}
          total={
            totalEmission === "0.0" ? (
              <LabelIcon src={unlim} />
            ) : (
              `${totalEmission} ${data.ticker}`
            )
          }
          current={`${circulatingSupply} ${data.ticker}`}
        />
      </Flex> */}
      <InfoRow
        label={"Traders LP"}
        value={`${ethers.utils.formatEther(traderLp).toString()} ${
          data.ticker
        }`}
      />
      <InfoRow
        label={"Invested LP"}
        value={`${formatBigNumber(accountLp, 18, 6)} ${data.ticker}`}
      />
      <InfoRow
        label={"Investors LP"}
        value={`${formatBigNumber(
          BigNumber.from(data.lpEmission).sub(traderLp),
          18,
          6
        )} ${data.ticker}`}
      />

      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Average</Label>
      </Flex>

      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Trades per Day"} value={"0"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Order Size"} value={"0%"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Daily Profit"} value={"0%"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Time Positions"} value={"0H"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Sortino (ETH)"} value={"0"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Sortino (BTC)"} value={"0"} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Trades"} value={"0"} />
        </Flex>
        <Flex full p="0 0 0 25px">
          <InfoRow label={"Max.Loss"} value={"0%"} />
        </Flex>
      </Flex>
    </Container>
  )
}

export default FundStatisticsCard
