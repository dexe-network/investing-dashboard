import React, { useContext, useState } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

import DexeIcon from "assets/menu/DexeIcon"
import DexeInvestments from "assets/menu/DexeInvestments.svg"
import ProductsIcon from "assets/menu/ProductsIcon"
import PortfolioIcon from "assets/menu/PortfolioIcon.svg"
import ProfileIcon from "assets/menu/ProfileIcon.svg"
import TopMembersIcon from "assets/menu/TopMembersIcon.svg"
import PaymentsIcon from "assets/menu/PaymentsIcon.svg"

import InsuranceIcon from "assets/menu/InsuranceIcon.svg"
import AffiliateProgramIcon from "assets/menu/AffiliateProgramIcon.svg"
import VotingIcon from "assets/menu/VotingIcon.svg"

import SettingsIcon from "assets/menu/SettingsIcon.svg"
import SupportIcon from "assets/menu/SupportIcon.svg"
import NotificationsIcon from "assets/menu/NotificationsIcon.svg"
import ConnectIcon from "assets/menu/ConnectIcon"

import { To, External } from "theme"

const transitionType = {
  type: "spring",
  stiffness: 150,
  mass: 0.4,
  bounce: 0.1,
}

const MenuVariants = {
  visible: {
    width: "223px",
    padding: "30px 24px",
  },
  hidden: {
    width: "50px",
    padding: "30px 0px",
  },
}

const ContentVariants = {
  visible: {
    opacity: 1,
    x: 0,
    y: 2,
    display: "flex",
    width: "fit-content",
  },
  hidden: {
    opacity: 0,
    x: 20,
    y: 0,
    transitionEnd: {
      display: "none",
    },
    width: 0,
  },
}

const StyledMenu = styled(motion.nav)`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgb(47, 60, 58);
  background: linear-gradient(
    197deg,
    rgba(47, 60, 58, 1) -20%,
    rgba(45, 40, 67, 1) 110%
  );
  box-shadow: 6px 0px 15px rgba(0, 0, 0, 0.15);
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  cursor: pointer;
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50px;
`

const Icon = styled.img<{ scale?: number }>`
  transform: scale(${(props) => (props.scale ? props.scale : 0.6)});
`

const Content = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  font-size: 16px;

  color: ${(props) => props.theme.textPrimary};
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const defaultContext = {
  open: false,
}

const MenuContext: React.Context<{ open: boolean }> = React.createContext(
  defaultContext
)

const Text: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  const menu = useContext(MenuContext)

  return (
    <Content
      initial="hidden"
      variants={ContentVariants}
      animate={menu.open ? "visible" : "hidden"}
      transition={transitionType}
    >
      {children}
    </Content>
  )
}

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false)

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
        <Group>
          <External href="https://dexe.network">
            <MenuItem>
              <IconContainer>
                <DexeIcon />
              </IconContainer>
              <Text>
                <Icon scale={0.8} src={DexeInvestments} />
              </Text>
            </MenuItem>
          </External>
          <External href="https://dexe.network/ecosystem">
            <MenuItem>
              <IconContainer>
                <ProductsIcon />
              </IconContainer>
              <Text>Ecosystem</Text>
            </MenuItem>
          </External>
        </Group>
        <Group>
          <To to="/portfolio">
            <MenuItem>
              <IconContainer>
                <Icon src={PortfolioIcon} />
              </IconContainer>
              <Text>Portfolio</Text>
            </MenuItem>
          </To>
          <To to="/profile">
            <MenuItem>
              <IconContainer>
                <Icon src={ProfileIcon} />
              </IconContainer>
              <Text>Profile</Text>
            </MenuItem>
          </To>
          <To to="/top-members">
            <MenuItem>
              <IconContainer>
                <Icon src={TopMembersIcon} />
              </IconContainer>
              <Text>TopMembers</Text>
            </MenuItem>
          </To>
          <To to="/payments">
            <MenuItem>
              <IconContainer>
                <Icon src={PaymentsIcon} />
              </IconContainer>
              <Text>Payments</Text>
            </MenuItem>
          </To>
        </Group>
        <Group>
          <To to="/insurance">
            <MenuItem>
              <IconContainer>
                <Icon src={InsuranceIcon} />
              </IconContainer>
              <Text>Insurance</Text>
            </MenuItem>
          </To>
          <To to="/affiliate-program">
            <MenuItem>
              <IconContainer>
                <Icon src={AffiliateProgramIcon} />
              </IconContainer>
              <Text>AffiliateProgram</Text>
            </MenuItem>
          </To>
          <To to="/voting-in-dao">
            <MenuItem>
              <IconContainer>
                <Icon src={VotingIcon} />
              </IconContainer>
              <Text>Voting in DAO</Text>
            </MenuItem>
          </To>
        </Group>
        <Group>
          <To to="/settings">
            <MenuItem>
              <IconContainer>
                <Icon src={SettingsIcon} />
              </IconContainer>
              <Text>Settings</Text>
            </MenuItem>
          </To>
          <To to="/support">
            <MenuItem>
              <IconContainer>
                <Icon src={SupportIcon} />
              </IconContainer>
              <Text>Support</Text>
            </MenuItem>
          </To>
          <MenuItem>
            <IconContainer>
              <Icon src={NotificationsIcon} />
            </IconContainer>
            <Text>Notifications</Text>
          </MenuItem>

          <MenuItem>
            <IconContainer>
              <ConnectIcon />
            </IconContainer>
            <Text>Connect</Text>
          </MenuItem>
        </Group>
      </StyledMenu>
    </MenuContext.Provider>
  )
}

export default Menu
