// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"

import { ReactElement } from "react"
import { Container, Input, Checkmark } from "./styled"

interface IProps {
  name: string
  label?: ReactElement
  checked?: boolean
  onChange: (res: boolean) => void
}

const Checkbox: React.FC<IProps> = ({ name, label, checked, onChange }) => {
  return (
    <Container htmlFor={name}>
      <Input
        id={name}
        name={name}
        type="checkbox"
        defaultChecked={checked}
        onChange={() => onChange(!checked)}
      />
      <Checkmark />
      {!!label && label}
    </Container>
  )
}

export default Checkbox
