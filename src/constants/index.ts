import { addDays, addMonths, addYears } from "date-fns"
import { createStaticRanges } from "react-date-range"

export const sortItemsList = [
  "Trader rating",
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

export const currencies = [
  "BTC",
  "ETH",
  "USD",
  "AUD",
  "CHF",
  "EUR",
  "GBP",
  "JPY",
]

export const defaultStaticRanges = [
  {
    label: "1 day",
    range: () => ({
      startDate: new Date(),
      endDate: addDays(new Date(), -1),
    }),
  },
  {
    label: "1 week",
    range: () => ({
      startDate: new Date(),
      endDate: addDays(new Date(), -7),
    }),
  },
  {
    label: "1 month",
    range: () => ({
      startDate: new Date(),
      endDate: addMonths(new Date(), -1),
    }),
  },
  {
    label: "3 months",
    range: () => ({
      startDate: new Date(),
      endDate: addMonths(new Date(), -3),
    }),
  },
  {
    label: "6 months",
    range: () => ({
      startDate: new Date(),
      endDate: addMonths(new Date(), -6),
    }),
  },
  {
    label: "1 year",
    range: () => ({
      startDate: new Date(),
      endDate: addYears(new Date(), -1),
    }),
  },
  {
    label: "2 years",
    range: () => ({
      startDate: new Date(),
      endDate: addYears(new Date(), -2),
    }),
  },
  {
    label: "All period",
    range: () => ({
      startDate: new Date(),
      endDate: addYears(new Date(), -5),
    }),
  },
]

export const calendarStaticRanges = createStaticRanges(
  defaultStaticRanges.reverse()
)

export default {}
