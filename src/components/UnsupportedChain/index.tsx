/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useCallback } from "react"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import IconButton from "components/IconButton"
import { BigNumber } from "ethers"

import { connectorsByName, RPC_URLS } from "constants/connectors"

import warn from "assets/icons/warning.svg"

import { Container, TextContainer, Button } from "./styled"

const UnsupportedChain: React.FC = () => {
  const { error, library } = useWeb3React()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  const changeNetwork = useCallback(async () => {
    const activeProviderName = localStorage.getItem(
      "dexe.network/investing/web3-auth-method"
    )
    if (!activeProviderName || !(activeProviderName in connectorsByName)) return

    const provider = await connectorsByName[activeProviderName].getProvider()

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BigNumber.from(97).toHexString() }],
      })
    } catch (e) {
      // This error code indicates that the chain has not been added to MetaMask.
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: BigNumber.from(97).toHexString(),
              chainName: "Binance smart chain",
              rpcUrls: [RPC_URLS["97"]],
              nativeCurrency: {
                name: "Binance Coin",
                symbol: "BNB",
                decimals: 18,
              },
            },
          ],
        })
      } catch (addError) {
        // handle "add" error
        console.log(addError)
      }
      // handle other "switch" errors
    }
  }, [])

  useEffect(() => {
    if (!isUnsupportedChainIdError) return

    changeNetwork().catch(console.error)
  }, [library, isUnsupportedChainIdError, changeNetwork])

  return isUnsupportedChainIdError ? (
    <Container>
      <IconButton media={warn} />
      <TextContainer>Please select BSC network.</TextContainer>
      <Button onClick={changeNetwork}>Change network to BSC</Button>
    </Container>
  ) : null
}

export default UnsupportedChain
