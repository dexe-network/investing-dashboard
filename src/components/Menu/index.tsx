import React, { useState } from "react"

import { useActiveWallet } from "hooks/useActiveWallet"
import { useWeb3React } from "@web3-react/core"

import PortfolioIcon from "assets/menu/PortfolioIcon.svg"
import ProfileIcon from "assets/menu/ProfileIcon.svg"
import TopMembersIcon from "assets/menu/TopMembersIcon.svg"

import InsuranceIcon from "assets/menu/InsuranceIcon.svg"
import AffiliateProgramIcon from "assets/menu/AffiliateProgramIcon.svg"
import VotingIcon from "assets/menu/VotingIcon.svg"

import SettingsIcon from "assets/menu/SettingsIcon.svg"
import SupportIcon from "assets/menu/SupportIcon.svg"
import ConnectIcon from "assets/menu/ConnectIcon"

import { connectorsIcons } from "constants/connectors"

import {
  Text,
  transitionType,
  MenuVariants,
  ActiveVariants,
  LogoSection,
  StyledMenu,
  MenuItem,
  ActiveBorder,
  IconContainer,
  Icon,
  Group,
  ProviderIcon,
} from "./styled"

import { To } from "theme"

import usePathname from "hooks/usePathname"

import { useConnectWalletContext } from "context/ConnectWalletContext"
import { shortenAddress } from "utils"

export interface IMenuContext {
  open: boolean
}

export const MenuContext = React.createContext<IMenuContext | null>(null)

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { toggleConnectWallet } = useConnectWalletContext()
  const active = useActiveWallet()
  const { account } = useWeb3React()

  const onHover = () => {
    if (!open) {
      setOpen(true)
    }
  }

  const onLeave = () => {
    if (open) {
      setOpen(false)
    }
  }

  return (
    <MenuContext.Provider
      value={{
        open,
      }}
    >
      <StyledMenu
        initial="hidden"
        variants={MenuVariants}
        animate={open ? "visible" : "hidden"}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        transition={transitionType}
      >
        <LogoSection />

        {/* MAIN NAVIGATION */}

        <Group>
          <To to="/portfolio">
            <MenuItem active={pathname === "/portfolio"}>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/portfolio" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={PortfolioIcon} />
              </IconContainer>
              <Text>Portfolio</Text>
            </MenuItem>
          </To>
          <To to="/me">
            <MenuItem active={pathname === "/me"}>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/me" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={ProfileIcon} />
              </IconContainer>
              <Text>Profile</Text>
            </MenuItem>
          </To>
          <To to="/">
            <MenuItem active={pathname === "/"}>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={TopMembersIcon} />
              </IconContainer>
              <Text>TopMembers</Text>
            </MenuItem>
          </To>
        </Group>

        {/* DOCUMENTS NAVIGATION */}

        <Group>
          <To to="/insurance">
            <MenuItem active={pathname === "/insurance"}>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/insurance" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={InsuranceIcon} />
              </IconContainer>
              <Text>Insurance</Text>
            </MenuItem>
          </To>
          <To to="/affiliate-program">
            <MenuItem active={pathname === "/affiliate-program"}>
              <ActiveBorder
                variants={ActiveVariants}
                animate={
                  pathname === "/affiliate-program" ? "visible" : "hidden"
                }
                initial="hidden"
              />
              <IconContainer>
                <Icon src={AffiliateProgramIcon} />
              </IconContainer>
              <Text>AffiliateProgram</Text>
            </MenuItem>
          </To>
          <To to="/voting-in-dao">
            <MenuItem active={pathname === "/voting-in-dao"}>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/voting-in-dao" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={VotingIcon} />
              </IconContainer>
              <Text>Voting in DAO</Text>
            </MenuItem>
          </To>
        </Group>

        {/* WIDGETS NAVIGATION */}

        <Group>
          <To to="/settings">
            <MenuItem>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/settings" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={SettingsIcon} />
              </IconContainer>
              <Text>Settings</Text>
            </MenuItem>
          </To>
          <To to="/support">
            <MenuItem>
              <ActiveBorder
                variants={ActiveVariants}
                animate={pathname === "/support" ? "visible" : "hidden"}
                initial="hidden"
              />
              <IconContainer>
                <Icon src={SupportIcon} />
              </IconContainer>
              <Text>Support</Text>
            </MenuItem>
          </To>

          {active.length ? (
            <MenuItem onClick={() => toggleConnectWallet(undefined)}>
              <IconContainer>
                <ProviderIcon src={connectorsIcons[active]} />
              </IconContainer>
              <Text>{shortenAddress(account)}</Text>
            </MenuItem>
          ) : (
            <MenuItem onClick={() => toggleConnectWallet(undefined)}>
              <IconContainer>
                <ConnectIcon />
              </IconContainer>
              <Text>Connect</Text>
            </MenuItem>
          )}
        </Group>
      </StyledMenu>
    </MenuContext.Provider>
  )
}

export default Menu
