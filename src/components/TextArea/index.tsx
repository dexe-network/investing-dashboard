import { FC, useRef, useState } from "react"
import { Container, Area, Label, MaxLength } from "./styled"

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

const areaVariants = {
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
  name: string
  limit?: number
  theme?: "grey" | "black"
  placeholder?: string
  defaultValue: string
  onChange: (name: string, value: string) => void
}

const TextArea: FC<Props> = ({
  name,
  limit,
  placeholder,
  defaultValue,
  theme = "black",
  onChange,
}) => {
  const [isLabelActive, setLabelActive] = useState(
    !placeholder || !!defaultValue
  )

  const areaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleChange = ({ target }) => {
    onChange(name, target.value)
  }

  const handleBlur = ({ target }) => {
    if (target.value === "") {
      setLabelActive(false)
    }
  }

  const onClick = () => {
    if (!isLabelActive) {
      setLabelActive(true)
      areaRef?.current?.focus()
    }
  }

  const left = (limit || 1000) - defaultValue.length
  return (
    <Container theme={theme}>
      <Area
        ref={areaRef}
        variants={areaVariants}
        initial={isLabelActive ? "active" : "default"}
        animate={isLabelActive ? "active" : "default"}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onFocus={() => setLabelActive(true)}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {!!placeholder && (
        <Label
          onClick={onClick}
          initial={isLabelActive ? "active" : "default"}
          animate={isLabelActive ? "active" : "default"}
          variants={labelVariants}
        >
          {placeholder}
        </Label>
      )}
      {!!limit && (
        <MaxLength color={left >= 0 ? "#5A6071" : "#D73231"} fz={16}>
          {left} left
        </MaxLength>
      )}
    </Container>
  )
}

export default TextArea
