import { InjectedConnector } from "@web3-react/injected-connector"
import { NetworkConnector } from "@web3-react/network-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { BscConnector } from "@binance-chain/bsc-connector"
import { ArkaneConnect } from "@arkane-network/arkane-connect"

import metamaskIcon from "assets/wallets/metamask.svg"
import walletconnectIcon from "assets/wallets/walletconnect.svg"
import bscIcon from "assets/wallets/bsc.svg"
import arkaneIcon from "assets/wallets/arkane.svg"

const LOCAL_NETWORK_URL = "http://localhost:8545"
const BSC_NETWORK_URL = "https://bsc-dataseed.binance.org/"

const POLLING_INTERVAL = 12000
const RPC_URLS = {
  56: BSC_NETWORK_URL,
  97: BSC_NETWORK_URL,
  1337: LOCAL_NETWORK_URL,
}

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97, 1337],
})

export const network = new NetworkConnector({
  urls: {
    1337: RPC_URLS[1337],
    56: RPC_URLS[56],
    97: RPC_URLS[97],
  },
  defaultChainId: 56,
})

export const walletconnect = new WalletConnectConnector({
  infuraId: process.env.REACT_APP_INFURA_ID,
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const bsc = new BscConnector({
  supportedChainIds: [56, 97, 1337],
})

export const arkane = new ArkaneConnect("InvestingDexe")

export const connectorsByName = {
  metamask: injected,
  walletconnect,
  bsc,
  arkane,
}

export const connectorsIcons = {
  metamask: metamaskIcon,
  walletconnect: walletconnectIcon,
  bsc: bscIcon,
  arkane: arkaneIcon,
}
