import { useState } from "react"

import { ExternalLink, Flex, External } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useActiveWallet } from "hooks/useActiveWallet"
import { connectorsByName } from "constants/connectors"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import Modal from "components/Modal"
import Checkbox from "components/Checkbox"

import metamask from "assets/wallets/metamask.svg"
import bsc from "assets/wallets/bsc.svg"
import walletconnect from "assets/wallets/walletconnect.svg"

import close from "assets/icons/close.svg"

import { IconButton, device } from "theme"
import check from "assets/icons/check.svg"

import {
  Title,
  Header,
  Body,
  PrivacyText,
  ChooseWallet,
  LinkText,
  Wallets,
  Wallet,
  WalletIcon,
  WalletTitle,
  Checked,
} from "./styled"

export default function ConnectWallet({ isOpen, onRequestClose }) {
  const [termsAccepted, setAccepted] = useState(false)
  const { activate, connector } = useWeb3React()
  const active = useActiveWallet()

  const activateProvider = (name) => {
    const provider = connectorsByName[name]

    if (provider === connector) {
      return
    }

    if (
      provider instanceof WalletConnectConnector &&
      provider.walletConnectProvider?.wc?.uri
    ) {
      provider.walletConnectProvider = undefined
    }

    if (provider) {
      localStorage.setItem("dexe.network/investing/web3-auth-method", name)

      activate(provider, undefined, true)
        .then(onRequestClose)
        .catch((e) => {
          if (e) {
            console.log(e)
            activate(provider)
            onRequestClose()
          }
        })
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={onRequestClose} title="Connect your wallet">
      <Body>
        <PrivacyText>
          By connecting the wallet I accept
          <LinkText href="#"> Terms of Service </LinkText>and
          <LinkText href="#"> Privacy Policy </LinkText>
          DeXe Network
        </PrivacyText>

        <Wallets full>
          <Wallet onClick={() => activateProvider("walletconnect")}>
            <WalletIcon src={walletconnect} alt="walletconnect" />
            <WalletTitle>Wallet Connect</WalletTitle>
          </Wallet>
          <Wallet onClick={() => activateProvider("metamask")}>
            <WalletIcon src={metamask} alt="metamask" />
            <WalletTitle>Metamask</WalletTitle>
          </Wallet>
          <Wallet onClick={() => activateProvider("bsc")}>
            <WalletIcon src={bsc} alt="bsc" />
            <WalletTitle>Binance Smart Chain</WalletTitle>
          </Wallet>
        </Wallets>
      </Body>
    </Modal>
  )
}
