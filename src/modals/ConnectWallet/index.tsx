import { useState } from "react"

import Modal from "styled-react-modal"
import { ExternalLink, Flex } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useActiveWallet } from "hooks/useActiveWallet"
import { connectorsByName } from "constants/connectors"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import Popover from "components/Popover"
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
  TermsAndPrivacy,
  ChooseWallet,
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
    <Popover
      contentHeight={450}
      isOpen={isOpen}
      toggle={onRequestClose}
      title="Connect your wallet"
    >
      <Body opacity={termsAccepted ? 1 : 0.5}>
        <Flex full jc="flex-start" ai="center">
          <Checkbox
            name="terms&privacy"
            checked={termsAccepted}
            onChange={setAccepted}
            label={
              <TermsAndPrivacy>
                Accept{" "}
                <ExternalLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="dexe.network"
                >
                  Terms of Service
                </ExternalLink>{" "}
                and{" "}
                <ExternalLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="dexe.network"
                >
                  Privacy Policy
                </ExternalLink>
              </TermsAndPrivacy>
            }
          />
        </Flex>

        <Wallets full>
          <Wallet
            onClick={() => activateProvider("walletconnect")}
            dir="column"
            full
            jc="space-around"
            ai="center"
          >
            <WalletIcon src={walletconnect} alt="walletconnect" />
            <WalletTitle>Wallet Connect</WalletTitle>
            {active === "walletconnect" && <Checked src={check} />}
          </Wallet>
          <Wallet
            onClick={() => activateProvider("metamask")}
            dir="column"
            full
            jc="space-around"
            ai="center"
          >
            <WalletIcon src={metamask} alt="metamask" />
            <WalletTitle>Metamask</WalletTitle>
            {active === "metamask" && <Checked src={check} />}
          </Wallet>
          <Wallet
            onClick={() => activateProvider("bsc")}
            dir="column"
            full
            jc="space-around"
            ai="center"
          >
            <WalletIcon src={bsc} alt="bsc" />
            <WalletTitle>Binance Chain</WalletTitle>
            {active === "bsc" && <Checked src={check} />}
          </Wallet>
        </Wallets>
      </Body>
    </Popover>
  )
}
