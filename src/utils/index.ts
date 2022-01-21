import { getAddress } from "@ethersproject/address"
import { BigNumber } from "@ethersproject/bignumber"
import { stableCoins } from "constants/index"
import { ethers } from "ethers"

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

export function fromBig(
  value: BigNumber | undefined,
  decimals: number | undefined
) {
  if (!value || !decimals) {
    return BigNumber.from(0)
  }

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

export const formatNumber = (amount: string, decimals = 2) => {
  const numArr = amount.split(".")

  const floatPart = numArr[1] && numArr[1] !== "0" ? `.${numArr[1]}` : ""

  if (Number(numArr[0]) > 1000) {
    return `${(Number(numArr[0]) / 1000).toFixed(2).split(".00")[0]}k`
  }

  return (
    numArr[0].split(/(?=(?:\d{3})+(?!\d))/).join(",") +
    (floatPart.length < decimals
      ? floatPart
      : floatPart.substring(0, decimals + 1))
  )
}

export const formatBigNumber = (value: BigNumber, decimals = 18, fix = 6) => {
  const amount = ethers.utils.formatUnits(value, decimals).toString()

  return formatNumber(amount, fix)
}

export const isStable = (address: string) =>
  stableCoins.eth.indexOf(address.toLowerCase()) !== -1

export function getBNBSign(lib, address, nonce) {
  return new Promise((resolve) => {
    lib.provider.bnbSign(address, nonce).then((v) => resolve(v.signature))
  })
}

export function getSignature(nonce, address, lib) {
  if (lib?.provider?.bnbSign) {
    return getBNBSign(lib, address, nonce)
  }

  const signer = lib.getSigner(address)

  return signer.signMessage(nonce)
}

export function checkMetamask() {
  //
}

export const focusText = (event) => event.target.select()
