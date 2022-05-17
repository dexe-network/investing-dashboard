import { addDays, addMonths, addYears } from "date-fns"
import { createStaticRanges } from "react-date-range"
import { ISortItem } from "./interfaces"

export const poolTypes: {
  all: "ALL_POOL"
  basic: "BASIC_POOL"
  invest: "INVEST_POOL"
} = {
  all: "ALL_POOL",
  basic: "BASIC_POOL",
  invest: "INVEST_POOL",
}

export const sortItemsList: ISortItem[] = [
  {
    label: "Max Loss",
    key: "maxLoss",
    direction: "",
  },
  {
    label: "Investors amount",
    key: "investorsCount",
    direction: "",
  },
  {
    label: "Date of creation",
    key: "creationTime",
    direction: "",
  },
  {
    label: "Total trades",
    key: "totalTrades",
    direction: "",
  },
  {
    label: "Max. total closed positions",
    key: "totalClosedPositions",
    direction: "",
  },
  {
    label: "Max. average trades ",
    key: "averageTrades",
    direction: "",
  },
  {
    label: "Average position time ",
    key: "averagePositionTime",
    direction: "",
  },
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

export const commonsTokensList = [
  {
    symbol: "DEXE",
    address: "0xde4ee8057785a7e8e800db58f9784845a5c2cbd6",
  },
  {
    symbol: "SBNB",
    address: "0x617aecb6137b5108d1e7d4918e3725c8cebdb848",
  },
  {
    symbol: "BUSD",
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
  },
  {
    symbol: "USDT",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    symbol: "IBTC",
    address: "0xd6014ea05bde904448b743833ddf07c3c7837481",
  },
  {
    symbol: "DAI",
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  {
    symbol: "WETH",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  {
    symbol: "LINK",
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
  },
]

export const defaultTokensList = [
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2500,
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  },
  {
    symbol: "SBNB",
    name: "Synth BNB",
    price: 300,
    address: "0x617aecb6137b5108d1e7d4918e3725c8cebdb848",
  },
  {
    symbol: "BUSD",
    name: "B-USD token",
    price: 1,
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
  },
  {
    symbol: "USDT",
    name: "Tether",
    price: 1,
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    symbol: "IBTC",
    name: "BITCOIN",
    price: 32493,
    address: "0xd6014ea05bde904448b743833ddf07c3c7837481",
  },
  {
    symbol: "DAI",
    name: "DAI",
    price: 253,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  {
    symbol: "WETH",
    name: "WETH",
    price: 281,
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  {
    symbol: "MASK",
    name: "MASK",
    price: 0,
    address: "0x69af81e73a73b40adf4f3d4223cd9b1ece623074",
  },
  {
    symbol: "1INCH",
    name: "1INCH",
    price: 0,
    address: "0x111111111117dc0aa78b770fa6a738034120c302",
  },
  {
    symbol: "FTM",
    name: "FTM",
    price: 0,
    address: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
  },
  {
    symbol: "LINK",
    name: "LINK",
    price: 0,
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
  },
]

export const stableCoins = {
  eth: [
    "0xdac17f958d2ee523a2206206994597c13d831ec7".toLowerCase(),
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48".toLowerCase(),
    "0x4Fabb145d64652a948d72533023f6E7A623C7C53".toLowerCase(),
    "0x6b175474e89094c44da98b954eedeac495271d0f".toLowerCase(),
    "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD".toLowerCase(),
    "0x0000000000085d4780B73119b644AE5ecd22b376".toLowerCase(),
    "0x8e870d67f660d95d5be530380d0ec0bd388289e1".toLowerCase(),
    "0x674C6Ad92Fd080e4004b2312b45f796a192D27a0".toLowerCase(),
    "0xdf574c24545e5ffecb9a659c229253d4111d87e1".toLowerCase(),
    "0x956F47F50A910163D8BF957Cf5846D573E7f87CA".toLowerCase(),
    "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0".toLowerCase(),
    "0x853d955acef822db058eb8505911ed77f175b99e".toLowerCase(),
    "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51".toLowerCase(),
    "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd".toLowerCase(),
  ],
  bsc: [],
}

export const EXCHANGE_DEFAULT_PERCENTS = [
  {
    label: "10%",
    percent: "0x016345785d8a0000",
  },
  {
    label: "25%",
    percent: "0x03782dace9d90000",
  },
  {
    label: "50%",
    percent: "0x06f05b59d3b20000",
  },
  {
    label: "75%",
    percent: "0x0a688906bd8b0000",
  },
]

export const performanceFees = [
  {
    id: 0,
    title: "1 Month Fee withdrawal",
    description: "Performance Fee limits of 20% to 30%",
    monthes: 1,
  },
  {
    id: 1,
    title: "3 Months Fee withdrawal",
    description: "Performance Fee limits of 20% to 50%",
    monthes: 3,
  },
  {
    id: 2,
    title: "12 Months Fee withdrawal",
    description: "Performance Fee limits of 20% to 70%",
    monthes: 12,
  },
]

export const sliderPropsByPeriodType = {
  "0": {
    min: 20,
    max: 30,
  },
  "1": {
    min: 20,
    max: 50,
  },
  "2": {
    min: 20,
    max: 70,
  },
}

export default {}
