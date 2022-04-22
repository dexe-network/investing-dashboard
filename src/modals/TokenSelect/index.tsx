import { useSelector } from "react-redux"
import { FC, useState } from "react"

import TokensList from "components/TokensList"
import Modal from "components/Modal"

import { selectWhitelist } from "state/pricefeed/selectors"

import { Token } from "constants/interfaces"

interface Props {
  isOpen: boolean
  onSelect: (token: Token) => void
  onClose: () => void
}

const TokenSelect: FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const [q, setQuery] = useState("")
  const whitelisted = useSelector(selectWhitelist)

  return (
    <Modal isOpen={isOpen} toggle={onClose} title="Select basic token">
      <TokensList
        query={q}
        onSelect={onSelect}
        handleChange={setQuery}
        tokens={whitelisted}
      />
    </Modal>
  )
}

export default TokenSelect
