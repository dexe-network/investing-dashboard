import { useState, useRef } from "react"

import { useClickAway } from "react-use"
import { motion } from "framer-motion"
import styled from "styled-components"
import { device, Flex } from "theme"

interface Props {
  name: string
  icon?: string
  label?: React.ReactElement | string
  placeholder?: string
  data?: string[]
  children?: React.ReactElement
  position?: "right" | "left"
  value?: string
  onChange?: (name: string, value: string) => void
  noClickAway?: boolean
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
  padding: 0 0 0 20px;
`

const Text = styled.div`
  @media only screen and (${device.sm}) {
    display: none;
  }
`

export const Label = styled(Text)`
  font-size: 16px;
  color: #707070;
`

export const Value = styled(Text)`
  font-size: 16px;
  font-family: Gilroy;
  font-weight: 700;
  color: #f5f5f5;
  margin-left: 15px;
  width: 126px;
  white-space: nowrap;
`

const Body = styled(motion.div)<{ position?: "right" | "left" }>`
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
  right: ${(props) => (props?.position === "left" ? "30%" : "0")};
  left: ${(props) => (props?.position === "right" ? "30%" : "0")};
  min-width: 176px;
  max-width: 100vh;
  width: fit-content;
  height: fit-content;

  @media only screen and (${device.md}) {
    margin: auto;
    position: fixed;
    left: 50px;
    right: 0;
    top: 60px;
  }
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

  const list = props.data || []
  const toggle = () => setOpen(!open)

  useClickAway(ref, () => {
    setOpen(false)
  })

  const label =
    typeof props.label === "string" ? (
      <>
        <Label>{props.label}</Label>

        {!props.value ? (
          <Value>{props.placeholder}</Value>
        ) : (
          <Value>{props.value}</Value>
        )}
      </>
    ) : (
      props.label
    )

  return (
    <StyledDropdown ref={ref}>
      <Flex onClick={toggle}>{label}</Flex>

      <Body
        initial="hidden"
        position={props.position}
        variants={floatingBodyVariants}
        animate={open ? "visible" : "hidden"}
      >
        {list.map((name) => (
          <Item
            key={name}
            initial="hidden"
            variants={simpleVariants}
            active={props.value === name}
            onClick={() =>
              props.onChange ? props.onChange(props.name, name) : null
            }
          >
            {name}
          </Item>
        ))}

        {props.children}
      </Body>
    </StyledDropdown>
  )
}

export default Dropdown
