import { getAddress } from "@ethersproject/address"
import { Contract } from "@ethersproject/contracts"
import { BigNumber, BigNumberish } from "@ethersproject/bignumber"
import { poolTypes, stableCoins } from "constants/index"
import { ethers, FixedNumber } from "ethers"
import { ERC20 } from "abi"
import { useEffect, useState } from "react"
import { OwnedPools } from "constants/interfaces_v2"
import { getTime, setHours, setMinutes } from "date-fns"
import { TransactionReceipt } from "@ethersproject/providers"

export const useUpdate = (ms: number) => {
  const [updator, setUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setUpdate(updator + 1), ms)

    return () => clearInterval(interval)
  }, [])

  return updator
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms))
}

export function isAddress(value: any): boolean {
  if (!value || value.length !== 42 || value === "" || value === "0x") {
    return false
  }

  try {
    const address = getAddress(value).toLowerCase()
    if (address.length !== 42) return false

    return true
  } catch (error) {
    console.log(error)
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

// create dummy data 90% positive number 10% negative
export const getRandomPnl = () => {
  const r1 = Math.random()
  const r2 = Math.random()
  const negative = r2 > 0.9 ? -1 : 1

  return r1 * 100 * negative
}

const parseDecimals = (float: string, decimals) => {
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

export const formatBigNumber = (value?: BigNumber, decimals = 18, fix = 6) => {
  if (!value) return formatNumber("0", fix)

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

export function getAllowance(
  address,
  tokenAddress,
  contractAddress,
  lib
): BigNumber {
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
  const a = FixedNumber.fromValue(amount, decimals)
  const sl = FixedNumber.fromValue(
    ethers.utils.parseEther(slippage.toString()),
    18
  )

  return BigNumber.from(a.mulUnsafe(sl)._hex)
}

export const parseTransactionError = (str: any) => {
  const DEFAULT_TRANSACTION_ERROR = "Unpredictable transaction error"

  try {
    // parse string error
    if (typeof str === "string") {
      const position = str.search(`"message":`)

      const cutString = str.substring(position + 10)

      const matches = cutString.match(/"(.*?)"/)
      return matches ? matches[1] : DEFAULT_TRANSACTION_ERROR
    }

    if (typeof str !== "object") {
      return DEFAULT_TRANSACTION_ERROR
    }

    if (
      Object.keys(str).includes("error") &&
      Object.keys(str.error).includes("message")
    ) {
      return str.error.message
    }
    if (
      Object.keys(str).includes("data") &&
      Object.keys(str.data).includes("message")
    ) {
      return str.data.message
    }
  } catch (e) {
    return DEFAULT_TRANSACTION_ERROR
  }
}

export const shortTimestamp = (timestamp: number): number => {
  return Number((timestamp / 1000).toFixed(0))
}

export const expandTimestamp = (timestamp: number): number => {
  return Number(`${timestamp}000`)
}

export const keepHoursAndMinutes = (timestamp: Date | number, h, m): number => {
  const hours = setHours(timestamp, h)
  const minutes = setMinutes(hours, m)

  return shortTimestamp(getTime(minutes))
}

/**
 * Check that transaction is mined by the given receipt
 * @param tx transaction receipt
 * @returns true if transaction is mined otherwise false
 */
export const isTxMined = (tx: TransactionReceipt | undefined): boolean => {
  return !!tx && tx.status === 1
}

export const cutDecimalPlaces = (
  value: BigNumberish,
  decimals = 18,
  roundUp = true,
  fix = 6
) => {
  const number = ethers.utils.formatUnits(value, decimals)

  const pow = Math.pow(10, fix)

  const parsed =
    Math[roundUp ? "round" : "floor"](parseFloat(number) * pow) / pow

  return ethers.utils.parseUnits(parsed.toString(), decimals)
}

export const getMaxLPInvestAmount = (
  supply: BigNumber,
  emission: BigNumber
) => {
  const supplyFixed = FixedNumber.fromValue(supply, 18)
  const emissionFixed = FixedNumber.fromValue(emission, 18)

  const result = emissionFixed.subUnsafe(supplyFixed)

  return BigNumber.from(result._hex)
}

export function fromBig(value: BigNumber | undefined, decimals = 18) {
  if (!value) {
    return "0"
  }

  const formatedNumber = ethers.utils.formatUnits(value, decimals)
  if (formatedNumber.split(".")[1] === "0") return formatedNumber.split(".")[0]
  return formatedNumber
}

export function bigify(value: string, decimals: number) {
  if (!value) {
    return ethers.utils.parseUnits("0", decimals)
  }

  return ethers.utils.parseUnits(value, decimals)
}
