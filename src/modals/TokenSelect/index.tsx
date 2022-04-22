import { useSelector } from "react-redux"
import { createPortal } from "react-dom"
import { FC, useState } from "react"

import TokensList from "components/TokensList"

import { selectWhitelist } from "state/pricefeed/selectors"

import { Token } from "constants/interfaces"

import { Container, Overlay } from "./styled"

const modalRoot = document.getElementById("token-select")

interface Props {
  isOpen: boolean
  onSelect: (token: Token) => void
  onClose: () => void
}

const TokenSelect: FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const [q, setQuery] = useState("")
  const whitelisted = useSelector(selectWhitelist)

  if (!modalRoot) return null
  return createPortal(
    <>
      <Overlay
        onClick={onClose}
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            opacity: 0.4,
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      />
      <Container
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            opacity: 1,
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      >
        <TokensList
          query={q}
          onSelect={onSelect}
          handleChange={setQuery}
          tokens={whitelisted}
        />
      </Container>
    </>,
    modalRoot
  )
}

export default TokenSelect
