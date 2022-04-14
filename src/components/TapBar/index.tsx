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
  const [isFullScreen, setFullScreen] = useState<null | boolean>(null)
  const { account } = useWeb3React()
  const lastVisitedProfile = localStorage.getItem("last-visited-profile")

  const isBarHidden = !account ? "hidden" : "normal"

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setFullScreen(true)
    } else {
      setFullScreen(false)
    }
  }, [])

  return (
    <MobileMenu
      initial={isBarHidden}
      animate={isFullScreen ? "fullscreen" : isBarHidden}
      variants={{
        fullscreen: {
          height: "80px",
          padding: "15px 14px 25px 14px",
          opacity: 1,
        },
        normal: { height: "59px", padding: "15px 14px 12px 14px", opacity: 1 },
        hidden: { height: "0", padding: "15px 14px 12px 14px", opacity: 0 },
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
