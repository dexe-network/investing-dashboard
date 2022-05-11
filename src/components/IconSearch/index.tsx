import { ChangeEventHandler, useRef } from "react"
import { createPortal } from "react-dom"
import { overlayVariants } from "motion/variants"

import { useClickAway } from "react-use"
import { DebounceInput } from "react-debounce-input"

import search from "assets/icons/search-white.svg"
import remove from "assets/icons/remove-big.svg"

import {
  IconArea,
  Icon,
  Input,
  Divider,
  wrapperVariants,
  inputVariants,
  SearchOverlay,
} from "./styled"

const overlayRoot = document.getElementById("overlay")

interface Props {
  active: boolean
  q: string
  toggle: (v: boolean) => void
  onClick?: () => void
  onChange: (q: string) => void
}

const IconSearch: React.FC<Props> = ({
  active,
  q,
  toggle,
  onClick,
  onChange,
}) => {
  const inputElement = useRef<HTMLInputElement>(null)
  useClickAway(inputElement, (event) => {
    event.stopPropagation()
    toggle(false)
  })

  const change: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value)
  }

  const clear = () => {
    if (q.length) {
      onChange("")
    }
    if (!q.length) {
      toggle(false)
    }
  }

  return (
    <>
      <IconArea
        ref={inputElement}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        variants={wrapperVariants}
        transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <DebounceInput
          autoFocus
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          transition={{ duration: 0.2, ease: [0.29, 0.98, 0.29, 1] }}
          variants={inputVariants}
          element={Input}
          minLength={0}
          placeholder="Name, Ticker, Address"
          debounceTimeout={300}
          onChange={change}
          value={q}
        />
        <Divider />
        {active ? (
          <Icon onClick={clear} src={remove} />
        ) : (
          <Icon onClick={onClick} src={search} />
        )}
      </IconArea>
      {overlayRoot &&
        createPortal(
          <SearchOverlay
            initial="hidden"
            animate={!active ? "hidden" : "visible"}
            variants={overlayVariants}
          />,
          overlayRoot
        )}
    </>
  )
}

export default IconSearch
