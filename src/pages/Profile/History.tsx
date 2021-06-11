import { useState } from "react"
import { Flex, customListStyles, device } from "theme"
import styled from "styled-components"
import { Orientation } from "constants/types"
import DataTable from "react-data-table-component"
import { Wrapper, NoData, Title } from "pages/Profile/styled"
import data from "./sampleData"

const columns = [
  {
    name: "#",
    selector: "index",
    sortable: true,
    width: "40px",
    hide: 420,
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
    hide: 800,
  },
  {
    name: "PRICE",
    selector: "price",
    sortable: true,
    hide: 500,
  },
  {
    name: "GET",
    selector: "get",
    sortable: true,
    hide: 1000,
  },
  {
    name: "FEE",
    selector: "fee",
    sortable: true,
    hide: 700,
  },
  {
    name: "P&L",
    selector: "pnl",
    sortable: true,
  },
]

const TitleContainer = styled(Flex)`
  @media only screen and (${device.md}) {
    padding: 0 10px;
  }
`

const StyledHistory = styled.div`
  width: 100%;

  @media only screen and (${device.sm}) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`

const History = () => {
  const [topSide, setTopSide] = useState(1)
  const [botSide, setBotSide] = useState(1)

  return (
    <StyledHistory>
      <TitleContainer jc="flex-start" full p="0 35px">
        <Title onClick={() => setTopSide(1)} weight={topSide === 1 ? 800 : 300}>
          POSITIONS
        </Title>
        <Title onClick={() => setTopSide(2)} weight={topSide === 2 ? 800 : 300}>
          INVESTING
        </Title>
      </TitleContainer>
      <Wrapper
        className="scrollable-content"
        dir={Orientation.vertical}
        p="0 10px 10px"
        full
      >
        {topSide === 1 ? (
          <DataTable
            responsive
            customStyles={customListStyles}
            fixedHeader
            fixedHeaderScrollHeight="200px"
            columns={columns}
            data={[]}
            noDataComponent={<NoData>You have no open positions</NoData>}
            theme="dexe"
          />
        ) : (
          <DataTable
            responsive
            customStyles={customListStyles}
            fixedHeader
            fixedHeaderScrollHeight="200px"
            columns={columns}
            data={data.reverse()}
            noDataComponent={<NoData>You have no open positions</NoData>}
            theme="dexe"
          />
        )}
      </Wrapper>

      <TitleContainer jc="flex-start" full p="0 35px">
        <Title onClick={() => setBotSide(1)} weight={botSide === 1 ? 800 : 300}>
          TRADING
        </Title>
        <Title onClick={() => setBotSide(2)} weight={botSide === 2 ? 800 : 300}>
          INVESTING
        </Title>
      </TitleContainer>

      <Wrapper
        className="scrollable-content"
        dir={Orientation.vertical}
        p="0px 10px 24px"
        full
      >
        {botSide === 1 && (
          <DataTable
            customStyles={customListStyles}
            fixedHeader
            fixedHeaderScrollHeight="200px"
            columns={columns}
            data={data}
            noDataComponent={<NoData>You have no history positions</NoData>}
            theme="dexe"
          />
        )}
        {botSide === 2 && (
          <DataTable
            customStyles={customListStyles}
            fixedHeader
            fixedHeaderScrollHeight="200px"
            columns={columns}
            data={[]}
            noDataComponent={<NoData>You have no history positions</NoData>}
            theme="dexe"
          />
        )}
      </Wrapper>
    </StyledHistory>
  )
}

export default History
