import { useState, useEffect } from "react"
import { DateRangePicker } from "react-date-range"
import calendar from "assets/icons/calendar.svg"
import Dropdown from "components/Dropdown"
import { addDays, addYears, format } from "date-fns"
import { calendarStaticRanges } from "constants/index"

import "./calendar.css"

interface Props {
  label?: React.ReactElement | string
  onChange: (name: string, value: any) => void
  value: string[]
}

const Calendar: React.FC<Props> = (props) => {
  const [label, setLabel] = useState("All period")

  const startDate = format(new Date(props.value[0]), "MM.dd")
  const endDate = format(new Date(props.value[1]), "MM.dd")

  const checkSelection = (item) => {
    const selected = calendarStaticRanges.filter((range) =>
      range.isSelected(item.period)
    )

    if (selected.length) {
      setLabel(selected[0].label)
    } else {
      setLabel("")
    }
  }

  return (
    <Dropdown
      noClickAway
      name="period"
      label={
        <div className="rdrCalendarItem">
          <div className="rdrCalendarLabel">Time period:</div>
          <div className="rdrCalendarValue">
            {label.length ? label : `${startDate} / ${endDate}`}
          </div>
        </div>
      }
      icon={calendar}
    >
      <DateRangePicker
        maxDate={addDays(new Date(), +1)}
        minDate={addYears(new Date(), -5)}
        onChange={(item) => {
          checkSelection(item)

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
        staticRanges={window.innerWidth > 500 ? calendarStaticRanges : []}
        direction="horizontal"
        inputRanges={[]}
        rangeColors={["#3E90FF"]}
      />
    </Dropdown>
  )
}

export default Calendar
