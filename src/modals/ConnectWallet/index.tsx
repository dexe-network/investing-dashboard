import { useState } from "react"

import { ExternalLink, Flex, External } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useActiveWallet } from "hooks/useActiveWallet"
import { connectorsByName } from "constants/connectors"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import Modal from "components/Modal"
import Checkbox from "components/Checkbox"
import { RotateSpinner } from "react-spinners-kit"

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

export default function ConnectWallet({ isOpen, onRequestClose, onConnect }) {
  const [isActivating, setActivating] = useState("")
  const { activate, connector } = useWeb3React()
  const active = useActiveWallet()

  const activateProvider = (name) => {
    setActivating(name)
    const provider = connectorsByName[name]

    if (provider === connector) {
      setActivating("")
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

      setTimeout(() => {
        activate(provider, undefined, true)
          .then(() => {
            setActivating("")
            onRequestClose()
            onConnect()
          })
          .catch((e) => {
            if (e) {
              console.log(e)
              setTimeout(() => {
                activate(provider)
                setActivating("")
                onRequestClose()
                onConnect()
              }, 500)
            }
          })
      }, 500)
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
            {isActivating === "walletconnect" ? (
              <RotateSpinner size={33} loading />
            ) : (
              <WalletIcon src={walletconnect} alt="walletconnect" />
            )}
            <WalletTitle>Wallet Connect</WalletTitle>
          </Wallet>
          <Wallet onClick={() => activateProvider("metamask")}>
            {isActivating === "metamask" ? (
              <RotateSpinner size={33} loading />
            ) : (
              <WalletIcon src={metamask} alt="metamask" />
            )}
            <WalletTitle>Metamask</WalletTitle>
          </Wallet>
          <Wallet onClick={() => activateProvider("bsc")}>
            {isActivating === "bsc" ? (
              <RotateSpinner size={33} loading />
            ) : (
              <WalletIcon src={bsc} alt="bsc" />
            )}
            <WalletTitle>Binance Smart Chain</WalletTitle>
          </Wallet>
        </Wallets>
      </Body>
    </Modal>
  )
}
