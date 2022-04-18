import { ChangeEventHandler, useEffect, useRef, useState } from "react"

import { useClickAway } from "react-use"
import { CircleSpinner } from "react-spinners-kit"
import { useDebounce } from "react-use"
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
} from "./styled"

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
  useClickAway(inputElement, () => {
    toggle(false)
  })

  useEffect(() => {
    if (active) {
      inputElement.current?.focus()
    }
  }, [active, inputElement])

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
    <IconArea
      ref={inputElement}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={wrapperVariants}
      transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
    >
      {/* <DebounceInput
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        transition={{ duration: 0.2, ease: [0.29, 0.98, 0.29, 1] }}
        variants={inputVariants}
        element={Input}
        autoFocus
        minLength={0}
        placeholder="Name, Ticker, Address"
        debounceTimeout={300}
        onChange={change}
        value={q}
      /> */}
      <Divider />
      {active ? (
        <Icon onClick={clear} src={remove} />
      ) : (
        <Icon onClick={onClick} src={search} />
      )}
    </IconArea>
  )
}

export default IconSearch
