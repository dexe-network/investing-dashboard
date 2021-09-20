import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import back from "assets/icons/arrow-back.svg"
import filter from "assets/icons/filter.svg"
import calendar from "assets/icons/calendar.svg"
import { Tab } from "pages/Profile/styled"
import { BigNumber } from "@ethersproject/bignumber"
import TradesListItem, { TradesTotalItem } from "./List"
import { IPoolPosition } from "constants/interfaces"
import { AnimatePresence } from "framer-motion"
import { ease } from "theme"
import { format, addDays } from "date-fns"
import { useSwipeable } from "react-swipeable"

import {
  Container,
  Header,
  Tabs,
  IconButtons,
  List,
  ListHead,
  Label,
  SubItems,
  TradeButtons,
  TextButtonBase,
  BuyMore,
  ClosePosition,
  BackIcon,
} from "./styled"
import React from "react"

const Mul = BigNumber.from(10).pow(18)

const positions: IPoolPosition[] = [
  {
    id: "h32o9hq1",
    createdAt: "123",
    updatedAt: "123",
    tokenAddress: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce", // SHIB
    baseAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DEXE
    amount: BigNumber.from("47"), // 0.00000571 - amount of shib tokens purchased
    avgBasePrice: BigNumber.from("1050000000000000000"),
    avgStablePrice: BigNumber.from("12600000"), // 1000 USDT / 6 decimals
    pnlBase: BigNumber.from("1050000000000000000")
      .mul(BigNumber.from("47"))
      .div(100)
      .mul(-13),
    pnlStable: BigNumber.from("12600000")
      .mul(BigNumber.from("47"))
      .div(100)
      .mul(-13),
    pnl: -13,
    transactions: [
      {
        txId: "0xde82hee",
        path: [
          "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6",
          "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        ],
        status: "BUY",
        amount: BigNumber.from("30"),
        basePrice: BigNumber.from("3300000000000000000"),
        stablePrice: BigNumber.from("84600000"),
        timestamp: addDays(new Date(), -9),
      },
      {
        txId: "0xd23y2hee",
        path: [
          "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
          "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6",
        ],
        status: "SELL",
        amount: BigNumber.from("10"),
        basePrice: BigNumber.from("1050000000000000000"),
        stablePrice: BigNumber.from("43600000"),
        timestamp: addDays(new Date(), -5),
      },
      {
        txId: "0xwmu92y2hee",
        path: [
          "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6",
          "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        ],
        status: "BUY",
        amount: BigNumber.from("829"),
        basePrice: BigNumber.from("370000000000000000"),
        stablePrice: BigNumber.from("234600000"),
        timestamp: addDays(new Date(), -1),
      },
    ],
  },
  {
    id: "h32o9hd1",
    createdAt: "123",
    updatedAt: "123",
    tokenAddress: "0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd", // DODO
    baseAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    amount: BigNumber.from("450"),
    avgBasePrice: BigNumber.from("1830000000000000000"),
    avgStablePrice: BigNumber.from("1830000"), // 1000 USDT / 6 decimals
    pnlBase: BigNumber.from("1830000000000000000")
      .mul(BigNumber.from("450"))
      .div(100)
      .mul(93),
    pnlStable: BigNumber.from("1830000")
      .mul(BigNumber.from("450"))
      .div(100)
      .mul(93),
    pnl: 93,
    transactions: [],
  },
  {
    id: "i3ao9hd1",
    createdAt: "123",
    updatedAt: "123",
    tokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // DODO
    baseAddress: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    amount: BigNumber.from("500"),
    avgBasePrice: BigNumber.from("23330000000000000000"),
    avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
    pnlBase: BigNumber.from("23330000000000000000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnlStable: BigNumber.from("23330000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnl: 35,
    transactions: [],
  },
  {
    id: "iotua9hd1",
    createdAt: "123",
    updatedAt: "123",
    tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
    baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    amount: BigNumber.from("500"),
    avgBasePrice: BigNumber.from("23330000000000000000"),
    avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
    pnlBase: BigNumber.from("23330000000000000000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnlStable: BigNumber.from("23330000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnl: 35,
    transactions: [],
  },
  {
    id: "io34ua9hd1",
    createdAt: "123",
    updatedAt: "123",
    tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
    baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    amount: BigNumber.from("500"),
    avgBasePrice: BigNumber.from("23330000000000000000"),
    avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
    pnlBase: BigNumber.from("23330000000000000000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnlStable: BigNumber.from("23330000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnl: 35,
    transactions: [],
  },
  {
    id: "io345i2ud1",
    createdAt: "123",
    updatedAt: "123",
    tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
    baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    amount: BigNumber.from("500"),
    avgBasePrice: BigNumber.from("23330000000000000000"),
    avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
    pnlBase: BigNumber.from("23330000000000000000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnlStable: BigNumber.from("23330000")
      .mul(BigNumber.from("500"))
      .div(100)
      .mul(35),
    pnl: 35,
    transactions: [],
  },
  // {
  //   id: "io34542ki2ud1",
  //   createdAt: "123",
  //   updatedAt: "123",
  //   tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
  //   baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  //   amount: BigNumber.from("500"),
  //   avgBasePrice: BigNumber.from("23330000000000000000"),
  //   avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
  //   pnlBase: BigNumber.from("23330000000000000000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnlStable: BigNumber.from("23330000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnl: 35,
  //   transactions: [],
  // },
  // {
  //   id: "34542kissjo2ud1",
  //   createdAt: "123",
  //   updatedAt: "123",
  //   tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
  //   baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  //   amount: BigNumber.from("500"),
  //   avgBasePrice: BigNumber.from("23330000000000000000"),
  //   avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
  //   pnlBase: BigNumber.from("23330000000000000000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnlStable: BigNumber.from("23330000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnl: 35,
  //   transactions: [],
  // },
  // {
  //   id: "uojud1",
  //   createdAt: "123",
  //   updatedAt: "123",
  //   tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
  //   baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  //   amount: BigNumber.from("500"),
  //   avgBasePrice: BigNumber.from("23330000000000000000"),
  //   avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
  //   pnlBase: BigNumber.from("23330000000000000000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnlStable: BigNumber.from("23330000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnl: 35,
  //   transactions: [],
  // },
  // {
  //   id: "uojuej24d1",
  //   createdAt: "123",
  //   updatedAt: "123",
  //   tokenAddress: "0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6", // DODO
  //   baseAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  //   amount: BigNumber.from("500"),
  //   avgBasePrice: BigNumber.from("23330000000000000000"),
  //   avgStablePrice: BigNumber.from("23330000"), // 1000 USDT / 6 decimals
  //   pnlBase: BigNumber.from("23330000000000000000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnlStable: BigNumber.from("23330000")
  //     .mul(BigNumber.from("500"))
  //     .div(100)
  //     .mul(35),
  //   pnl: 35,
  //   transactions: [],
  // },
]

export default function Trades() {
  const { poolAddress } = useParams<{ poolAddress: string }>()
  const [openPosition, setOpen] = useState<null | string>(null)
  const history = useHistory()

  useEffect(() => {
    const getPools = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_STATS_API_URL}/trades/${poolAddress}`
      )

      console.log(data)
    }

    try {
      getPools()
    } catch (e) {
      console.log(e)
    }
  }, [poolAddress])

  const goBack = () => {
    try {
      history.goBack()
    } catch {
      alert("Something went wrong")
    }
  }

  const handlers = useSwipeable({
    onSwipedRight: () => goBack(),
  })

  return (
    <Container {...handlers}>
      <Header>
        <BackIcon onClick={goBack} src={back} alt="back" />
        <Tabs>
          <Tab active to={() => {}}>
            Open
          </Tab>
          <Tab active={false} to={() => {}}>
            Closed
          </Tab>
        </Tabs>
        <IconButtons>
          <img src={filter} alt="filter" />
          <img src={calendar} alt="calendar" />
        </IconButtons>
      </Header>
      <ListHead>
        <Label>Ticker/Volume</Label>
        <Label>Price</Label>
        <Label>Total</Label>
      </ListHead>
      <List>
        {positions.map((position: IPoolPosition) => (
          <React.Fragment key={position.id}>
            <TradesTotalItem
              active={openPosition === position.id}
              isAnySelected={openPosition === null}
              onClick={() =>
                setOpen(openPosition === position.id ? null : position.id)
              }
              data={position}
            />
            <AnimatePresence initial={false}>
              {openPosition === position.id && (
                <SubItems
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: {
                      height: "auto",
                      marginBottom: "15px",
                      transitionEnd: { opacity: 1 },
                      transition: {
                        duration: 0.1,
                        when: "beforeChildren",
                        staggerChildren: 0.1,
                      },
                    },
                    collapsed: {
                      height: 0,
                      marginBottom: "0px",
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        when: "afterChildren",
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                >
                  <TradeButtons
                    key="buttons"
                    variants={{
                      collapsed: {
                        opacity: 0,
                        transition: { delay: 0, ease, duration: 0.2 },
                      },
                      open: {
                        transitionEnd: { opacity: 1 },
                        transition: { delay: 0.5, ease, duration: 0.4 },
                      },
                    }}
                  >
                    <BuyMore>Buy more</BuyMore>
                    <ClosePosition>Close Position</ClosePosition>
                  </TradeButtons>
                  {position.transactions.map((transaction) => (
                    <TradesListItem key={transaction.txId} data={transaction} />
                  ))}
                </SubItems>
              )}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </List>
    </Container>
  )
}
