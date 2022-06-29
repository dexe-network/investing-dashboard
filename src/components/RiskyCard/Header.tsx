import { FC } from "react"
import { Flex } from "theme"

import TokenIcon from "components/TokenIcon"

import { HeaderStyled as S, PositionSymbol } from "./styled"

interface Props {
  positionAddress: string
  positionTokenData?: any
  isTrader?: boolean
}

const RiskyCardHeader: FC<Props> = ({
  positionAddress,
  positionTokenData,
  isTrader = false,
  children,
}) => {
  return (
    <S.Head isTrader={isTrader}>
      <Flex>
        <TokenIcon address={positionAddress} m="0" size={24} />
        <S.Amount>5</S.Amount>
        <PositionSymbol>{positionTokenData?.symbol}</PositionSymbol>
      </Flex>
      <Flex>{children}</Flex>
    </S.Head>
  )
}

export default RiskyCardHeader
