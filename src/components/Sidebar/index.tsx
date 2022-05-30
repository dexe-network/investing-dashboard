import { useEffect, useState } from "react"
import { useSideBarContext } from "context/SideBarContext"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { BigNumber, ethers } from "ethers"

import { PriceFeed } from "abi"
import {
  selectPriceFeedAddress,
  selectDexeAddress,
} from "state/contracts/selectors"
import useContract from "hooks/useContract"
import { normalizeBigNumber } from "utils"

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

  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const dexeAddress = useSelector(selectDexeAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [markPriceUSD, setMarkPriceUSD] = useState(BigNumber.from(0))

  useEffect(() => {
    if (!dexeAddress || !priceFeed) return
    ;(async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      const priceUSD = await priceFeed
        ?.getNormalizedPriceOutUSD(dexeAddress, amount.toHexString())
        .catch(console.error)

      setMarkPriceUSD(priceUSD?.amountOut.toString())
    })()
  }, [dexeAddress, priceFeed])

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
          {list.map(({ label, icon, path }, index) => (
            <MenuItem key={path + index}>
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
            <Total>$ {normalizeBigNumber(markPriceUSD, 18, 2)}</Total>
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
