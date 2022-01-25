import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { injected, connectorsByName } from "constants/connectors"

export function useActiveWallet() {
  const { connector, library, account } = useWeb3React()
  const [active, setActive] = useState("")

  useEffect(() => {
    if (!connector) {
      return
    }

    if (library?.connection.url === "metamask") {
      setActive("metamask")
    }

    if (library?.provider?.bnbSign) {
      setActive("bsc")
    }

    if (connector === connectorsByName.walletconnect) {
      setActive("walletconnect")
    }
  }, [connector, account, library])

  return active
}
