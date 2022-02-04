import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import plus from "assets/icons/create-fund.svg"
import question from "assets/icons/question-action.svg"
import Popover from "components/Popover"
import { OwnedPools } from "constants/interfaces_v2"
import { useSelector } from "react-redux"
import { AppState } from "state"

import {
  Container,
  Header,
  List,
  PrimaryLabel,
  SecondaryLabel,
  Token,
  EmptyText,
} from "./styled"
import {
  selectBasicPoolsBatch,
  selectInvestPoolsBatch,
} from "state/pools/selectors"
import { formatNumber } from "utils"
import { ethers } from "ethers"

interface Props {
  isOpen: boolean
  toggle: () => void
  pools: OwnedPools
}

const PoolsSelect: React.FC<Props> = ({ isOpen, toggle, pools }) => {
  const { account } = useWeb3React()
  const basicPools = useSelector((state: AppState) =>
    selectBasicPoolsBatch(state, pools.basic)
  )
  const investPools = useSelector((state: AppState) =>
    selectInvestPoolsBatch(state, pools.invest)
  )
  return (
    <Popover
      isOpen={isOpen}
      toggle={toggle}
      title="All my funds"
      contentHeight={800}
    >
      <Container>
        <Header>
          <PrimaryLabel>My whitelist funds</PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
          <SecondaryLabel>Info</SecondaryLabel>
        </Header>
        <List>
          {basicPools.map((pool) => (
            <Token
              baseAddress={pool.parameters.baseToken}
              poolType="basic"
              name={pool.name}
              symbol={pool.ticker}
              pnl={`${pool.lpPnl}%`}
              address={pool.address}
              key={pool.address}
              tvl={`$${formatNumber(
                ethers.utils
                  .formatUnits(pool.leverageInfo.totalPoolUSD, 18)
                  .toString(),
                2
              )}`}
            />
          ))}
        </List>
        <Header>
          <PrimaryLabel>My investment funds</PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
          <SecondaryLabel>Info</SecondaryLabel>
        </Header>
        <List>
          {investPools.map((pool) => (
            <Token
              baseAddress={pool.parameters.baseToken}
              poolType="invest"
              name={pool.name}
              symbol={pool.ticker}
              pnl={`${pool.lpPnl}%`}
              address={pool.address}
              key={pool.address}
              tvl={`$${formatNumber(
                ethers.utils
                  .formatUnits(pool.leverageInfo.totalPoolUSD, 18)
                  .toString(),
                2
              )}`}
            />
          ))}
          <EmptyText>
            You do not have open risk funds yet
            <Link to="/new-fund">
              <img src={plus} />
            </Link>
          </EmptyText>
        </List>

        <Header>
          <PrimaryLabel>Management funds</PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
          <SecondaryLabel>Info</SecondaryLabel>
        </Header>
        <List>
          <EmptyText>
            You do not have open risk funds yet
            <img src={question} />
          </EmptyText>
        </List>
      </Container>
    </Popover>
  )
}

export default PoolsSelect
