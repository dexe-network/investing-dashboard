import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex } from "theme"

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  width: 260px;
  background: #000;
  top: 0;
  bottom: 0;
  right: -260px;
  z-index: 100;
  background: linear-gradient(64.44deg, #0e121b 32.35%, #0d121b 100%);
  box-shadow: -6px 4px 8px rgba(0, 0, 0, 0.15);
`

export const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(13, 18, 28, 0.3);
  backdrop-filter: blur(2px);
`

export const HeaderBar = styled.div`
  width: fill-available;
  display: flex;
  padding: 10px 18px 10px 24px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`

export const LogoDexe = styled.div``

export const Close = styled.div``

export const MenuList = styled.div`
  padding: 24px 0 24px 24px;
  box-sizing: border-box;
`

export const MenuIcon = styled.div`
  margin-right: 8px;
`

export const MenuText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #616d8b;
`

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    ${MenuText} {
      color: #e4f2ff;
    }
    svg > path {
      fill: #e4f2ff;
    }
    &:nth-child(3) {
      svg > path {
        stroke: #e4f2ff;
        fill: none;
      }
    }
    &:nth-child(7) {
      svg > path {
        stroke: #e4f2ff;
        fill: none;
      }
    }
  }
`

export const FooterBar = styled.div`
  width: fill-available;
`

export const FooterLine = styled.div`
  width: fill-available;
  height: 1px;
  background: #1f2b3d;
  opacity: 0.4;
`

export const SwitchContainer = styled.div`
  padding: 19px 0 19px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

export const SwitchText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #616d8b;
  margin-left: 16px;
`

export const BuyContainer = styled.div`
  padding: 37px 60px 37px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MiniLogoDexe = styled.div`
  display: flex;
  align-items: center;
`

export const Total = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
`

export const BuyText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #616d8b;
`

export const ArrowSymbol = styled.div`
  display: flex;
  align-items: center;
`
