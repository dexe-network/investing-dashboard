import { FC, useState, useEffect, useRef } from "react"
import { Flex } from "theme"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import Popover from "components/Popover"

import { IPoolQuery } from "constants/interfaces_v2"

import AddFund from "assets/icons/AddFund"
import dexe from "assets/icons/dexe-dark.svg"

import { getLastInArray, getPNL, getPriceLP, getUSDPrice } from "utils/formulas"

import {
  Container,
  Header,
  List,
  PrimaryLabel,
  SecondaryLabel,
  Token,
  EmptyText,
  PlaceholderIcon,
} from "./styled"
import { useNavigate } from "react-router-dom"

interface Props {
  isOpen: boolean
  toggle: () => void
  pools: IPoolQuery[]
}

const OwnedPoolsList: FC<Props> = ({ isOpen, toggle, pools }) => {
  const [isDragAlloved, setDragAllowed] = useState(true)
  const navigate = useNavigate()
  const scrollRef = useRef<any>(null)

  const basicPools = pools.filter(({ type }) => type === "BASIC_POOL")
  const investPools = pools.filter(({ type }) => type === "INVEST_POOL")

  useEffect(() => {
    if (!scrollRef.current || !isOpen) return () => clearAllBodyScrollLocks()
    disableBodyScroll(scrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [scrollRef, isOpen])

  const createFund = () => {
    navigate("/create-fund")
  }

  const basicPoolsList = basicPools.map((pool) => {
    const priceLP = getPriceLP(pool.priceHistory)
    const pnl = getPNL(priceLP)
    const lastHistoryPoint = getLastInArray(pool.priceHistory)

    return (
      <Token
        onClick={toggle}
        descriptionURL={pool.descriptionURL}
        baseAddress={pool.baseToken}
        poolType="BASIC_POOL"
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
        onClick={toggle}
        descriptionURL={pool.descriptionURL}
        baseAddress={pool.baseToken}
        poolType="INVEST_POOL"
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
      title={
        <Flex ai="center">
          All my funds <AddFund onClick={createFund} />
        </Flex>
      }
      contentHeight={window.innerHeight - 100}
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
          <PrimaryLabel>My whitelist funds</PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
        </Header>
        <List>
          {!basicPools.length ? (
            <EmptyText>
              <PlaceholderIcon src={dexe} />
              You do not have open basic funds yet
            </EmptyText>
          ) : (
            basicPoolsList
          )}
        </List>
        <Header>
          <PrimaryLabel>My investment funds</PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
        </Header>
        <List>
          {!investPools.length ? (
            <EmptyText>
              <PlaceholderIcon src={dexe} />
              You do not have open investment funds yet
            </EmptyText>
          ) : (
            investPoolsList
          )}
        </List>

        <Header>
          <PrimaryLabel>Management funds</PrimaryLabel>
          <SecondaryLabel>TVL</SecondaryLabel>
          <SecondaryLabel>P&L</SecondaryLabel>
        </Header>
        <List>
          <EmptyText>
            <PlaceholderIcon src={dexe} />
            You do not have open risk funds yet
          </EmptyText>
        </List>
      </Container>
    </Popover>
  )
}

export default OwnedPoolsList
