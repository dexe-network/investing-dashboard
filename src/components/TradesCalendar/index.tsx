import styled from "styled-components"
import { ResponsiveCalendar } from "@nivo/calendar"
import data from "./sampleData"

const StyledCalendar = styled.div`
  height: 236px;
  width: 100%;
`

const TradesCalendar = () => (
  <StyledCalendar>
    <ResponsiveCalendar
      data={data}
      from="2015-01-01"
      to="2015-12-31"
      emptyColor="rgba(255, 255, 255, 0.1)"
      colors={["#409163", "#369680", "#369680", "#389B86"]}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      yearSpacing={0}
      monthBorderWidth={0}
      monthBorderColor="#2B313B"
      dayBorderWidth={2}
      dayBorderColor="#2B313B"
      theme={{
        background: "transparent",
        textColor: "#707070",
        fontSize: 14,
        fontFamily: "Gilroy",
        axis: {
          domain: {
            line: {
              stroke: "#777777",
              strokeWidth: 1,
            },
          },
          ticks: {
            line: {
              stroke: "#777777",
              strokeWidth: 1,
            },
          },
        },
        grid: {
          line: {
            stroke: "#dddddd",
            strokeWidth: 1,
          },
        },
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  </StyledCalendar>
)

export default TradesCalendar
