import { useMemo, useState } from "react"
import { useAllTransactions } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"

const FilterTypes = {
  SWAP: TransactionType.SWAP,
  DEPOSIT: TransactionType.DEPOSIT_LIQUIDITY_STAKING,
  WITHDRAW: TransactionType.WITHDRAW_LIQUIDITY_STAKING,
}

interface IResult {
  txList: any[]
  txFilter: number
  FilterTypes: typeof FilterTypes
  txListExpanded: boolean
}

export default function useTransactionHistory(): [IResult, any] {
  const transactions = useAllTransactions()

  const [filter, setFiler] = useState(FilterTypes.SWAP)
  const [expanded, setExpanded] = useState<boolean>(false)

  const filteredTransactions = useMemo(() => {
    const txList = Object.keys(transactions).map((key) => transactions[key])

    if (!txList.length) return []

    return txList.filter((tx) => tx.info.type === filter)
  }, [filter, transactions])

  return [
    {
      txList: filteredTransactions,
      txFilter: filter,
      FilterTypes,
      txListExpanded: expanded,
    },
    { setTxFiler: setFiler, setTxListExpanded: setExpanded },
  ]
}
