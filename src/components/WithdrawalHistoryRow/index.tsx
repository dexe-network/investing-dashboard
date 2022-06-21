import { FC, useMemo } from "react"
import { format } from "date-fns"
import { BigNumber } from "@ethersproject/bignumber"

import { expandTimestamp, shortTimestamp, formatBigNumber } from "utils"

import Amount from "components/Amount"
import S from "./styled"

interface IWithdrawal {
  creationTime: number
  pnl: BigNumber
  profit: BigNumber
  fee: BigNumber
}

interface IProps {
  payload: IWithdrawal
  m?: string
}

const WithdrawalHistoryRow: FC<IProps> = ({ payload, ...rest }) => {
  const creationTime = useMemo(() => {
    if (!payload || !payload.creationTime) return null

    return format(shortTimestamp(payload.creationTime), "MMM dd, y")
  }, [payload])

  const pnl = useMemo(() => {
    if (!payload || !payload.pnl) return null

    return formatBigNumber(payload.pnl, 18, 2)
  }, [payload])

  const profit = useMemo(() => {
    if (!payload || !payload.profit) return null

    return formatBigNumber(payload.profit, 18, 2)
  }, [payload])

  const fee = useMemo(() => {
    if (!payload || !payload.fee) return null

    return formatBigNumber(payload.fee, 18, 2)
  }, [payload])

  return (
    <S.Container {...rest}>
      <S.First>
        <S.Time>{creationTime}</S.Time>
        <S.Percentage>{pnl} %</S.Percentage>
      </S.First>
      <Amount value={profit} symbol="USD" full />
      <Amount value={fee} symbol="USD" jc="flex-end" full />
    </S.Container>
  )
}

export default WithdrawalHistoryRow
