import { useMemo } from "react"
import { format } from "date-fns"

import { expandTimestamp } from "utils"

import S from "./styled"

interface Props {
  data: any
  baseTokenSymbol?: string
}

const PositionTrade: React.FC<Props> = ({ data, baseTokenSymbol, ...rest }) => {
  const PositionDirection = (
    <S.Direction isBuy={data.isInvest}>
      {data.isInvest ? "Buy" : "Sell"}
    </S.Direction>
  )

  const date = useMemo(() => {
    if (!data.timestamp) return "0"
    return format(expandTimestamp(data.timestamp), "MMM dd, y HH:mm")
  }, [data])

  return (
    <S.Container {...rest}>
      <S.Content>
        <S.Item>
          <S.Label>{date}</S.Label>
          <S.Value>
            {PositionDirection} 1 DEXE / {baseTokenSymbol ?? ""}
          </S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price {baseTokenSymbol ?? ""}</S.Label>
          <S.Value>1.148</S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price USDT</S.Label>
          <S.Value>$0.148</S.Value>
        </S.Item>
      </S.Content>
    </S.Container>
  )
}

export default PositionTrade
