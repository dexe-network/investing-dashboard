import ToastBase from "./ToastBase"
import { TransactionBody, TransactionLink } from "./styled"

import TransactionSummary from "components/TransactionSummary"
import { useTransaction } from "state/transactions/hooks"

interface IProps {
  hash: string
  onClose: () => void
}

const ToastTransaction: React.FC<IProps> = ({ hash, onClose }) => {
  const tx = useTransaction(hash)

  console.log("transaction", tx)

  if (!tx) return null
  const success = Boolean(tx.receipt && tx.receipt.status === 1)
  const type = success ? "success" : "warning"

  return (
    <>
      <ToastBase type={type} onClose={onClose}>
        <TransactionBody>
          <TransactionSummary info={tx.info} />
        </TransactionBody>
        <TransactionLink hash={hash} type={type} />
      </ToastBase>
    </>
  )
}

export default ToastTransaction
