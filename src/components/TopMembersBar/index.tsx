// import { useState } from "react"
// import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux"

import { device } from "theme"
import styled from "styled-components"
import Dropdown from "components/Dropdown"
import Calendar from "components/Calendar"
import Search from "components/Search"
import { sortItemsList, currencies } from "constants/index"
import { format } from "date-fns"

import sort from "assets/icons/sort.svg"
import { AppDispatch, AppState } from "state"

import { setFilter } from "state/members/actions"

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;

  @media only screen and (${device.md}) {
    border-bottom: 1px solid #47bef9;
  }
`

const TopMembersBar: React.FC = () => {
  const filters = useSelector((state: AppState) => state.members.filters)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  const startDate = format(new Date(filters.period[0]), "MM/dd/yy")
  const endDate = format(new Date(filters.period[1]), "MM/dd/yy")

  return (
    <StyledBar>
      <Dropdown
        name="sort"
        position="right"
        data={sortItemsList}
        placeholder="Choose sort type"
        label="Sorted by:"
        icon={sort}
        onChange={handleChange}
        value={filters.sort}
      />
      <Calendar
        onChange={handleChange}
        value={filters.period}
        label={`Time period: ${startDate}-${endDate}`}
      />
      <Search onChange={handleChange} />
      <Dropdown
        name="currency"
        position="left"
        label="Currency:"
        data={currencies}
        placeholder="Choose currency"
        icon="https://tokens.1inch.exchange/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"
        onChange={handleChange}
        value={filters.currency}
      />
    </StyledBar>
  )
}

export default TopMembersBar
