export const getPNL = (SP: string) => {
  let CP = 1
  const SP_PARSED = parseFloat(SP)

  if (SP_PARSED === 0) return 0

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
    return 0
  }
  return 0
}

export const getPriceLP = (history): string => {
  if (!history.length) {
    return "1.00"
  }

  const base = history[history.length - 1].baseTVL
  const emission = history[history.length - 1].supply

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
