import { FC, useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "ethers"

import { TraderPool } from "abi"
import useContract, { useERC20 } from "hooks/useContract"
import { IPoolQuery, LeverageInfo, PoolInfo } from "constants/interfaces_v2"

import { Flex } from "theme"
import ProgressBar from "components/ProgressBar"
import { Label, InfoRow, Container, Icon, LabelIcon } from "./styled"

import chartIcon from "assets/icons/bar-chart-icon.svg"

interface IProps {
  data: IPoolQuery
  leverage: LeverageInfo | null
  info: PoolInfo | null
}

const FundStatisticsCard: FC<IProps> = ({ data, leverage, info }) => {
  const [traderLp, setTraderLp] = useState<BigNumber>(BigNumber.from("0"))
  const [accountLp, setAccountLp] = useState<BigNumber>(BigNumber.from("0"))
  const [, baseData] = useERC20(data.baseToken)
  const traderPool = useContract(data.id, TraderPool)
  const { account } = useWeb3React()

  // UI variables
  const openPositionsPercent = info?.openPositions.length || 0 * 4
  const openPositions = info?.openPositions.length || 0

  useEffect(() => {
    if (!traderPool || !account || !info || !info.parameters.trader) return
    ;(async () => {
      const userLpBalance = await traderPool.balanceOf(account)
      const traderLpBalance = await traderPool.balanceOf(info.parameters.trader)
      setTraderLp(traderLpBalance)
      setAccountLp(userLpBalance)
    })()
  }, [traderPool, account, info])

  return (
    <Container>
      <Flex p="40px 25px 0" full>
        <ProgressBar
          percent={Number(data.investorsCount) / 10}
          label={`${data.investorsCount}/1000`}
          value="Investors"
        />
        <ProgressBar
          percent={openPositionsPercent}
          label={`${openPositions}/25`}
          value="Open trades"
        />
      </Flex>
      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Total P&L</Label>
      </Flex>

      <Flex full>
        <Flex full p="0 75px 0 0">
          <InfoRow label={baseData?.symbol} value={`${0}%`} />
        </Flex>
        <Flex full p="0 0 0 75px">
          <InfoRow label={"USD"} value={`${0}%`} />
        </Flex>
      </Flex>
      <Flex full>
        <Flex full p="0 75px 0 0">
          <InfoRow label={"ETH"} value={`${0}%`} />
        </Flex>
        <Flex full p="0 0 0 75px">
          <InfoRow label={"BTC"} value={`${0}%`} />
        </Flex>
      </Flex>

      <Flex p="40px 0 0 0" full jc="flex-start">
        <Icon src={chartIcon} />
        <Label>Average</Label>
      </Flex>

      <Flex full>
        <Flex full p="0 25px 0 0">
          <InfoRow label={"Trades per Day"} value={data.averageTrades} />
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
