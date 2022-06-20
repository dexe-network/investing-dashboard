import { FC } from "react"
import { Flex } from "theme"

import { Title } from "./styled"
import { IAmountSharedProps } from "./interface"

import Amount from "./index"

interface IProps extends IAmountSharedProps {
  title: string
}

export const AmountRow: FC<IProps> = ({ title, value, symbol, ...props }) => (
  <Flex full {...props}>
    <Title>{title}</Title>
    <Amount value={value} symbol={symbol} />
  </Flex>
)

export default AmountRow
