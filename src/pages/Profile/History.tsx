import { useState } from "react"
import { Flex } from "theme"
import { Orientation } from "constants/types"
import DataTable, { createTheme } from "react-data-table-component"
import { Wrapper, NoData, Title } from "pages/Profile/styled"
import data from "./sampleData"

createTheme("dexe", {
  text: {
    primary: "#F5F5F5",
    secondary: "#2aa198",
  },
  background: {
    default: "transparent",
  },
  divider: {
    default: "transparent",
  },
  sortFocus: {
    default: "#F5F5F5",
  },
})

const columns = [
  {
    name: "",
    selector: "index",
    sortable: true,
    width: "20px",
    style: {
      padding: 0,
    },
  },
  {
    name: "DATE",
    selector: "date",
    sortable: true,
  },
  {
    name: "EXCHANGE",
    selector: "exchange",
    sortable: true,
  },
  {
    name: "SEND",
    selector: "send",
    sortable: true,
  },
  {
    name: "PRICE",
    selector: "price",
    sortable: true,
  },
  {
    name: "GET",
    selector: "get",
    sortable: true,
  },
  {
    name: "FEE",
    selector: "fee",
    sortable: true,
  },
  {
    name: "P&L",
    selector: "pnl",
    sortable: true,
  },
]

const customStyled = {
  header: {
    style: {
      display: "none",
    },
  },
  headRow: {
    style: {
      minHeight: "26px",
      borderBottomWidth: "0px",
    },
  },
  rows: {
    style: {
      minHeight: "37px",
      fontSize: "14px",
      fontWeight: 300,
      color: "#F5F5F5",
    },
  },
  headCells: {
    style: {
      color: "#707070",
      fontFamily: "Gilroy",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
}

// const useState = (defaultValue) => {
//   let currentValue = defaultValue

//   const setNew = (newValue) => {
//     currentValue = newValue
//   }

//   return [currentValue, setNew]
// }

const History = () => {
  const [topSide, setTopSide] = useState(1)
  const [botSide, setBotSide] = useState(1)

  return (
    <>
      <Flex jc="flex-start" full>
        <Title onClick={() => setTopSide(1)} weight={topSide === 1 ? 800 : 300}>
          OPEN POSITIONS
        </Title>
        <Title onClick={() => setTopSide(2)} weight={topSide === 2 ? 800 : 300}>
          INVESTING OPEN POSITIONS
        </Title>
      </Flex>
      <Wrapper dir={Orientation.vertical} p="0 0 10px" full>
        {topSide === 1 ? (
          <DataTable
            customStyles={customStyled}
            fixedHeader
            fixedHeaderScrollHeight="210px"
            columns={columns}
            data={[]}
            noDataComponent={<NoData>You have no open positions</NoData>}
            theme="dexe"
          />
        ) : (
          <DataTable
            customStyles={customStyled}
            fixedHeader
            fixedHeaderScrollHeight="210px"
            columns={columns}
            data={data.reverse()}
            noDataComponent={<NoData>You have no open positions</NoData>}
            theme="dexe"
          />
        )}
      </Wrapper>

      <Flex jc="flex-start" full>
        <Title onClick={() => setBotSide(1)} weight={botSide === 1 ? 800 : 300}>
          TRADING POSITIONS HISTORY
        </Title>
        <Title onClick={() => setBotSide(2)} weight={botSide === 2 ? 800 : 300}>
          INVESTING POSITIONS HISTORY
        </Title>
      </Flex>

      <Wrapper dir={Orientation.vertical} p="0px 0 24px" full>
        {botSide === 1 ? (
          <DataTable
            customStyles={customStyled}
            fixedHeader
            fixedHeaderScrollHeight="210px"
            columns={columns}
            data={data}
            noDataComponent={<NoData>You have no history positions</NoData>}
            theme="dexe"
          />
        ) : (
          <DataTable
            customStyles={customStyled}
            fixedHeader
            fixedHeaderScrollHeight="210px"
            columns={columns}
            data={[]}
            noDataComponent={<NoData>You have no history positions</NoData>}
            theme="dexe"
          />
        )}
      </Wrapper>
    </>
  )
}

export default History
