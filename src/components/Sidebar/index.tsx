import { useSideBarContext } from "context/SideBarContext"
import { createPortal } from "react-dom"
import {
  Container,
  Overlay,
  HeaderBar,
  LogoDexe,
  Close,
  MenuList,
  MenuItem,
  MenuIcon,
  MenuText,
  FooterBar,
  FooterLine,
  SwitchContainer,
  SwitchText,
  BuyContainer,
  Total,
  BuyText,
  MiniLogoDexe,
  ArrowSymbol,
} from "./styled"
import LogoImg from "assets/icons/dexe-network-logo.svg"
import CloseImg from "assets/icons/close-gray.svg"
import MiniLogo from "assets/sidebar/dexe-mini-logo.svg"
import Arrow from "assets/sidebar/arrow.svg"

import list from "./list"
import Switch from "components/Switch"

const sidebarRoot = document.getElementById("sidebar")

const overlayVariants = {
  visible: {
    display: "block",
  },
  hidden: {
    display: "none",
  },
}

const containerVariants = {
  visible: {
    x: -260,
  },
  hidden: {
    x: 0,
  },
}

const Sidebar: React.FC = () => {
  const { toggleSideBar, isSideBarOpen } = useSideBarContext()
  const isOpen = isSideBarOpen ? "visible" : "hidden"

  if (!sidebarRoot) return null
  return createPortal(
    <>
      <Overlay
        initial="hidden"
        animate={isOpen}
        variants={overlayVariants}
        onClick={toggleSideBar}
      />
      <Container
        initial="hidden"
        variants={containerVariants}
        animate={isOpen}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <HeaderBar>
          <LogoDexe>
            <img src={LogoImg} alt="logo" />
          </LogoDexe>
          <Close onClick={toggleSideBar}>
            <img src={CloseImg} alt="close" />
          </Close>
        </HeaderBar>
        <MenuList>
          {list.map(({ label, icon, path }) => (
            <MenuItem key={path}>
              <MenuIcon>{icon}</MenuIcon>
              <MenuText>{label}</MenuText>
            </MenuItem>
          ))}
        </MenuList>
        <FooterBar>
          <FooterLine></FooterLine>
          <SwitchContainer>
            <Switch isOn name="USD" onChange={() => {}} />
            <SwitchText>Show price in USD</SwitchText>
          </SwitchContainer>
          <FooterLine></FooterLine>
          <BuyContainer>
            <MiniLogoDexe>
              <img src={MiniLogo} alt="dexe-logo" />
            </MiniLogoDexe>
            <Total>$ 100</Total>
            <BuyText>Buy DEXE</BuyText>
            <ArrowSymbol>
              <img src={Arrow} alt="arrow" />
            </ArrowSymbol>
          </BuyContainer>
        </FooterBar>
      </Container>
    </>,
    sidebarRoot
  )
}

export default Sidebar
