import { useState } from "react"
import { motion } from "framer-motion"

import { device, useBreakpoint } from "theme"
import styled from "styled-components"
import Dropdown from "components/Dropdown"
import Calendar from "components/Calendar"
import Search from "components/Search"
import { sortItemsList, currencies } from "constants/index"

import sort from "assets/icons/sort.svg"
import hamburger from "assets/icons/hamburger.svg"

import CardView from "assets/icons/CardView"
import ListView from "assets/icons/ListView"
import { usePoolsFilters } from "state/pools/hooks"

export const StyledBar = styled(motion.div)`
  touch-action: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  height: 58px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  background: #31383b;
  width: 100%;

  @media only screen and (${device.sm}) {
    justify-content: space-between;
    padding: 0 10px;
  }
`

const MenuContainer = styled.div`
  width: 34px;
  height: 34px;
  display: none;
  cursor: pointer;

  @media only screen and (${device.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const HamburgerMenu = styled.img`
  height: 18px;
  width: 21px;
`

const SwitcherContainer = styled.div`
  width: 34px;
  height: 18px;
  background: #4e555a;
  border-radius: 9px;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 15px 0 auto;

  @media only screen and (${device.sm}) {
    margin: 0;
  }
`

const Circle = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.position === "left" ? "15px" : "-1px")};
  left: ${(props) => (props.position === "left" ? "-1px" : "15px")};
  height: 20px;
  width: 20px;
  border-radius: 50px;
  background: #8e8e8e;
  box-shadow: -3px 0px 5px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
  transition: all 0.3s ease-in-out;
`

const SwitchIcon = styled.div<{ scale: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 17px;
  height: 18px;
  cursor: pointer;

  & > svg {
    transition: all 0.5s ease-in-out;
    transform: scale(${(props) => props.scale});
  }

  & > path {
    transition: fill 0.5s ease-in-out;
  }
`

const ClickableArea = styled.div`
  width: 58px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListGridSwitcher = ({ type, setType }) => {
  return (
    <ClickableArea onClick={() => setType(type === "card" ? "list" : "card")}>
      <SwitcherContainer>
        <SwitchIcon scale={type === "card" ? 1.1 : 1}>
          <CardView fill={type === "card" ? "#fff" : "#6F7579"} />
        </SwitchIcon>

        <Circle position={type === "card" ? "left" : "right"} />

        <SwitchIcon scale={type === "list" ? 1 : 0.8}>
          <ListView fill={type === "list" ? "#fff" : "#6F7579"} />
        </SwitchIcon>
      </SwitcherContainer>
    </ClickableArea>
  )
}

const TopMembersBar: React.FC = () => {
  const [filters, handleFiltersChange] = usePoolsFilters()
  const breakpoint = useBreakpoint()

  const [isMenuOpen, setMenuState] = useState(false)

  const isDesktop = breakpoint !== "sm"

  return (
    <StyledBar
      initial={{ y: -62 }}
      animate={{ y: 0 }}
      exit={{ y: -62 }}
      transition={{ duration: 0.3, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <ClickableArea onClick={() => setMenuState(!isMenuOpen)}>
        <MenuContainer>
          <HamburgerMenu src={hamburger} />
        </MenuContainer>
      </ClickableArea>
      {isDesktop && (
        <Dropdown
          name="sort"
          position="right"
          data={sortItemsList}
          label="Sorted by:"
          icon={sort}
          onChange={handleFiltersChange}
          value={filters.sort}
        />
      )}
      {isDesktop && (
        <Calendar onChange={handleFiltersChange} value={filters.period} />
      )}
      <Search onChange={handleFiltersChange} />
      <ListGridSwitcher
        type={filters.listStyle}
        setType={(v) => handleFiltersChange("listStyle", v)}
      />
      {/* <Dropdown
        name="currency"
        position="left"
        label="Currency:"
        data={currencies}
        placeholder="Choose currency"
        icon="https://tokens.1inch.exchange/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"
        onChange={handleChange}
        value={filters.currency}
      /> */}
    </StyledBar>
  )
}

export default TopMembersBar
