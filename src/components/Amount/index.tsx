import { FC } from "react"

import { Container, Value, Symbol } from "./styled"
import { IAmountSharedProps } from "./interface"

interface IProps extends IAmountSharedProps {}

export const Amount: FC<IProps> = ({ value, symbol, ...props }) => (
  <Container {...props}>
    <Value>{value}</Value>
    {symbol && (
      <>
        &nbsp;<Symbol> {symbol}</Symbol>
      </>
    )}
  </Container>
)

export default Amount
