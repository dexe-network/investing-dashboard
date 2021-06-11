import React from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import "./style.css"

const Switch: React.FC<{
  isOn: boolean
  onChange: (name: string, value: boolean) => void
  name: string
  disabled?: boolean
}> = ({ isOn, onChange, name, disabled = false }) => {
  const paralelHandlers = () => onChange(name, !isOn)

  return (
    <>
      <input
        checked={isOn}
        disabled={disabled}
        onChange={paralelHandlers}
        name={name}
        className="react-switch-checkbox"
        id={name}
        type="checkbox"
      />
      <label
        style={{ opacity: disabled ? 0.5 : 1 }}
        className="react-switch-label"
        htmlFor={name}
      >
        <span className="react-switch-button" />
      </label>
    </>
  )
}

export default Switch
