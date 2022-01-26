/* eslint-disable react/display-name */
import { useRef, useMemo, useEffect, useState } from "react"
import styled from "styled-components"
import debounce from "lodash.debounce"
import Chart from "components/Chart"
import DonutChart from "components/DonutChart"
import {
  Flex,
  customTableStyles,
  BaseButton,
  Text,
  LinkIcon,
  device,
} from "theme"
import DataTable from "react-data-table-component"
import LineChart from "components/LineChart"
import Calendar from "components/Calendar"
import swap from "assets/icons/swap-button.svg"
import { setFilter } from "state/pools/actions"
import { AppDispatch, AppState } from "state"
import { format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"

import data from "./sampleData"
import { getRandomPnl } from "utils"

interface Props {}

const assetsList = [
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
  [
    [
      { label: "OH", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "S", x: 6, y: getRandomPnl() },
      { label: "OH", x: 7, y: getRandomPnl() },
      { label: "M", x: 8, y: getRandomPnl() },
      { label: "T", x: 9, y: getRandomPnl() },
      { label: "W", x: 10, y: getRandomPnl() },
      { label: "TH", x: 11, y: getRandomPnl() },
      { label: "F", x: 12, y: getRandomPnl() },
      { label: "S", x: 13, y: getRandomPnl() },
    ],
    [
      { label: "S", x: 0, y: getRandomPnl() },
      { label: "M", x: 1, y: getRandomPnl() },
      { label: "T", x: 2, y: getRandomPnl() },
      { label: "W", x: 3, y: getRandomPnl() },
      { label: "TH", x: 4, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
      { label: "F", x: 5, y: getRandomPnl() },
    ],
  ],
]

const StyledStatistics = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 0px 50px;

  @media only screen and (${device.sm}) {
    padding: 0 10px;
  }

  @media only screen and (${device.xs}) {
    display: none;
  }
`

const TotalStats = styled(Flex)``

const Stat = styled.div`
  width: fit-content;
  min-width: 120px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Label = styled.div`
  color: #999999;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`

const Value = styled.div`
  color: #f5f5f5;
  font-size: 22px;
  font-family: Gilroy;
  font-weight: 700;
`

const WhiteText = styled.span`
  color: #f5f5f5;
  font-size: 14px;
  font-family: Gilroy;
  font-weight: 300;
`

const StatItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Stat>
    <Value>{value}</Value>
    <Label>{label}</Label>
  </Stat>
)

const PieWrapper = styled.div`
  width: 185px;
  height: 185px;
`

const Tab = styled.div<{ active?: boolean }>`
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 700;
  color: ${(props) => (props.active ? "#f5f5f5" : "#999999")};
  margin: 0 15px;
  user-select: none;
  cursor: pointer;
`

const TabContent = styled.div`
  overflow-y: auto;
`

const Cell = styled.div<{ color?: string }>`
  color: ${(props) => (props?.color ? props.color : "#f5f5f5")};
  font-size: 14px;
  font-family: Gilroy;
  font-weight: 700;
  white-space: nowrap;
`

const Button = styled(BaseButton)`
  color: rgba(0, 0, 0, 0.6);
  padding: 13px 31px 10px;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;
  user-select: none;
`

const BuyButton = styled(Button)`
  background: radial-gradient(
    circle,
    rgba(127, 255, 212, 0.6) 0%,
    rgba(64, 128, 106, 0.6) 80%
  );
  background-position: 0px -40px;
`

const SellButton = styled(Button)`
  background: radial-gradient(
    circle,
    rgba(255, 127, 127, 0.6) 0%,
    rgba(128, 64, 64, 0.6) 80%
  );
  background-position: 0px -40px;
`

const PL = styled.div`
  height: 14px;
  width: 100px;
`

const ChartsWrapper = styled(Flex)`
  @media only screen and (${device.md}) {
    flex-direction: column;
  }
`

const columns = [
  {
    name: "#",
    selector: "index",
    sortable: true,
    width: "40px",
    hide: 1000,
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
    minWidth: "160px",
    hide: 600,
    cell: (row) => (
      <div>
        <Cell data-tag="allowRowEvents">{row.date}</Cell>
        <Text color="#707070">
          <LinkIcon fill="#0068C3" side="left" />
          Fee 0.00623 ETH
        </Text>
      </div>
    ),
  },
  {
    name: "Ticker",
    selector: "ticker",
    sortable: true,
    cell: (row) => (
      <div>
        <Cell data-tag="allowRowEvents">{row.ticker}</Cell>
        <PL></PL>
      </div>
    ),
  },
  {
    name: "Amount",
    selector: "amount",
    sortable: true,
    width: "80px",
    cell: (row) => (
      <div>
        <Cell data-tag="allowRowEvents">{row.amount}</Cell>
        <PL></PL>
      </div>
    ),
  },
  {
    name: "Buying Vol",
    selector: "buyingVol",
    sortable: true,
    minWidth: "160px",
    hide: 1280,
    cell: (row) => (
      <div>
        <Cell data-tag="allowRowEvents">{row.buyingVol}</Cell>
        <Text color="#999999">1 ISEDX = 2.22 ETH</Text>
      </div>
    ),
  },
  {
    name: "P&L ($) (%)",
    selector: "pnlETH",
    sortable: true,
    cell: (row) => (
      <div>
        <Cell
          color={row.pnl >= 0 ? "#7FFFD4" : "#FF7F7F"}
          data-tag="allowRowEvents"
        >
          {row.pnlETH}
        </Cell>
        <Text color="#999999">{row.pnl}$</Text>
      </div>
    ),
  },
  {
    name: "Current Vol",
    selector: "currentVol",
    sortable: true,
    minWidth: "160px",
    hide: 1100,
    cell: (row) => (
      <div>
        <Cell data-tag="allowRowEvents">{row.currentVol}</Cell>
        <Text color="#999999">{row.currentPrice}</Text>
      </div>
    ),
  },
  {
    name: "Debt & Fee",
    selector: "debt",
    sortable: true,
    hide: 950,
    cell: (row) => (
      <div>
        <Cell data-tag="allowRowEvents">{row.debt}</Cell>
        <PL></PL>
      </div>
    ),
  },
  {
    name: "",
    button: true,
    hide: 800,
    cell: () => <BuyButton>Buy</BuyButton>,
  },
  {
    name: "",
    button: true,
    minWidth: "110px",
    hide: 800,
    style: {
      justifyContent: "flex-start",
    },
    cell: () => <SellButton>Sell</SellButton>,
  },
]

const MobilePortfolio = styled.div`
  display: none;

  @media only screen and (${device.xs}) {
    display: flex;
    flex-direction: column;
  }
`

const Container = styled.div`
  user-select: none;
  width: calc(100% - 44px);
  margin: auto;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    217deg,
    rgba(41, 49, 52, 1) -30%,
    rgba(53, 52, 75, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const List = styled.div`
  position: relative;
  background: linear-gradient(
    217deg,
    rgba(41, 49, 52, 1) -30%,
    rgba(53, 52, 75, 1) 100%
  );
  border-radius: 5px;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.16) inset;
  -webkit-box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.16) inset;
  -moz-box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.16) inset;
  height: 173px;
  width: 100%;
  margin-top: 18px;
  overflow-y: auto;
