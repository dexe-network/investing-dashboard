import ToastBase from "./ToastBase"

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

  return (
    <>
      <ToastBase type={success ? "success" : "warning"} onClose={onClose}>
        <div>{hash}</div>
        <a href="#">View on BSCscan</a>
      </ToastBase>
    </>
  )
}

export default ToastTransaction
