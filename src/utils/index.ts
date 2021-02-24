import { getAddress } from "@ethersproject/address"
import { BigNumber } from "@ethersproject/bignumber"

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
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