`

const CurrentBackground = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 10;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    content: "";
    border-radius: 5px;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.16);
    background: linear-gradient(
      94deg,
      rgba(51, 62, 64, 1) 0%,
      rgba(128, 128, 128, 0.5) 100%
    );
    width: 100%;
    height: 48px;
  }
`

const EmptyItem = styled.div`
  height: 42px;
`

const ListItem = styled(Flex)<{ active?: boolean }>`
  width: 100%;
  height: 48px;
  z-index: 20;
  position: relative;
  justify-content: space-around;
  user-select: none;

  border-radius: 5px;
  box-shadow: ${(props) =>
    props.active
      ? "0px 3px 7px rgba(0, 0, 0, 0.16)"
      : "0px 3px 7px rgba(0, 0, 0, 0)"};
  background: ${(props) =>
    props.active
      ? "linear-gradient(94deg,rgba(51, 62, 64, 1) 0%,rgba(128, 128, 128, 0.5) 100%)"
      : "linear-gradient(94deg,rgba(51, 62, 64, 0) 0%,rgba(128, 128, 128, 0) 100%)"};
`

const BaseInfo = styled(Flex)`
  flex-direction: column;
`

const PnlInfo = styled(Flex)`
  flex-direction: column;
`

const TokenInfo = styled.div``

const TokenSymbol = styled.div`
  color: #f7f7f7;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
`
const TokenPnl24 = styled.div`
  font-size: 14px;
  color: #7fffd4;
  opacity: 0.7;
  margin-left: 10px;
`
const TokenPnl = styled.div`
  color: #7fffd4;
  opacity: 0.7;
  font-size: 14px;
`
const TokenPnlInBase = styled.div`
  color: #c2c3c4;
  font-size: 14px;
  opacity: 0.7;
`
const TokenName = styled.div`
  color: #999999;
  font-size: 14px;
`

