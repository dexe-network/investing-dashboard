import { useEffect, useState } from "react"
import axios from "axios"
import { ITokenBase } from "constants/interfaces"

const lists = {
  eth: "https://tokens.1inch.exchange/v1.0",
  bsc: "https://tokens.1inch.exchange/v1.1/chain-56",
}

function useTokensList(): [ITokenBase[], any] {
  const [list, set] = useState<[ITokenBase[], any]>([[], {}])

  useEffect(() => {
    axios.get(lists.bsc).then((response) => {
      if (response?.data) {
        const l = Object.keys(response.data).map((a) => response.data[a])
        set([l, response.data])
      }
    })
  }, [])

  return list
}

export default useTokensList
