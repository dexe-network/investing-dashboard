import { BigNumber, ethers, FixedNumber } from "ethers"
import { formatNumber, convertBigToFixed } from "utils"

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
  return formatNumber(ethers.utils.formatUnits(value, 18).toString(), 0)
}

export const getLastInArray = (array) =>
  array.length ? array[array.length - 1] : false

export const getDividedBalance = (
  balance: BigNumber,
  decimals: number | undefined = 18,
  percent: string
): BigNumber => {
  const fn = FixedNumber.fromValue(balance, decimals).mulUnsafe(
    FixedNumber.fromValue(BigNumber.from(percent), 18)
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

export const getPriceImpact = (a: number, b: number) => {
  const result = b / a - 1

  if (isNaN(result)) return 0
  return result
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
