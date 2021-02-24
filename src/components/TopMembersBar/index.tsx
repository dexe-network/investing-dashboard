// import { useState } from "react"
// import { motion } from "framer-motion"

import styled from "styled-components"
import Dropdown from "components/Dropdown"
import Calendar from "components/Calendar"
import Search from "components/Search"

import w2w from "assets/temp_w2w.png"

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
`

const Side = styled(StyledBar)``

const sortItemsList = [
  "P&L in %",
  "P&L in currency",
  "Personal funds",
  "Invested",
  "Trades",
  "Aver.trades.per.day",
  "Aver.time.position",
  "Maximum Loss",
  "Sortino ETH",
  "Sortino BTC",
  "Total supply",
  "Circulating supply",
]

const currencies = ["BTC", "ETH", "USD", "AUD", "CHF", "EUR", "GBP", "JPY"]

const TopMembersBar: React.FC = () => {
  // const [value, onChange] = useState([new Date(), new Date()])

  return (
    <StyledBar>
      <Dropdown
        data={sortItemsList}
        default={sortItemsList[0]}
        placeholder="Choose sort type"
        label="Sorted by:"
      />
      <Calendar />
      <Side>
        <Search />
      </Side>
      <Side>
        <Dropdown
          label="Currency:"
          default={currencies[0]}
          data={currencies}
          placeholder="Choose currency"
        />
        <div style={{ alignItems: "center", display: "flex" }}>
          <img style={{ width: 317 }} src={w2w} alt="" />
        </div>
      </Side>
    </StyledBar>
  )
}

export default TopMembersBar
