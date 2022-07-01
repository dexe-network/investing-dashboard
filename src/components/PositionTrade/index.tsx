import S from "./styled"

interface Props {
  isBuyTrade?: boolean
}

const PositionTrade: React.FC<Props> = ({ isBuyTrade = false, ...rest }) => {
  const PositionDirection = (
    <S.Direction isBuy={isBuyTrade}>{isBuyTrade ? "Buy" : "Sell"}</S.Direction>
  )

  return (
    <S.Container {...rest}>
      <S.Content>
        <S.Item>
          <S.Label>12Jun 2021, 12:10</S.Label>
          <S.Value>{PositionDirection} 1 DEXE/ WBNB</S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price WBNB</S.Label>
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
