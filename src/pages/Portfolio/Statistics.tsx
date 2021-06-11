/* eslint-disable react/display-name */
import styled from "styled-components"
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
import { NoData } from "pages/Profile/styled"
import DataTable from "react-data-table-component"
import Calendar from "components/Calendar"
import { setFilter } from "state/members/actions"
import { AppDispatch, AppState } from "state"
import { format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"

import data from "./sampleData"

interface Props {}

const StyledStatistics = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 0px 50px;

  @media only screen and (${device.sm}) {
    padding: 0 10px;
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
  font-weight: bold;
`

const WhiteText = styled.span`
  color: #f5f5f5;
  font-size: 14px;
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
  font-weight: bold;
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
  font-weight: bold;
  white-space: nowrap;
`

const Button = styled(BaseButton)`
  color: rgba(0, 0, 0, 0.6);
  padding: 13px 31px 10px;
  font-size: 16px;
  font-weight: bold;
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

function Statistics(props: Props) {
  const {} = props

  const filters = useSelector((state: AppState) => state.members.filters)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (name, value) => dispatch(setFilter({ name, value }))

  const startDate = format(new Date(filters.period[0]), "MM/dd/yyyy")
  const endDate = format(new Date(filters.period[1]), "MM/dd/yyyy")

  const customCalendarLabel = (
    <Stat>
      {" "}
      <Label>
        From: <WhiteText>{startDate}</WhiteText>
      </Label>
      <Label>
        To: <WhiteText>{endDate}</WhiteText>
      </Label>
    </Stat>
  )

  return (
    <StyledStatistics>
      {/* <TotalStats p="40px 0" jc="space-between" full>
        <Calendar
          value={filters.period}
          onChange={handleChange}
          label={customCalendarLabel}
        />

        <StatItem label="Total buy at:" value="$155 000.12" />
        <StatItem label="Total sold at:" value="$255 000.12" />
        <StatItem label="Revenue:" value="$105 000.00" />
        <StatItem label="Profit" value="$68 000" />
        <StatItem label="TOTAL P&L (%):" value="42%" />
      </TotalStats> */}
      <ChartsWrapper jc="space-between" full>
        <Chart period height={217} />
        <PieWrapper>
          <DonutChart />
        </PieWrapper>
      </ChartsWrapper>
      <Flex p="47px 0">
        <Tab active>BUYING</Tab>
        <Tab>SELLING</Tab>
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
  )
}

export default Statistics
