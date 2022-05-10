import { useWeb3React } from "@web3-react/core"

import Wallet from "assets/menu/mobile/Wallet"
import Profile from "assets/menu/mobile/Profile"
import TopTraders from "assets/menu/mobile/TopTraders"
import Insurance from "assets/menu/mobile/Insurance"

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
      <NavItem path="/insurance/voting" Icon={Insurance} text="Insurance" />
    </MobileMenu>
  )
}
export default TapBar
