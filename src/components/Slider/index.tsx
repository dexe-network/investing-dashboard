import { useState, useEffect } from "react"
import { Flex } from "theme"
import InputSlider from "rc-slider"
import useDebounce from "hooks/useDebounce"
import SliderStyle from "theme/SliderStyle"
import { focusText } from "utils"

import { SliderLine, Percent, InputWrapper, InputSymbol } from "./styled"

export const NumberInput = ({ value, onChange, onClick }) => (
  <InputWrapper>
    <Percent
      onClick={onClick}
      onChange={(v) => onChange(v.target.value)}
      type="number"
      value={value}
    />
    <InputSymbol>%</InputSymbol>
  </InputWrapper>
)

interface Props {
  name: string
  initial: number
  hideInput?: boolean
  debounce?: boolean
  limits: { min: number; max: number }
  onChange: (name: string, value: number) => void
}

const Slider: React.FC<Props> = ({
  name,
  initial,
  limits,
  hideInput = false,
  debounce = true,
  onChange,
}) => {
  const [v, setV] = useState(initial)
  const debounced = useDebounce(v, 250)
  const { min, max } = limits

  useEffect(() => {
    if (debounce) {
      onChange(name, debounced)
    }
  }, [debounced, onChange, name, debounce])

  const handleChange = (value) => {
    if (debounce) {
      setV(value)
      return
    }

    onChange(name, value)
  }

  return (
    <>
      <SliderStyle />
      <Flex full p="0 4px 10px 8px">
        <Flex full p="24px 0" ai="center">
          {min !== 0 && <SliderLine />}
          <InputSlider
            min={min}
            max={max}
            value={debounce ? v : initial}
            onChange={handleChange}
          />
          {max !== 100 && <SliderLine />}
        </Flex>
        {!hideInput && (
          <Flex p="0 0 0 20px">
            <NumberInput
              onClick={focusText}
              onChange={handleChange}
              value={debounce ? v : initial}
            />
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default Slider
