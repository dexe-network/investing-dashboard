import React from "react"
import { useWeb3React } from "@web3-react/core"
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
  TransactionsPlaceholder,
  PathArrow,
  NameLabel,
  Time,
  InsuranceCard,
  InsuranceInfo,
  InsuranceTitle,
  InsuranceDescription,
} from "./styled"
import FloatingButton from "components/FloatingButton"
import Avatar from "components/Avatar"
import NavTabs from "components/NavTabs"
import Button from "components/Button"
import TokenIcon from "components/TokenIcon"
import more from "assets/icons/more-menu.svg"
import swap from "assets/icons/swap-path.svg"
import { shortenAddress } from "utils"
import { Redirect } from "react-router-dom"

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
  const { account, deactivate } = useWeb3React()

  const handleLogout = () => {
    deactivate()
    localStorage.removeItem("dexe.network/investing/web3-auth-method")
  }

  if (!account) return <Redirect to="/welcome" />

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
            <NameLabel>User Name</NameLabel>
          </UserInfo>
        </Info>
        <FloatingButtons>
          <FloatingButton icon={more} />
        </FloatingButtons>
      </Header>

      <Card>
        <TextGray>Current account</TextGray>
        <Address>{shortenAddress(account, 8)}</Address>
        <CardButtons>
          <TextButton color="#9AE2CB">Change</TextButton>
          <TextButton>Copy</TextButton>
          <TextButton onClick={handleLogout}>Disconnect</TextButton>
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
      {!transactions.length ? (
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
      ) : (
        <TransactionsPlaceholder>
          Your transactions will appear here....
        </TransactionsPlaceholder>
      )}
      <InsuranceCard>
        <InsuranceInfo>
          <InsuranceTitle>Funds Insurance</InsuranceTitle>
          <InsuranceDescription>
            Minimize your investment risks <br /> with DeXe Insurance
          </InsuranceDescription>
        </InsuranceInfo>
        <Button>Open</Button>
      </InsuranceCard>
    </Container>
  )
}
