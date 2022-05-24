import { useSelector } from "react-redux"
import { BigNumber } from "@ethersproject/bignumber"

import {
  TransactionType,
  ApproveTransactionInfo,
  FundCreateTransactionInfo,
  StakeInsuranceTransactionInfo,
  UnstakeInsuranceTransactionInfo,
  TransactionInfo,
} from "state/transactions/types"
import { Container } from "./styled"

import { selectWhitelistItem } from "state/pricefeed/selectors"
import { formatBigNumber } from "utils"

interface IProps {
  info: TransactionInfo
}

const ApprovalSummary: React.FC<{ info: ApproveTransactionInfo }> = ({
  info: { tokenAddress },
}) => {
  const token = useSelector(selectWhitelistItem(tokenAddress))

  return <>Approve {token?.symbol}</>
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

const CredentialsUpdateSummary: React.FC = () => {
  return <>Successfully update Credentials</>
}

const StakeInsuranceSummary: React.FC<{
  info: StakeInsuranceTransactionInfo
}> = ({ info: { amount } }) => {
  const fromAmount = formatBigNumber(BigNumber.from(amount))

  return <>Stake insurance {fromAmount} DEXE</>
}

const UnstakeInsuranceSummary: React.FC<{
  info: UnstakeInsuranceTransactionInfo
}> = ({ info: { amount } }) => {
  const toAmount = formatBigNumber(BigNumber.from(amount))

  return <>Unstake insurance {toAmount} DEXE-LP</>
}

const TransactionSummary: React.FC<IProps> = ({ info }) => {
  switch (info.type) {
    case TransactionType.APPROVAL:
      return <ApprovalSummary info={info} />
    case TransactionType.FUND_CREATE:
      return <FundCreateSummary info={info} />
    case TransactionType.UPDATE_USER_CREDENTIALS:
      return <CredentialsUpdateSummary />
    case TransactionType.STAKE_INSURANCE:
      return <StakeInsuranceSummary info={info} />
    case TransactionType.UNSTAKE_INSURANCE:
      return <UnstakeInsuranceSummary info={info} />

    default:
      return <Container>Default</Container>
  }
}

export default TransactionSummary
