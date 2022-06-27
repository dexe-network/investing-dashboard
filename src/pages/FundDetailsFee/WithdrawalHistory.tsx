import { FC } from "react"

import WithdrawalHistoryRow from "components/WithdrawalHistoryRow"

import { WithdrawalHistoryStyled } from "./styled"

interface IProps {
  payload: any[]
}

const WithdrawalHistory: FC<IProps> = ({ payload }) => {
  return (
    <>
      <WithdrawalHistoryStyled.Title>
        Withdrawal history
      </WithdrawalHistoryStyled.Title>
      <WithdrawalHistoryStyled.List>
        <WithdrawalHistoryStyled.ListHeader>
          <WithdrawalHistoryStyled.ListHeaderItem>
            P&L
          </WithdrawalHistoryStyled.ListHeaderItem>
          <WithdrawalHistoryStyled.ListHeaderItem>
            Fund Profit
          </WithdrawalHistoryStyled.ListHeaderItem>
          <WithdrawalHistoryStyled.ListHeaderItem>
            Perfomance Fee
          </WithdrawalHistoryStyled.ListHeaderItem>
        </WithdrawalHistoryStyled.ListHeader>
        {payload.map((withdraw: any) => (
          <WithdrawalHistoryRow
            key={withdraw.id}
            payload={withdraw}
            m="16px 0 0"
          />
        ))}
      </WithdrawalHistoryStyled.List>
    </>
  )
}

export default WithdrawalHistory
