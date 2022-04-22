import React, { useEffect, useState } from "react"
// import styled from "styled-components"

import { useWeb3React } from "@web3-react/core"
import { useConnectWalletContext } from "context/ConnectWalletContext"

import Wallet from "assets/menu/mobile/Wallet"
import Profile from "assets/menu/mobile/Profile"
import TopTraders from "assets/menu/mobile/TopTraders"
import Notifications from "assets/menu/mobile/Notifications"

import { MobileMenu, NavItem } from "./styled"
import { shortenAddress } from "utils"

export const TapBar = () => {
  const { account } = useWeb3React()
  const lastVisitedProfile = localStorage.getItem("last-visited-profile")

  const isBarHidden = !account ? "hidden" : "visible"

  return (
    <MobileMenu
      initial={isBarHidden}
      animate={isBarHidden}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
    >
      <NavItem path="/wallet" Icon={Wallet} text={shortenAddress(account, 3)} />
      <NavItem
        path={lastVisitedProfile || "/me/investor"}
        Icon={Profile}
        text="My profile"
      />
      <NavItem path="/" Icon={TopTraders} text="Traders" />
      <NavItem
        path="/notifications"
        Icon={Notifications}
        text="Notifications"
      />
    </MobileMenu>
  )
}
export default TapBar
