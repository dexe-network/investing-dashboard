import { useRef, useState } from "react"
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

const TextArea = ({ name, onChange, placeholder, defaultValue }) => {
  const [description, setDescription] = useState("")
  const [isLabelActive, setLabelActive] = useState(!!defaultValue)

  const areaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleChange = ({ target }) => {
    setDescription(target.value)
  }

  const handleBlur = ({ target }) => {
    onChange(name, target.value)

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

  const left = 1000 - description.length
  return (
    <Container>
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
      <Label
        onClick={onClick}
        initial={isLabelActive ? "active" : "default"}
        animate={isLabelActive ? "active" : "default"}
        variants={labelVariants}
      >
        {placeholder}
      </Label>
      <MaxLength color={left >= 0 ? "#5A6071" : "#D73231"} fz={16}>
        {left} left
      </MaxLength>
    </Container>
  )
}

export default TextArea
