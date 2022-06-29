import { FC } from "react"

import Amount from "components/Amount"

import { BodyStyled as S } from "./styled"

interface Props {}

const RiskyCardBody: FC<Props> = ({ children }) => {
  return (
    <S.Body>
      <S.Item>
        <S.Label>Proposal size</S.Label>
        <Amount value={"40 LP"} />
      </S.Item>
      <S.Item>
        <S.Label>Your size</S.Label>
        <Amount value={"0 LP"} />
      </S.Item>
      <S.Item>
        <S.Label>Fullness</S.Label>
        <Amount value={"35 LP"} />
      </S.Item>

      <S.Item>
        <S.Label>Max. Invest Price</S.Label>
        <Amount value={"0.0013"} symbol={"WBNB"} />
      </S.Item>
      <S.Item>
        <S.Label>Current price</S.Label>
        <Amount value={"0.00129"} symbol={"WBNB"} />
      </S.Item>
      <S.Item>
        <S.Label>Expiration date</S.Label>
        <Amount value={"JUN 20,2022  20:00"} fz="11px" />
      </S.Item>

      <S.Item>
        <S.Label>Investors</S.Label>
        <Amount value={"299"} symbol={"/ 1000"} />
      </S.Item>
      <S.Item>
        <S.Label>Position size</S.Label>
        <Amount value={"20"} symbol={"WBNB"} />
      </S.Item>
      {children && <S.Item>{children}</S.Item>}
    </S.Body>
  )
}

export default RiskyCardBody
