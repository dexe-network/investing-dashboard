import Confirm from "components/Confirm"
import { FC } from "react"

import warn from "assets/icons/warn-big.svg"

import { Icon, Text } from "./styled"

interface Props {
  isOpen: boolean
  toggle: () => void
}

const TransactionError: FC<Props> = ({ isOpen, children, toggle }) => {
  return (
    <Confirm title="Error" isOpen={isOpen} toggle={toggle}>
      <Icon src={warn} />
      <Text>{children}</Text>
    </Confirm>
  )
}

export default TransactionError
