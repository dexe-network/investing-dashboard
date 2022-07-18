import { FC } from "react"
import * as S from "./styled"
import { DividendToken } from "./useRequestDividend"

const Tile: FC<{ token: DividendToken }> = ({ token }) => {
  return (
    <S.Tile>
      {token.icon}
      <S.TextContainer ai="flex-start">
        <S.TextWhite>{token.symbol}</S.TextWhite>
        <S.TextGray>{token.name}</S.TextGray>
      </S.TextContainer>
      <S.TextContainer ai="flex-end">
        <S.TextWhite>$200.230.320</S.TextWhite>
        <S.TextGray>Available dividends in USD</S.TextGray>
      </S.TextContainer>
    </S.Tile>
  )
}

export default Tile
