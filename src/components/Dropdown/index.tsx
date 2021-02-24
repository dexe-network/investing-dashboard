import { useState, useRef } from "react"

import { useClickAway } from "react-use"
import { motion } from "framer-motion"
import styled from "styled-components"

interface Props {
  label?: string
  default?: string
  placeholder?: string
  data?: string[]
}

export const floatingBodyVariants = {
  visible: {
    height: "fit-content",
    y: 0,
    display: "block",
    opacity: 1,
  },
  hidden: {
    height: 0,
    opacity: 0,
    y: -5,
    transitionEnd: {
      display: "none",
    },
  },
}

const simpleVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

export const StyledDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: pointer;
  position: relative;
`

export const Label = styled.div`
  font-size: 16px;
  color: #707070;
`

export const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #999999;
  margin-left: 15px;
  width: 126px;
`

const Body = styled(motion.div)`
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  background: linear-gradient(
    197deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
  border-radius: 7px;
  z-index: 20;
  position: absolute;
  top: 50px;
  right: 20px;
  width: 176px;
  height: fit-content;
`

const Item = styled(motion.div)<{ active?: boolean }>`
  height: 31px;
  color: #f7f7f7;
  padding-left: 16px;
  display: flex;
  align-items: center;
  border-radius: 7px;
  background: ${(props) => (props.active ? "#000000" : "transparent")};
`

const Dropdown: React.FC<Props> = (props) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(props.default)

  const list = props.data || []
  const toggle = () => setOpen(!open)

  useClickAway(ref, () => {
    setOpen(false)
  })

  return (
    <StyledDropdown onClick={toggle} ref={ref}>
      {props.label && <Label>{props.label}</Label>}
      {!active ? <Value>{props.placeholder}</Value> : <Value>{active}</Value>}

      <Body
        initial="hidden"
        variants={floatingBodyVariants}
        animate={open ? "visible" : "hidden"}
      >
        {list.map((name) => (
          <Item
            key={name}
            initial="hidden"
            variants={simpleVariants}
            active={active === name}
            onClick={() => setActive(name)}
          >
            {name}
          </Item>
        ))}
      </Body>
    </StyledDropdown>
  )
}

export default Dropdown
