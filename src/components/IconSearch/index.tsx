import { useEffect, useRef } from "react"

import { useClickAway } from "react-use"
import { CircleSpinner } from "react-spinners-kit"
import { useDebounce } from "react-use"

import search from "assets/icons/search.svg"

import {
  IconArea,
  Icon,
  Input,
  Divider,
  wrapperVariants,
  inputVariants,
} from "./styled"
import { setTimeout } from "timers"

interface Props {
  active: boolean
  toggle: (v: boolean) => void
}

const IconSearch: React.FC<Props> = ({ active, toggle }) => {
  const inputElement = useRef<HTMLInputElement>(null)
  useClickAway(inputElement, () => {
    toggle(false)
  })

  useEffect(() => {
    if (active) {
      inputElement.current?.focus()
    }
  }, [active, inputElement])

  return (
    <IconArea
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={wrapperVariants}
      transition={{ delay: 0.1, duration: 0.3, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <Input
        autoFocus
        ref={inputElement}
        placeholder="Name, Ticker, Address"
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        transition={{ delay: 0.1, duration: 0.3, ease: [0.29, 0.98, 0.29, 1] }}
        variants={inputVariants}
      />
      <Divider />
      <Icon src={search} />
    </IconArea>
  )
}

export default IconSearch
