import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import { GasPriceResponse } from "constants/interfaces_v2"
import { FC, useCallback, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "state"
import { updateGasData } from "./actions"

const GasPriceUpdater: FC = () => {
  const { chainId } = useWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  const fetchGasDataBSC = useCallback(async () => {
    const response = await axios.get<{
      message: string
      result: GasPriceResponse
    }>(
      `https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    )

    if (response.data.message === "OK") {
      return response.data.result
    }

    return null
  }, [])

  const trackerByChain = useMemo(() => {
    return {
      56: fetchGasDataBSC,
      97: fetchGasDataBSC,
    }
  }, [fetchGasDataBSC])

  const handleGasUpdate = useCallback(async () => {
    if (!chainId) return

    const result = await trackerByChain[chainId]()

    if (result) {
      dispatch(updateGasData({ chainId, response: result }))
    }
  }, [chainId, dispatch, trackerByChain])

  // update gas price every 1 minute
  useEffect(() => {
    handleGasUpdate().catch(console.error)
    const interval = setInterval(handleGasUpdate, 60 * 1000)

    return () => clearInterval(interval)
  }, [handleGasUpdate])

  return null
}

export default GasPriceUpdater
