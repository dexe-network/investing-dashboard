import { getAddress } from "@ethersproject/address"
import { BigNumber } from "@ethersproject/bignumber"

export function isAddress(value: any): string | false {
  try {
    return getAddress(value).toLowerCase()
  } catch {
    return false
  }
}

export function shortenAddress(
  address: string | null | undefined,
  chars = 4
): string {
  if (!address || !address.length) {
    return ""
  }

  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function fromBig(value: BigNumber, decimals: number) {
  const divisor = BigNumber.from(10).pow(decimals)

  return value.div(divisor).toString()
}

export function bigify(value: string, decimals: number) {
  const multiplier = BigNumber.from(10).pow(decimals)

  return BigNumber.from(value).mul(multiplier)
}

// create dummy data 90% positive number 10% negative
export const getRandomPnl = () => {
  const r1 = Math.random()
  const r2 = Math.random()
  const negative = r2 > 0.9 ? -1 : 1

  return r1 * 100 * negative
}

export const formatNumber = (amount: string) => {
  const numArr = amount.split(".")

  const floatPart = numArr[1] && numArr[1] !== "0" ? `.${numArr[1]}` : ""

  return (
    numArr[0].split(/(?=(?:\d{3})+(?!\d))/).join(",") +
    (floatPart.length < 6 ? floatPart : floatPart.substring(0, 6))
  )
}
