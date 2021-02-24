import { InjectedConnector } from "@web3-react/injected-connector"
import { NetworkConnector } from "@web3-react/network-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
import { TrezorConnector } from "@web3-react/trezor-connector"
import { TorusConnector } from "@web3-react/torus-connector"
import { LedgerConnector } from "@web3-react/ledger-connector"

import MetaMask from "assets/wallets/metamask.svg"
import WalletConnect from "assets/wallets/walletconnect.svg"
import WalletLink from "assets/wallets/wallet-link.svg"
import Ledger from "assets/wallets/ledger.svg"
import Trezor from "assets/wallets/trezor.png"
import Torus from "assets/wallets/torus.png"

const NETWORK_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
const LOCAL_NETWORK_URL = "http://localhost:8545"

const POLLING_INTERVAL = 12000
const RPC_URLS = {
  1: NETWORK_URL,
  1337: LOCAL_NETWORK_URL,
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
})

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 1337: RPC_URLS[1337] },
  defaultChainId: 1,
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: "INVESTING DEXE",
})

export const ledger = new LedgerConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
})

export const metamask = "MetaMask"

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "http://localhost:1234",
})

export const torus = new TorusConnector({ chainId: 1 })

const ConnectorNames = {
  MetaMask: "MetaMask",
  WalletConnect: "WalletConnect",
  WalletLink: "WalletLink",
  Ledger: "Ledger",
  Trezor: "Trezor",
  Torus: "Torus",
}

export const walletIcons = {
  MetaMask,
  WalletConnect,
  WalletLink,
  Ledger,
  Trezor,
  Torus,
}

export const connectorsByName = {
  [ConnectorNames.MetaMask]: metamask,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  [ConnectorNames.Ledger]: ledger,
  [ConnectorNames.Trezor]: trezor,
  [ConnectorNames.Torus]: torus,
}
