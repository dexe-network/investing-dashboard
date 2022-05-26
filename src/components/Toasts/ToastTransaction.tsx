import { useMemo } from "react"
import ToastBase from "./ToastBase"
import { TransactionBody, TransactionLink } from "./styled"

import { ToastType } from "./types"

import TransactionSummary from "components/TransactionSummary"
import TransactionWait from "components/TransactionSummary/TransactionWait"
import { useTransaction } from "state/transactions/hooks"

interface IProps {
  hash: string
  onClose: () => void
  visible: boolean
}

const ToastTransaction: React.FC<IProps> = ({ hash, onClose, visible }) => {
  const tx = useTransaction(hash)

  const type = useMemo<ToastType>(() => {
    if (!tx || !tx.receipt) {
      return ToastType.Waiting
    }

    if (Boolean(tx.receipt && tx.receipt.status === 1)) {
      return ToastType.Success
    }

    return ToastType.Warning
    /* 
      No need dependency, otherwise React will 
      re-render content of 'wait toast' after transaction is confirmed 
    */
  }, [])

  const body = useMemo(() => {
    if (!tx) return null

    switch (type) {
      case ToastType.Waiting:
        return <TransactionWait info={tx.info} addedTime={tx.addedTime} />
      case ToastType.Success:
        return <TransactionSummary info={tx.info} />
      case ToastType.Warning:
        return <>Your transaction donU+2019t sent to the network</>
      default:
        return null
    }
    /* 
      No need dependency, otherwise React will 
      re-render content of 'wait toast' after transaction is confirmed 
    */
  }, [])

  if (!tx) return null

  return (
    <>
      <ToastBase type={type} onClose={onClose} visible={visible}>
        <TransactionBody>{body}</TransactionBody>
        {type !== ToastType.Waiting && (
          <TransactionLink hash={hash} type={type} />
        )}
      </ToastBase>
    </>
  )
}

export default ToastTransaction
