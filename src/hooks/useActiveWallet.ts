import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { connectorsByName, injected } from "state/connectors"

export function useActiveWallet() {
  const { connector } = useWeb3React()
  const [active, setActive] = useState("")
  const { ethereum } = window

  useEffect(() => {
    const isMetaMask =
      connector === injected && !!(ethereum && ethereum.isMetaMask)
    const isWalletConnect = connector === connectorsByName.WalletConnect
    const isWalletLink = connector === connectorsByName.WalletLink
    const isLedger = connector === connectorsByName.Ledger
    const isTrezor = connector === connectorsByName.Trezor
    const isTorus = connector === connectorsByName.Torus

    if (isMetaMask) {
      setActive("MetaMask")
    } else if (isWalletConnect) {
      setActive("WalletConnect")
    } else if (isWalletLink) {
      setActive("WalletLink")
    } else if (isLedger) {
      setActive("Ledger")
    } else if (isTrezor) {
      setActive("Trezor")
    } else if (isTorus) {
      setActive("Torus")
    } else {
      setActive("")
    }
  }, [connector, ethereum])

  return active
}
