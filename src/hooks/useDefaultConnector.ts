import { useEffect, useCallback, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { connectorsByName } from "constants/connectors"

const useDefaultConnector = (isTried: boolean) => {
  const { activate, account } = useWeb3React()
  const [isActivated, setActivated] = useState(false)

  // console.log(account)

  // const activateProvider = useCallback(() => {
  //   if (!activate) return
  //   if (!!account) return
  //   if (isActivated) return

  //   const { network } = connectorsByName

  //   activate(network, undefined, true)
  //     .then(() => console.log("default provider connected"))
  //     .catch((e) => {
  //       console.error("default provider not connected")
  //     })
  // }, [activate, account, isActivated])

  // // LISTEN TO WALLET ACTIVATOR
  // useEffect(() => {
  //   if (isTried === false) {
  //     activateProvider()
  //     setActivated(true)
  //   } else {
  //     // TODO: deactivate provider
  //   }
  // }, [isTried, activateProvider])

  return null
}

export default useDefaultConnector
