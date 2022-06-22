import axios from "axios"
import { BigNumber } from "ethers"
import { useCallback, useEffect, useState } from "react"

const useGasTracker = () => {
  const [proposeGasPrice, setProposeGasPrice] = useState("0")
  const [usdPrice, setUsdPrice] = useState("0")

  const getGasPrice = useCallback(
    (gas: number) => {
      return (
        (gas * 1.1 * parseFloat(usdPrice) * parseFloat(proposeGasPrice)) /
        1000000000
      ).toFixed(2)
    },
    [proposeGasPrice, usdPrice]
  )

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      )
      if (response.data.message === "OK") {
        const { result } = response.data
        setProposeGasPrice(result.ProposeGasPrice)
        setUsdPrice(result.UsdPrice)
      }
    })()
  }, [])

  return getGasPrice
}

export default useGasTracker
