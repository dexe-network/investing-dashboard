import { useSelector } from "react-redux"
import { BigNumber } from "@ethersproject/bignumber"

import {
  TransactionType,
  ApproveTransactionInfo,
  ExactInputSwapTransactionInfo,
  ExactOutputSwapTransactionInfo,
  DepositLiquidityTransactionInfo,
  WithdrawLiquidityTransactionInfo,
  FundCreateTransactionInfo,
  FundEditTransactionInfo,
  FundUpdateInvestorsTransactionInfo,
  FundUpdateManagersTransactionInfo,
  CreateRiskyProposalTransactionInfo,
  EditRiskyProposalTransactionInfo,
  CreateInvestProposalTransactionInfo,
  EditInvestProposalTransactionInfo,
  StakeInsuranceTransactionInfo,
  UnstakeInsuranceTransactionInfo,
  TransactionInfo,
} from "state/transactions/types"
import { TradeType, UpdateListType } from "constants/types"

import FormattedCurrencyAmount from "./FormattedCurrencyAmount"

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

const SwapSummaryInput: React.FC<{ info: ExactInputSwapTransactionInfo }> = ({
  info,
}) => {
  return (
    <>
      Swap from{" "}
      <FormattedCurrencyAmount
        rawAmount={info.inputCurrencyAmountRaw}
        rawCurrency={info.inputCurrencyId}
      />{" "}
      to{" "}
      <FormattedCurrencyAmount
        rawAmount={info.expectedOutputCurrencyAmountRaw}
        rawCurrency={info.outputCurrencyId}
      />
    </>
  )
}
const SwapSummaryOutput: React.FC<{ info: ExactOutputSwapTransactionInfo }> = ({
  info,
}) => {
  return (
    <>
      Swap from{" "}
      <FormattedCurrencyAmount
        rawAmount={info.outputCurrencyAmountRaw}
        rawCurrency={info.inputCurrencyId}
      />{" "}
      to{" "}
      <FormattedCurrencyAmount
        rawAmount={info.expectedInputCurrencyAmountRaw}
        rawCurrency={info.outputCurrencyId}
      />
    </>
  )
}

const SwapSummary: React.FC<{
  info: ExactInputSwapTransactionInfo | ExactOutputSwapTransactionInfo
}> = ({ info }) => {
  if (info.tradeType === TradeType.EXACT_INPUT) {
    return <SwapSummaryInput info={info} />
  } else {
    return <SwapSummaryOutput info={info} />
  }
}

const DepositLiquiditySummary: React.FC<{
  info: DepositLiquidityTransactionInfo
}> = ({ info: { currencyId, amount } }) => {
  return (
    <>
      Deposit liquidity{" "}
      <FormattedCurrencyAmount rawAmount={amount} rawCurrency={currencyId} />
    </>
  )
}

const WithdrawLiquiditySummary: React.FC<{
  info: WithdrawLiquidityTransactionInfo
}> = ({ info: { currencyId, amount } }) => {
  return (
    <>
      Withdraw liquidity{" "}
      <FormattedCurrencyAmount rawAmount={amount} rawCurrency={currencyId} />
    </>
  )
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

const FundEditSummary: React.FC<{ info: FundEditTransactionInfo }> = ({
  info: { fundName, baseCurrencyId },
}) => {
  const baseCurrency = useSelector(selectWhitelistItem(baseCurrencyId))

  return (
    <>
      Update &ldquo;{fundName}&rdquo; fund with {baseCurrency?.symbol} base
      currency.
    </>
  )
}

const FundUpdateUnvestorsSummary: React.FC<{
  info: FundUpdateInvestorsTransactionInfo
}> = ({ info }) => {
  const action = info.editType === UpdateListType.ADD ? "add" : "remove"
  return <>Successlully {action} investors</>
}

const FundUpdateManagersSummary: React.FC<{
  info: FundUpdateManagersTransactionInfo
}> = ({ info }) => {
  const action = info.editType === UpdateListType.ADD ? "add" : "remove"
  return <>Successlully {action} managers</>
}

const CredentialsUpdateSummary: React.FC = () => {
  return <>Successfully update Credentials</>
}

const CreateRiskyProposalSummary: React.FC<{
  info: CreateRiskyProposalTransactionInfo
}> = ({ info }) => {
  return <>Create Risky Proposal</>
}
const EditRiskyProposalSummary: React.FC<{
  info: EditRiskyProposalTransactionInfo
}> = ({ info }) => {
  return <>Update Risky Proposal</>
}

const CreateInvestProposalSummary: React.FC<{
  info: CreateInvestProposalTransactionInfo
}> = ({ info: { investLpAmountRaw } }) => {
  const amount = formatBigNumber(BigNumber.from(investLpAmountRaw))
  return <>Create Invest Proposal for {amount} LP tokens</>
}
const EditInvestProposalSummary: React.FC<{
  info: EditInvestProposalTransactionInfo
}> = ({ info: { investLpAmountRaw } }) => {
  const amount = formatBigNumber(BigNumber.from(investLpAmountRaw))
  return <>Update Invest Proposal with {amount} of LP tokens</>
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
    case TransactionType.SWAP:
      return <SwapSummary info={info} />
    case TransactionType.DEPOSIT_LIQUIDITY_STAKING:
      return <DepositLiquiditySummary info={info} />
    case TransactionType.WITHDRAW_LIQUIDITY_STAKING:
      return <WithdrawLiquiditySummary info={info} />
    case TransactionType.FUND_CREATE:
      return <FundCreateSummary info={info} />
    case TransactionType.FUND_EDIT:
      return <FundEditSummary info={info} />
    case TransactionType.FUND_UPDATE_INVESTORS:
      return <FundUpdateUnvestorsSummary info={info} />
    case TransactionType.FUND_UPDATE_MANAGERS:
      return <FundUpdateManagersSummary info={info} />
    case TransactionType.UPDATE_USER_CREDENTIALS:
      return <CredentialsUpdateSummary />
    case TransactionType.CREATE_RISKY_PROPOSAL:
      return <CreateRiskyProposalSummary info={info} />
    case TransactionType.EDIT_RISKY_PROPOSAL:
      return <EditRiskyProposalSummary info={info} />
    case TransactionType.CREATE_INVEST_PROPOSAL:
      return <CreateInvestProposalSummary info={info} />
    case TransactionType.EDIT_INVEST_PROPOSAL:
      return <EditInvestProposalSummary info={info} />
    case TransactionType.STAKE_INSURANCE:
      return <StakeInsuranceSummary info={info} />
    case TransactionType.UNSTAKE_INSURANCE:
      return <UnstakeInsuranceSummary info={info} />

    default:
      return null
  }
}

export default TransactionSummary
