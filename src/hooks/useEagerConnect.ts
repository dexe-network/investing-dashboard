import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"

import { Web3Provider } from "@ethersproject/providers"
import { injected, connectorsByName } from "constants/connectors"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

export function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    const activeProviderName = localStorage.getItem(
      "dexe.network/investing/web3-auth-method"
    )
    if (
      !!activeProviderName &&
      activeProviderName in connectorsByName &&
      activeProviderName === "metamask"
    ) {
      injected
        .isAuthorized()
        .then((isAuthorized) => {
          if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        })
        .catch(() => {})
    } else if (
      !!activeProviderName &&
      activeProviderName in connectorsByName &&
      activeProviderName === "walletconnect"
    ) {
      const provider = connectorsByName[activeProviderName]
      if (
        provider instanceof WalletConnectConnector &&
        provider.walletConnectProvider?.wc?.uri
      ) {
        provider.walletConnectProvider = undefined
      }
      activate(provider, undefined, true)
        .then(console.log)
        .catch((e) => {
          if (e) {
            console.log(e)
            activate(provider)
          }
        })
    } else if (!!activeProviderName && activeProviderName in connectorsByName) {
      const provider = connectorsByName[activeProviderName]
      activate(provider, undefined, true)
        .then(console.log)
        .catch((e) => {
          if (e) {
            console.log(e)
            activate(provider)
          }
        })
    }
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}
