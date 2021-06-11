import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"

export const ETH = {
  url: "http://etherscan.io",
  name: "Etherscan",
  protocol: "ERC-20",
  currency: "ETH",
}

export const BNB = {
  url: "https://bscscan.com",
  name: "BscScan",
  protocol: "BEP-20",
  currency: "BNB",
}

const configs = {
  ETH,
  BNB,
}

export default function useNetworkConfig() {
  const { chainId } = useWeb3React()
  const [config, setConfig] = useState(configs.ETH)

  useEffect(() => {
    const isBSC = chainId === 56 || chainId === 97

    if (isBSC && config.currency !== "BNB") {
      setConfig(configs.BNB)
    }

    if (!isBSC && config.currency !== "ETH") {
      setConfig(configs.ETH)
    }
  }, [chainId, config.currency])

  return config
}
