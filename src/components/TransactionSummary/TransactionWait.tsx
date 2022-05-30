import { useMemo } from "react"
import { format } from "date-fns/esm"

import { TransactionInfo } from "state/transactions/types"

import {
  TransactionWaitContainer,
  TransactionWaitContent,
  TransactionWaitFooter,
  TransactionWaitProgress,
} from "./styled"

interface IProps {
  info: TransactionInfo
  addedTime: number
}

const TransactionWait: React.FC<IProps> = ({ addedTime }) => {
  const time = useMemo(() => {
    if (!addedTime) return null
    return String(format(addedTime, "HH:mm aaaaa'm'")).toUpperCase()
  }, [addedTime])

  return (
    <TransactionWaitContainer>
      <TransactionWaitContent>
        Your transaction has been sent to the network
      </TransactionWaitContent>
      <TransactionWaitFooter>
        {time} - <TransactionWaitProgress /> 1 min
      </TransactionWaitFooter>
    </TransactionWaitContainer>
  )
}

export default TransactionWait
