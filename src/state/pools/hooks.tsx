import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"

import { setFilter } from "state/pools/actions"

import { BigNumber } from "@ethersproject/bignumber"
import { IPool } from "constants/interfaces"
import { addPools } from "state/pools/actions"
import { getRandomPnl, shortenAddress } from "utils"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"

import defaultAvatar from "assets/icons/default-avatar.svg"

const responseToState = (data) => {
  return {
    firstName: shortenAddress(data.creatorAdr, 4),
    lastName: "",
    avatar: defaultAvatar,

    ownerAddress: data.creatorAdr,
    poolAddress: data.poolAdr,
    baseAddress: data.basicTokenAdr,

    symbol: data.symbol,
    price: BigNumber.from((Math.random() * 100).toFixed(0)).toString(),
    priceUsd: Number((Math.random() * 100).toFixed(0)),

    copiers: 0,
    rank: 0,
    commision: Number((Math.random() * 100).toFixed(0)),
    personalFunds: BigNumber.from(0).toString(),
    personalFundsPercent: Number((Math.random() * 100).toFixed(0)),
    invested: BigNumber.from(0).toString(),
    profitFactor: Number((Math.random() * 100).toFixed(1)),
    trades: BigNumber.from(0).toString(),
    maxLoss: -Number((Math.random() * 100).toFixed(2)),

    avg: {
      dailyLpProfit: Number((Math.random() * 10).toFixed(0)),
      orderSize: Number((Math.random() * 10).toFixed(0)),
      timePosition: (Math.random() * 10).toFixed(2),
      tradesPerDay: Number((Math.random() * 100).toFixed(0)),
    },
    pnl: {
      total: 0,
      lpBasic: BigNumber.from(0).toString(),
      lpBasicPercent: 100,
      lpUsd: BigNumber.from(3700).toString(),
      lpUsdPercent: 102,
      monthly: [
        0,
        0,
        0,
        0,
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
        Number(getRandomPnl().toFixed(2)),
      ],
      detailed: [
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: -Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
        {
          timestamp: new Date().toISOString(),
          lpBasic: BigNumber.from(0).toString(),
          lpBasicPercent: Number(getRandomPnl().toFixed(2)),
          lpUsd: BigNumber.from(3700).toString(),
          lpUsdPercent: 102,
        },
      ],
    },
    sortino: {
      base: 3.2,
      btc: 7.5,
    },
    supply: {
      circulating: BigNumber.from(0).toString(),
      total: BigNumber.from(0).toString(),
    },
  }
}

export function usePools(): [IPool[], boolean, boolean] {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { account } = useWeb3React()

  const init = useCallback(
    (v: IPool[]) => {
      dispatch(addPools(v))
      setLoading(false)
      // setError(true)
    },
    [dispatch]
  )

  useEffect(() => {
    const getPools = async () => {
      const {
        data: { data },
      } = await axios.get(`${process.env.REACT_APP_STATS_API_URL}/pools/`)

      const pools = data.map(responseToState)
      setTimeout(() => init(pools), 1000)
    }
    getPools()
  }, [])

  useEffect(() => {
    if (!account) return

    const getPoolsByAddress = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_STATS_API_URL}/pools/${account}`
      )

      // console.log(data)
    }
    getPoolsByAddress()

    const getWithdrawals = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_STATS_API_URL}/pool-transfers/withdrawals/${account}`
      )

      // console.log(data)
    }
    getWithdrawals()

    const getDeposits = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_STATS_API_URL}/pool-transfers/deposits/${account}`
      )

      // console.log(data)
    }
    getDeposits()
  }, [account])

  const pools = useSelector<AppState, AppState["pools"]["list"]>((state) => {
    return state.pools.list
  })

  return [pools, loading, error]
}

export function usePoolsFilters(): [
  AppState["pools"]["filters"],
  (name: string, value: string) => void
] {
  const filters = useSelector((state: AppState) => state.pools.filters)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  return [filters, handleChange]
}

export function useSelectPoolByAddress(address: string): IPool | null {
  const pools = useSelector<AppState, AppState["pools"]["list"]>((state) => {
    return state.pools.list
  })

  const pool = pools.filter((pool) => pool.poolAddress === address)

  if (pool.length) {
    return pool[0]
  }

  return null
}

export function useSelectPools(): IPool[] {
  const pools = useSelector<AppState, AppState["pools"]["list"]>((state) => {
    return state.pools.list
  })

  return pools
}

export function usePoolData(poolAddress: string): any {
  const [data, setData] = useState<null | any>(null)
  useEffect(() => {
    if (typeof poolAddress !== "string") return

    const getPoolData = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_STATS_API_URL}/trader/${poolAddress}/info`
      )
      console.log(data)
      setData(data)
    }

    if (poolAddress.length === 42) {
      getPoolData()
    }
  }, [poolAddress])

  return data
}