const BaseTokenSymbol = styled.div`
  color: #999999;
  font-size: 14px;
`
const BaseTokenBalance = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
`

const SwapButton = styled.div`
  background: #3f424a;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  width: 26px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4.5px;
`

const SwapIcon = styled.img`
  transform: rotate(-90deg);
`

const ChartTooltip = styled.div`
  padding: 17px 15px 15px;
  border-radius: 5px;
  background: linear-gradient(
    216deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  height: 160px;
  width: calc(100% - 20px);
  margin: 0 auto 35px;
  /* backdrop-filter: blur(2px); */
`

const TooltipValue = styled.div`
  color: #f5f5f5;
  font-size: 14px;
`

const TooltipLabel = styled.div`
  color: #999999;
  font-size: 14px;
  margin-right: 10px;
`

const RowLabel = styled.div`
  color: #f5f5f5;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
`
const RowValue = styled.div`
  color: #f5f5f5;
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 500;
`

const BackButton = styled.img`
  height: 15px;
  width: 21px;
`

const Asset = ({ index, currentIndex, setIndex }) => {
  return (
    <ListItem
      active={index === currentIndex}
      key={index}
      onClick={() => setIndex(index)}
    >
      <TokenInfo>
        <Flex>
          <TokenSymbol>DeXE</TokenSymbol>
          <TokenPnl24>21.1%</TokenPnl24>
        </Flex>
        <TokenName>Dexe.Network</TokenName>
      </TokenInfo>
      <BaseInfo>
        <BaseTokenBalance>1.1452</BaseTokenBalance>
        <BaseTokenSymbol>USDT</BaseTokenSymbol>
      </BaseInfo>
      <PnlInfo>
        <TokenPnl>29.3%</TokenPnl>
        <TokenPnlInBase>12.33</TokenPnlInBase>
      </PnlInfo>
      <SwapButton>
        <SwapIcon src={swap} />
      </SwapButton>
    </ListItem>
  )
}

function Statistics(props: Props) {
  const [currentIndex, setIndex] = useState(0)
  const {} = props

  return (
    <>
      {/* <StyledStatistics>
        <ChartsWrapper jc="space-between" full>
          <Chart period height={217} />
          <PieWrapper>
            <DonutChart />
          </PieWrapper>
        </ChartsWrapper>
        <Flex p="47px 0">
          <Tab active>Deposits</Tab>
          <Tab>Withdrawals</Tab>
        </Flex>
        <TabContent>
          <DataTable
            customStyles={customTableStyles}
            fixedHeader
            fixedHeaderScrollHeight="210px"
            columns={columns}
            data={data}
            noDataComponent={<NoData>You have no open positions</NoData>}
            theme="dexe"
          />
        </TabContent>
      </StyledStatistics>
      <MobilePortfolio>
        <ChartTooltip>
          <Flex full>
            <Flex>
              <TooltipLabel>From:</TooltipLabel>
              <TooltipValue>03.08.2020</TooltipValue>
            </Flex>
            <Flex>
              <TooltipLabel>To:</TooltipLabel>
              <TooltipValue>Now</TooltipValue>
            </Flex>
          </Flex>
          <Flex full p="12px 0 6px">
            <RowLabel>ISEDX - $ETH</RowLabel>
            <RowValue>-1.2742 ETH</RowValue>
          </Flex>
          <Flex full p="6px 0">
            <RowLabel>ISEDX - $ETH percent</RowLabel>
            <RowValue>-12.13%</RowValue>
          </Flex>
          <Flex full p="6px 0">
            <RowLabel>ISEDX - USD</RowLabel>
            <RowValue>-848 USD</RowValue>
          </Flex>
          <Flex full p="6px 0">
            <RowLabel>ISEDX - USD percent</RowLabel>
            <RowValue>-11%</RowValue>
          </Flex>
        </ChartTooltip>
        <Container>
          <LineChart
            dataPrev={assetsList[currentIndex][0]}
            dataNew={[
              assetsList[currentIndex][0][
                assetsList[currentIndex][0].length - 1
              ],
              ...assetsList[currentIndex][1],
            ]}
          />
          <List>
            {assetsList.map((asset, index) => (
              <Asset
                index={index}
                currentIndex={currentIndex}
                setIndex={setIndex}
                key={index}
              />
            ))}
          </List>
        </Container>
      </MobilePortfolio> */}
    </>
  )
}

export default Statistics
