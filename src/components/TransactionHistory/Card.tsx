import { TransactionDetails, TransactionType } from "state/transactions/types"

import CardSwap from "./CardSwap"
import CardLiquidity from "./CardLiquidity"

interface IProps {
  payload: TransactionDetails
  chainId?: number
}

const TransactionHistoryCard: React.FC<IProps> = ({ payload, chainId }) => {
  switch (payload.info.type) {
    case TransactionType.SWAP:
      return (
        <CardSwap
          hash={payload.hash}
          info={payload.info}
          chainId={chainId}
          confirmedTime={payload.confirmedTime}
        />
      )
    case TransactionType.DEPOSIT_LIQUIDITY_STAKING:
    case TransactionType.WITHDRAW_LIQUIDITY_STAKING:
      return (
        <CardLiquidity
          hash={payload.hash}
          info={payload.info}
          chainId={chainId}
          confirmedTime={payload.confirmedTime}
        />
      )
    default:
      return null
  }
}

export default TransactionHistoryCard
