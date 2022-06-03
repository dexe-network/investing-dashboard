import { SupportedChainId } from "constants/chains"

const BSCSCAN_PREFIXES = {
  [SupportedChainId.BINANCE_SMART_CHAIN]: "https://bscscan.com",
  [SupportedChainId.BINANCE_SMART_CHAIN_TESTNET]: "https://testnet.bscscan.com",
}

export enum ExplorerDataType {
  TRANSACTION = "transaction",
  TOKEN = "token",
  ADDRESS = "address",
  BLOCK = "block",
}

export default function getExplorerLink(
  chainId: number,
  data: string,
  type: ExplorerDataType
) {
  const prefix = BSCSCAN_PREFIXES[chainId] ?? "https://bscscan.com"

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`
    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`
    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`
    case ExplorerDataType.BLOCK:
      return `${prefix}/block/${data}`
    default:
      return prefix
  }
}
