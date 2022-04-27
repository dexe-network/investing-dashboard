import { getAddress } from "@ethersproject/address"
import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"
import { poolTypes, stableCoins } from "constants/index"
import { ethers } from "ethers"
import { ERC20 } from "abi"
import { useEffect, useState } from "react"
import { OwnedPools } from "constants/interfaces_v2"

export const useUpdate = (ms: number) => {
  const [updator, setUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setUpdate(updator + 1), ms)

    return () => clearInterval(interval)
  }, [])

  return updator
}

export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function isAddress(value: any): boolean {
  if (value === "" || value === "0x") {
    return false
  }

  try {
    const address = getAddress(value).toLowerCase()
    if (address.length !== 42) return false

    return true
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

  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
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

function reverseString(str) {
  const splitString = str.split("")
  const reverseArray = splitString.reverse()

  const joinArray = reverseArray.join("")

  return joinArray
}

const parseDecimals = (float: string, decimals) => {
  // const firstMatch = floatPart.match("[1-9]")
  // const lastMatch = reverseString(floatPart).match("[1-9]")

  // if (
  //   !!firstMatch &&
  //   !!firstMatch.length &&
  //   !!firstMatch.index &&
  //   !!lastMatch &&
  //   !!lastMatch.index
  // ) {
  //   const d = firstMatch.index > decimals ? firstMatch.index + 3 : decimals

  //   return floatPart.substring(0, d + 1)
  // }

  const floatPart = !!float ? `${float}`.substring(0, decimals + 1) : ".00"
  return floatPart
}

const humanizeBigNumber = (amount: string | number, limit = 6): string => {
  const numArr = `${amount}`.split(".")

  // no decimal places
  if (!numArr[1]) {
    return numArr[0]
  }

  // passes without formating
  if (numArr[1].length < limit) {
    return `${numArr[0]}.${numArr[1]}`
  }

  const firstMatch = numArr[1].match("[1-9]")

  if (
    !!firstMatch &&
    !!firstMatch.length &&
    !!firstMatch.index &&
    firstMatch.index > limit
  ) {
    return Number(amount).toFixed(firstMatch.index + 2)
  }

  return Number(amount).toFixed(limit)
}

export const formatNumber = (amount: string, decimals = 2) => {
  if (!amount) return "0.00"

  const numArr = amount.split(".")

  const floatPart = numArr[1] && numArr[1] !== "0" ? `.${numArr[1]}` : ""

  if (Number(numArr[0]) > 1000) {
    return `${(Number(numArr[0]) / 1000).toFixed(2).split(".00")[0]}k`
  }

  if (decimals === 0) {
    return numArr[0].split(/(?=(?:\d{3})+(?!\d))/).join(",")
  }

  return (
    numArr[0].split(/(?=(?:\d{3})+(?!\d))/).join(",") +
    parseDecimals(floatPart, decimals)
  )
}

// @params n - number to format
// @params d - decimals to apply
// @return - formated number
export const formatDecimalsNumber = (n: number, d?: number): number => {
  const decimals = d || 4
  if (!n) return 0
  try {
    const splited = n.toString().split(".")
    const floatPart = splited[1] && splited[1] !== "0" ? `.${splited[1]}` : ""
    return parseFloat(
      `${splited[0]}${
        floatPart.length < decimals
          ? floatPart
          : floatPart.substring(0, decimals + 1)
      }`
    )
  } catch (e) {
    return 0
  }
}

export const calcPrice = (price, amount) => {
  try {
    return price * amount
  } catch (e) {
    console.log(e)
    return 0
  }
}

export const formatBigNumber = (value: BigNumber, decimals = 18, fix = 6) => {
  const amount = ethers.utils.formatUnits(value, decimals).toString()

  return formatNumber(amount, fix)
}

export const normalizeBigNumber = (
  value: BigNumber,
  decimals = 18,
  fix?: number
) => {
  const amount = ethers.utils.formatUnits(value, decimals).toString()

  return humanizeBigNumber(amount, fix)
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

export function getAllowance(address, tokenAddress, contractAddress, lib) {
  const signer = lib.getSigner(address).connectUnchecked()

  const erc20Contract = new Contract(tokenAddress, ERC20, signer)

  return erc20Contract.allowance(address, contractAddress)
}

export const focusText = (event) => event.target.select()

export const getRedirectedPoolAddress = (pools: OwnedPools) => {
  if (!!pools && pools.basic.length) {
    return [poolTypes.basic, pools.basic[0]]
  }

  if (!!pools && pools.invest.length) {
    return [poolTypes.invest, pools.invest[0]]
  }

  return null
}

export const fixFractionalDecimals = (
  amount: string,
  decimals: number
): string => {
  const numArr = amount.split(".")
  if (numArr.length === 2 && numArr[1].length > decimals) {
    return `${numArr[0]}.${numArr[1].substring(0, decimals)}`
  }
  return amount
}

export const calcSlippage = (
  amount: BigNumber,
  decimals: number,
  slippage: number
) => {
  try {
    const normalizedAmount = ethers.utils.formatUnits(amount, decimals)
    const normalizedWithSlippage = parseFloat(normalizedAmount) * slippage

    const result = ethers.utils.parseUnits(
      fixFractionalDecimals(normalizedWithSlippage.toString(), decimals),
      decimals
    )

    return result
  } catch (e) {
    console.log(e)
    return amount
  }
}

export const parseTransactionError = (str: string) => {
  const position = str.search(`"message":`)

  const cutString = str.substring(position + 10)

  const matches = cutString.match(/"(.*?)"/)
  return matches ? matches[1] : ""
}
