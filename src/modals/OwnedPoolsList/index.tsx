import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import plus from "assets/icons/create-fund.svg"
import question from "assets/icons/question-action.svg"
import Popover from "components/Popover"
import { OwnedPools } from "constants/interfaces_v2"
import { useSelector } from "react-redux"
import { AppState } from "state"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"
import { getLastInArray, getPNL, getPriceLP, getUSDPrice } from "utils/formulas"

import {
  Container,
  Header,
  List,
  PrimaryLabel,
  SecondaryLabel,
  Token,
  EmptyText,
  PlusIcon,
} from "./styled"
import {
  selectBasicPoolsBatch,
  selectInvestPoolsBatch,
} from "state/pools/selectors"

interface Props {
  isOpen: boolean
  toggle: () => void
  pools: OwnedPools
}

const OwnedPoolsList: React.FC<Props> = ({ isOpen, toggle, pools }) => {
  const [isDragAlloved, setDragAllowed] = useState(true)
  const scrollRef = React.useRef<any>(null)
  const { account } = useWeb3React()

  const basicPools = useSelector((state: AppState) =>
    selectBasicPoolsBatch(state, pools.basic)
  )
  const investPools = useSelector((state: AppState) =>
    selectInvestPoolsBatch(state, pools.invest)
  )

  useEffect(() => {
    if (!scrollRef.current || !isOpen) return () => clearAllBodyScrollLocks()
    disableBodyScroll(scrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [scrollRef, isOpen])

  const basicPoolsList = basicPools.map((pool) => {
    const priceLP = getPriceLP(pool.priceHistory)
    const pnl = getPNL(priceLP)
    const lastHistoryPoint = getLastInArray(pool.priceHistory)

    return (
      <Token
        baseAddress={pool.baseToken}
        poolType="basic"
        name={pool.name}
        symbol={pool.ticker}
        pnl={`${pnl}%`}
        address={pool.id}
        key={pool.id}
        tvl={`$${getUSDPrice(lastHistoryPoint ? lastHistoryPoint.usdTVL : 0)}`}
      />
    )
  })

  const investPoolsList = investPools.map((pool) => {
    const priceLP = getPriceLP(pool.priceHistory)
    const pnl = getPNL(priceLP)
    const lastHistoryPoint = getLastInArray(pool.priceHistory)

    return (
      <Token
        baseAddress={pool.baseToken}
        poolType="invest"
        name={pool.name}
        symbol={pool.ticker}
        pnl={`${pnl}%`}
        address={pool.id}
        key={pool.id}
        tvl={`$${getUSDPrice(lastHistoryPoint ? lastHistoryPoint.usdTVL : 0)}`}
      />
    )
  })

  return (
    <Popover
      noDrag={!isDragAlloved}
      isOpen={isOpen}
      toggle={toggle}
      title="All my funds"
      contentHeight={800}
    >
      <Container
        ref={scrollRef}
        onTouchMove={(event) => {
          event.stopPropagation()
          setDragAllowed(false)
        }}
        onTouchEndCapture={() => {
          setDragAllowed(true)
        }}
      >
        <Header>
          <PrimaryLabel>
            My whitelist funds
            {!!basicPools.length && (
              <Link to="/new-fund">
                <PlusIcon src={plus} />
              </Link>
            )}
          </PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
          <SecondaryLabel>Info</SecondaryLabel>
        </Header>
        <List>
          {!basicPools.length ? (
            <EmptyText>
              You do not have open basic funds yet
              <Link to="/new-fund">
                <PlusIcon src={plus} />
              </Link>
            </EmptyText>
          ) : (
            basicPoolsList
          )}
        </List>
        <Header>
          <PrimaryLabel>
            My investment funds
            {!!investPools.length && (
              <Link to="/new-fund">
                <PlusIcon src={plus} />
              </Link>
            )}
          </PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
          <SecondaryLabel>Info</SecondaryLabel>
        </Header>
        <List>
          {!investPools.length ? (
            <EmptyText>
              You do not have open investment funds yet
              <Link to="/new-fund">
                <PlusIcon src={plus} />
              </Link>
            </EmptyText>
          ) : (
            investPoolsList
          )}
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

export default OwnedPoolsList
