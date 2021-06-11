import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"

import { BigNumber } from "@ethersproject/bignumber"
import { IPool } from "constants/interfaces"
import { addMembers } from "state/members/actions"
import { getRandomPnl } from "utils"

const pool: IPool = {
  firstName: "Daniel",
  lastName: "Srhec",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToKeNTAGsQxsIfqvAoiupyrX3px3NQP0miNw&usqp=CAU",

  address: "0x2F56af104beFfFA80Cf49c21c5fdF1eD297Dc28c",
  poolAddress: "",

  symbol: "DXOT",
  baseSymbol: "0x60b3bc37593853c04410c4f07fe4d6748245bf77",
  price: BigNumber.from((Math.random() * 100).toFixed(0)).toString(),
  priceUsd: Number((Math.random() * 100).toFixed(0)),

  copiers: Number((Math.random() * 100).toFixed(0)),
  rank: Number((Math.random() * 10).toFixed(1)),
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
    total: 112.12,
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
      0,
      0,
      0,
      0,
      0,
      0,
      0,
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

export function useMembers(): [IPool[], boolean, boolean] {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const init = useCallback(
    (v: IPool[]) => {
      dispatch(addMembers(v))
      setLoading(false)
      // setError(true)
    },
    [dispatch]
  )

  useEffect(() => {
    setTimeout(
      () =>
        init([
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
          pool,
        ]),
      3000
    )
  }, [])

  const members = useSelector<AppState, AppState["members"]["list"]>(
    (state) => {
      return state.members.list
    }
  )

  return [members, loading, error]
}
