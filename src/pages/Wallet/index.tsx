import React from "react"
import {
  Container,
  Header,
  Info,
  FloatingButtons,
  TextGray,
  Name,
  UserInfo,
  AvatarWrapper,
  Card,
  Address,
  CardButtons,
  TextButton,
  Heading,
  Transaction,
  TransactionsList,
  Sticky,
  TransactionType,
  TransactionDetails,
  TransactionHash,
  TransactionText,
  TransactionsGroup,
  PathArrow,
  Time,
} from "./styled"
import FloatingButton from "components/FloatingButton"
import Avatar from "components/Avatar"
import NavTabs from "components/NavTabs"
import TokenIcon from "components/TokenIcon"
import pencil from "assets/icons/pencil.svg"
import settings from "assets/icons/settings.svg"
import swap from "assets/icons/swap-path.svg"
import { shortenAddress } from "utils"

const transactions = [
  {
    date: "Decemeber 21",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 20",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 19",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 21",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 20",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 19",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 21",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 20",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
  {
    date: "Decemeber 19",
    transactions: [
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
      {
        type: "Swap",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        timestamp: "11:09 AM",
        amountIn: "349.555 XXX",
        amountOut: "349.555 XXX",
      },
    ],
  },
]

export default function Wallet() {
  return (
    <Container
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <Header>
        <Info>
          <AvatarWrapper>
            <Avatar size={50} />
          </AvatarWrapper>
          <UserInfo>
            <TextGray>Welcome!</TextGray>
            <Name value="Ivrin Smith" disabled />
          </UserInfo>
        </Info>
        <FloatingButtons>
          <FloatingButton icon={pencil} />
          <FloatingButton icon={settings} />
        </FloatingButtons>
      </Header>

      <Card>
        <TextGray>Current account</TextGray>
        <Address>0xc02aaa3...2</Address>
        <CardButtons>
          <TextButton color="#9AE2CB">Change</TextButton>
          <TextButton>Copy</TextButton>
          <TextButton>Disconnect</TextButton>
        </CardButtons>
      </Card>

      <Heading>Transactions History</Heading>

      <NavTabs
        tabs={[
          { name: "All" },
          { name: "Swaps" },
          { name: "Pool" },
          { name: "Governance" },
          { name: "Rewards" },
        ]}
      />
      <TransactionsList>
        {transactions.map(({ date, transactions }) => (
          <React.Fragment key={date}>
            <Sticky>{date}</Sticky>
            <TransactionsGroup>
              {transactions.map(
                ({ type, address, timestamp, amountIn, amountOut }) => (
                  <Transaction key={timestamp}>
                    <TransactionType>{type}</TransactionType>
                    <TransactionDetails>
                      <TransactionHash>
                        {shortenAddress(address)}
                      </TransactionHash>
                      <TransactionText>
                        <TokenIcon size={18} />
                        {amountIn}
                      </TransactionText>
                      <PathArrow src={swap} />
                      <TransactionText>
                        <TokenIcon size={18} />
                        {amountOut}
                      </TransactionText>
                      <Time>{timestamp}</Time>
                    </TransactionDetails>
                  </Transaction>
                )
              )}
            </TransactionsGroup>
          </React.Fragment>
        ))}
      </TransactionsList>
    </Container>
  )
}
