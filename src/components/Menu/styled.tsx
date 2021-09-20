import { useContext } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

import DexeIcon from "assets/menu/DexeIcon"
import DexeInvestments from "assets/menu/DexeInvestments"
import ProductsIcon from "assets/menu/ProductsIcon"

import { External, device } from "theme"

import { MenuContext } from "./index"

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

const ActiveVariants = {
  visible: {
    opacity: 1,
    x: 0,
    display: "flex",
  },
  hidden: {
    opacity: 0,
    x: -10,
    transitionEnd: {
      display: "none",
    },
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
  grid-area: menu;
  position: sticky;
  z-index: 20;
  top: 0;
  height: calc(var(--vh, 1vh) * 100);
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
  user-select: none;

  @media only screen and (${device.sm}) {
    display: none;
  }
`

const MenuItem = styled.div<{
  active?: boolean
  onClick?: (value?: boolean | undefined) => void
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;

  background: linear-gradient(
    90deg,
    rgba(127, 255, 212, ${(props) => (props.active ? 0.3 : 0)}) 0%,
    rgba(46, 50, 62, 0) 45%,
    rgba(46, 50, 62, ${(props) => (props.active ? 0.7 : 0)}) 100%
  );

  background-repeat: no-repeat;
  background-position: ${(props) =>
    props.active ? "center center" : "-300px center"};
`

const ActiveBorder = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  height: 40px;
  background: rgb(127, 255, 212);
  background: linear-gradient(
    180deg,
    rgba(127, 255, 212, 0.16) 0%,
    rgba(127, 255, 212, 1) 50%,
    rgba(127, 255, 212, 0.16430322128851538) 100%
  );
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

const Text: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  const menu = useContext(MenuContext)
  const isVisible = menu && menu.open

  return (
    <Content
      initial="hidden"
      variants={ContentVariants}
      animate={isVisible ? "visible" : "hidden"}
      transition={transitionType}
    >
      {children}
    </Content>
  )
}

const LogoSection = () => (
  <Group>
    <External href="https://dexe.network">
      <MenuItem>
        <IconContainer>
          <DexeIcon />
        </IconContainer>
        <Text>
          <DexeInvestments scale={0.8} />
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
)

const ProviderIcon = styled.img`
  width: 30px;
  height: 30px;
`

const MobileMenu = styled.div`
  display: none;

  @media only screen and (${device.sm}) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    user-select: none;
    grid-area: bottom;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 11px 20px;
    width: 100%;
    height: 62px;
    z-index: 5;
    background: rgb(41, 49, 52);
    background: linear-gradient(
      34deg,
      rgba(41, 49, 52, 1) 0%,
      rgba(53, 52, 75, 1) 100%
    );
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);
  }
`

const MobileItem = styled.div`
  width: 55px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const MobileIcon = styled.img`
  width: 21px;
  height: 21px;
`

const MobileLabel = styled.div`
  font-size: 9px;
  color: #ffffff;
  text-align: center;
  margin-top: 5px;
`

const NavItem = ({ children, src, onClick = () => {} }) => (
  <MobileItem onClick={onClick}>
    <MobileIcon src={src} alt="" />
    <MobileLabel>{children}</MobileLabel>
  </MobileItem>
)

export {
  ProviderIcon,
  LogoSection,
  Text,
  transitionType,
  MenuVariants,
  ActiveVariants,
  ContentVariants,
  StyledMenu,
  MenuItem,
  ActiveBorder,
  IconContainer,
  Icon,
  Content,
  Group,
  MobileMenu,
  NavItem,
}
