import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../index"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"

import { updateRates } from "../rates/actions"
import { setInterval } from "timers"

export function PriceRatesUpdater(): null {
  const dispatch = useDispatch<AppDispatch>()

  const { account } = useWeb3React()

  useEffect(() => {
    if (!account || !account.length) return

    const getUserData = async () => {
      try {
        const { data } = await axios.get<null, { data: { data: any } }>(
          `https://api.kattana.trade/rates`
        )
        dispatch(updateRates({ params: data }))
      } catch (err) {}
    }

    const interval = setInterval(getUserData, 1000 * 30)

    return () => {
      clearInterval(interval)
    }
  }, [account, dispatch])

  return null
}

export function useSelectPrices(): any | null | false {
  return useSelector<AppState, AppState["rates"]["prices"]>((state) => {
    return state.rates.prices
  })
}
