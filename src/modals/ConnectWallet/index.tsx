import { useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { connectorsByName } from "constants/connectors"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { RotateSpinner } from "react-spinners-kit"

import metamask from "assets/wallets/metamask.svg"
import bsc from "assets/wallets/bsc.svg"
import walletconnect from "assets/wallets/walletconnect.svg"
import closeIcon from "assets/icons/modal-close.svg"

import {
  Title,
  Overlay,
  Container,
  Head,
  Body,
  Close,
  PrivacyText,
  LinkText,
  Wallets,
  Wallet,
  WalletIcon,
  WalletTitle,
} from "./styled"
import { createPortal } from "react-dom"

const modalRoot = document.getElementById("modal")

export default function ConnectWallet({ isOpen, onRequestClose, onConnect }) {
  const [isActivating, setActivating] = useState("")
  const { activate, connector } = useWeb3React()

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

  if (!modalRoot) return null
  return createPortal(
    <>
      <Overlay
        onClick={onRequestClose}
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            opacity: 0.4,
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      />
      <Container
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            opacity: 1,
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      >
        <Head>
          <Title>Connect wallet</Title>
          <Close onClick={onRequestClose} src={closeIcon} />
        </Head>
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
            <Wallet onClick={() => activateProvider("injected")}>
              {isActivating === "injected" ? (
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
      </Container>
    </>,
    modalRoot
  )
}
