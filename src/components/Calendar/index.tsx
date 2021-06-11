import { DateRangePicker, createStaticRanges } from "react-date-range"

import calendar from "assets/icons/calendar.svg"

import { defaultStaticRanges } from "constants/index"
import Dropdown from "components/Dropdown"
import { addDays, addYears } from "date-fns"
import "./calendar.css"

interface Props {
  label?: React.ReactElement | string
  onChange: (name: string, value: any) => void
  value: string[]
}

const Calendar: React.FC<Props> = (props) => {
  const staticRanges = createStaticRanges(defaultStaticRanges.reverse())

  return (
    <Dropdown noClickAway name="period" label={props.label} icon={calendar}>
      <DateRangePicker
        maxDate={addDays(new Date(), +1)}
        minDate={addYears(new Date(), -5)}
        onChange={(item) => {
          console.log(item)
          props.onChange("period", [
            new Date(item.period.startDate).toISOString(),
            new Date(item.period.endDate).toISOString(),
          ])
        }}
        ranges={[
          {
            startDate: new Date(props.value[0]),
            endDate: new Date(props.value[1]),
            key: "period",
          },
        ]}
        showSelectionPreview
        moveRangeOnFirstSelection
        staticRanges={window.innerWidth > 500 ? staticRanges : []}
        direction="horizontal"
        inputRanges={[]}
        rangeColors={["#3E90FF"]}
      />
    </Dropdown>
  )
}

export default Calendar
