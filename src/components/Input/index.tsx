import { FC, ReactNode, useState, useRef } from "react"

import { Container, Label, InputField, LimitText } from "./styled"

const labelVariants = {
  active: {
    left: "10px",
    top: "-13px",
    background: "#08121a",
  },
  default: {
    left: "10px",
    top: "14px",
    background: "transparent",
  },
}

const inputVariants = {
  active: {
    transitionEnd: {
      opacity: 1,
    },
  },
  default: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
}

interface Props {
  label: string
  placeholder?: string
  disabled?: boolean
  value: string | null | undefined
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  limit?: number
  onClick?: () => void
  onChange?: (value: string) => void
}

const Input: FC<Props> = ({
  label,
  placeholder,
  value,
  disabled,
  leftIcon,
  rightIcon,
  limit,
  onClick,
  onChange,
}) => {
  const fieldRef = useRef<HTMLInputElement | null>(null)

  const [isLabelActive, setLabelActive] = useState(!!value)
  const [valueLength, setValueLength] = useState(value ? value.length : 0)

  const handleClick = () => {
    if (onClick) onClick()

    if (!isLabelActive) {
      setLabelActive(true)
      fieldRef?.current?.focus()
    }
  }

  const onBlur = () => {
    if (!fieldRef?.current?.value) {
      setLabelActive(false)
    }
  }

  const handleChange = (e) => {
    if (!!onChange) {
      onChange(e.target.value)
    }

    if (!!limit) {
      setValueLength(e.target.value.length)
    }
  }

  return (
    <Container onClick={handleClick}>
      <Label
        onClick={handleClick}
        initial={isLabelActive ? "active" : "default"}
        animate={isLabelActive ? "active" : "default"}
        variants={labelVariants}
      >
        {label}
      </Label>

      {leftIcon}

      <InputField
        disabled={disabled}
        defaultValue={value || ""}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        initial={isLabelActive ? "active" : "default"}
        animate={isLabelActive ? "active" : "default"}
        variants={inputVariants}
        onBlur={onBlur}
        ref={fieldRef}
        placeholder={placeholder}
      />

      {rightIcon}

      {!!limit && (
        <LimitText>
          {valueLength}/{limit}
        </LimitText>
      )}
    </Container>
  )
}

export default Input
