import { BigNumber } from "@ethersproject/bignumber"
import { Pool } from "constants/interfaces_v2"

const Pools = [
  {
    pool_address: "0x123",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "ISDX",
    name: "ISO DEX",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0xaho9ot89ao8anor8ano",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "MOSA",
    name: "Mona Lisa Token",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "12.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x345",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "DRAKE",
    name: "DR DRAKE TOKEN",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "2981.00",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 222.12,
      m3: 122.32,
      all: 208.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x456",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "SALSO",
    name: "SOAHOt total_value_locked DEX",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "0.24",
    price_change_24h: 12.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 2.12,
      m3: 2.32,
      all: 2.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x567",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "CECO",
    name: "DEXCEX token stock market",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 2.12,
      m3: 12.32,
      all: 4.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 12 },
      { x: 5, y: 1, pnl: 1 },
      { x: 5, y: 2, pnl: 51 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x678",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "BORA BORA",
    name: "BORA BORA token ISLAND",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x789",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "ISDX",
    name: "ISO DEX",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x890",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "ISDX",
    name: "ISO DEX",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x901",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "ISDX",
    name: "ISO DEX",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
  {
    pool_address: "0x012",
    base_address: "0x...",
    creator_address: "0x...",

    // LP TOKEN INFO
    symbol: "ISDX",
    name: "ISO DEX",
    lp_decimal: 18,

    base_symbol: "USDT",
    base_name: "Tether USD",
    base_decimal: 6,

    // POOL CONFIG
    type: "standard",
    is_actual_on: false,
    managers_list: [],

    // COMMISSIONS
    trader_commission: 30,
    investor_commission: 40,
    platform_commission: 30,

    // STATS
    current_price: "1.13",
    price_change_24h: 2.35,
    copiers_change_24h: 7.21,
    total_value_locked: BigNumber.from("231382000000"),
    annual_percentage_yield: 31.23,
    profit_and_loss: 23.3,
    investors_funds_locked: BigNumber.from("150293000000"),
    investors_funds_locked_24h: 1.23,
    personal_funds_locked: BigNumber.from("81089000000"),
    personal_funds_locked_24h: 0.89,

    pnl_by_period: {
      m1: 22.12,
      m3: 102.32,
      all: 28.29,
    },
    pnl_chart: [
      { x: 2, y: 0, pnl: 13 },
      { x: 5, y: 1, pnl: 13 },
      { x: 5, y: 2, pnl: 13 },
    ],

    // TX INFO
    block_number: "9281820",
    tx_hash: "0xhoeuh92neuhoreuhosnuhaoneuhantoeuhtnaoeuhn",
    created_at: 10228102,
    updated_at: 10282828,
  },
]

export default Pools
