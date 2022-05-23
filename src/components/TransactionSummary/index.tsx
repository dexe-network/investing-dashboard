import { useSelector } from "react-redux"
import {
  TransactionType,
  FundCreateTransactionInfo,
  TransactionInfo,
} from "state/transactions/types"
import { Container } from "./styled"

import { selectWhitelistItem } from "state/pricefeed/selectors"

interface IProps {
  info: TransactionInfo
}

const FundCreateSummary: React.FC<{ info: FundCreateTransactionInfo }> = ({
  info: { fundName, baseCurrencyId },
}) => {
  const baseCurrency = useSelector(selectWhitelistItem(baseCurrencyId))

  return (
    <>
      Create &ldquo;{fundName}&rdquo; fund with {baseCurrency?.symbol} base
      currency.
    </>
  )
}

const TransactionSummary: React.FC<IProps> = ({ info }) => {
  switch (info.type) {
    case TransactionType.APPROVAL:
      return <Container>Approval</Container>
    case TransactionType.FUND_CREATE:
      return <FundCreateSummary info={info} />

    default:
      return <Container>Default</Container>
  }
}

export default TransactionSummary
