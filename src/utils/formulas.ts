import { PoolInfo } from "constants/interfaces_v2"
import { formatUnits } from "@ethersproject/units"
import { BigNumber, FixedNumber } from "@ethersproject/bignumber"
import { cutDecimalPlaces, formatNumber, convertBigToFixed } from "utils"

export const getPNL = (SP: string) => {
  let CP = 1
  const SP_PARSED = parseFloat(SP)

  if (SP_PARSED === 0) return "0.00"

  // calculate profit
  if (SP_PARSED > CP) {
    const profit = SP_PARSED - CP
    const profitPercent = ((profit / CP) * 100).toFixed(2)
    CP = 1
    return profitPercent
  }

  // calculate loss
  if (SP_PARSED < CP) {
    const loss = CP - SP_PARSED
    const lossPercent = ((loss / CP) * 100).toFixed(2)
    CP = 1
    return -lossPercent
  }

  // price not changed
  if (SP_PARSED === CP) {
    CP = 1
    return "0.00"
  }
  return "0.00"
}

export const getPriceLP = (history): string => {
  if (!history || !history.length) {
    return "1.00"
  }

  const base = history[0].baseTVL
  const emission = history[0].supply

  if (
    !base ||
    !emission ||
    emission.toString() === "0" ||
    base.toString() === "0"
  ) {
    return "1.00"
  }

  return (Number(base) / Number(emission)).toString()
}

export const getPriceUSD = (history): string => {
  if (!history || !history.length) {
    return "1.00"
  }

  const usd = history[0].usdTVL
  const emission = history[0].supply

  if (
    !usd ||
    !emission ||
    emission.toString() === "0" ||
    usd.toString() === "0"
  ) {
    return "1.00"
  }

  const result = Number(usd) / Number(emission)

  if (isNaN(result)) {
    return "1.00"
  }

  return result.toFixed(2)
}

export const getPriceStable = (stable: string, emission: string): string => {
  if (
    !stable ||
    !emission ||
    emission.toString() === "0" ||
    stable.toString() === "0"
  )
    return "1"
  return (Number(stable) / Number(emission)).toString()
}

export const getUSDPrice = (value) => {
  return formatNumber(formatUnits(value, 18).toString(), 0)
}

export const getLastInArray = (array) =>
  array.length ? array[array.length - 1] : false

export const multiplyBignumbers = (
  bn1: [BigNumber, number],
  bn2: [BigNumber, number]
): BigNumber => {
  const fn = FixedNumber.fromValue(bn1[0], bn1[1]).mulUnsafe(
    FixedNumber.fromValue(bn2[0], bn2[1])
  )
  return BigNumber.from(fn._hex)
}

export const divideBignumbers = (
  bn1: [BigNumber, number],
  bn2: [BigNumber, number]
): BigNumber => {
  const fn = FixedNumber.fromValue(bn1[0], bn1[1]).divUnsafe(
    FixedNumber.fromValue(bn2[0], bn2[1])
  )
  return BigNumber.from(fn._hex)
}

export const getLP = (baseTVL: string, supply: string): string => {
  if (supply === "0") {
    return "1.00"
  }

  return (Number(baseTVL) / Number(supply)).toFixed(2)
}

export const formateChartData = (data) => {
  if (!data) return undefined

  return data.reverse().map((v) => {
    const price = getLP(v.baseTVL, v.supply)
    const pnl = getPNL(price)

    return {
      ...v,
      price: price,
      pnl,
    }
  })
}

export const getPriceImpact = (from: BigNumber, to: BigNumber) => {
  try {
    const a = FixedNumber.fromValue(from, 18)
    const b = FixedNumber.fromValue(to, 18)
    const result = b.divUnsafe(a)

    return (parseFloat(result._value) - 1).toFixed(4)
  } catch (e) {
    return "0.00"
  }
}

export const getFreeLiquidity = (poolInfo: PoolInfo | null) => {
  if (!poolInfo) return

  if (poolInfo.parameters.totalLPEmission.eq("0")) return Infinity

  const freeLiquidity = FixedNumber.fromValue(
    poolInfo.parameters.totalLPEmission,
    18
  ).subUnsafe(FixedNumber.fromValue(poolInfo.lpSupply, 18))

  return BigNumber.from(freeLiquidity._hex)
}

export const percentageOfBignumbers = (num1: BigNumber, num2: BigNumber) => {
  const percentage = FixedNumber.fromValue(num1)
    .divUnsafe(FixedNumber.fromValue(num2))
    .mulUnsafe(FixedNumber.from(100))

  return cutDecimalPlaces(percentage._hex, 18, false, 2)
}

export const getSumOfBignumbersArray = (bns: BigNumber[]) => {
  return bns.reduce((prev, next) => prev.add(next), BigNumber.from("0"))
}

/**
 * Calculate fund profit amount without trader funds
 * @param platformFeeAmount - platform fee amount
 * @param performanceFeeAmount - performance fee amount
 * @param performanceFeePercentAmount - trader fee percent
 * @returns fund profit amount without trader funds
 */
export const getFundProfitWithoutTraderFunds = (
  platformFeeAmount: BigNumber,
  performanceFeeAmount: BigNumber,
  performanceFeePercentAmount: BigNumber,
  decimals?: number
): BigNumber => {
  const _decimals = decimals ?? 18
  const HUNDRED = FixedNumber.fromValue(BigNumber.from("100"), _decimals)

  const platformFee = convertBigToFixed(platformFeeAmount, _decimals)
  const performanceFee = convertBigToFixed(performanceFeeAmount, _decimals)
  const performanceFeePercent = convertBigToFixed(
    performanceFeePercentAmount,
    18
  )

  const totalFee = platformFee.addUnsafe(performanceFee)
  const percentage = HUNDRED.subUnsafe(performanceFeePercent)
  const result = totalFee.divUnsafe(percentage.divUnsafe(HUNDRED))

  return BigNumber.from(result)
}
