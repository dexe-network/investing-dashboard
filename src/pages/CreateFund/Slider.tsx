import { useState, useEffect } from "react"
import styled from "styled-components"
import { Flex } from "theme"
import InputSlider from "rc-slider"
import useDebounce from "hooks/useDebounce"
import SliderStyle from "theme/SliderStyle"
import { focusText } from "utils"

const SliderLine = styled.div`
  width: 100%;
  background: #2f333b;
  border-radius: 2px;
  height: 4px;
  max-width: 20%;
  margin-right: -3px;
  margin-left: -3px;
`

const Percent = styled.input`
  background: transparent;
  -webkit-appearance: none;
  outline: none;
  border: none;
  border-radius: 0;
  width: 35px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 16px;
  line-height: 41px;
  color: #a4ebd4;
  position: relative;
`

const InputWrapper = styled(Flex)`
  position: relative;
`

const InputSymbol = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #a4ebd4;
`

const sliderPropsByPeriodType = {
  "0": {
    min: 20,
    max: 30,
    customMarks: {
      20: "20%",
      25: "25%",
      30: "30%",
    },
  },
  "1": {
    min: 20,
    max: 50,
    customMarks: {
      20: "20%",
      30: "30%",
      40: "40%",
      50: "50%",
    },
  },
  "2": {
    min: 20,
    max: 70,
    customMarks: {
      20: "20%",
      30: "30%",
      40: "40%",
      50: "50%",
      60: "60%",
      70: "70%",
    },
  },
}

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

const AllocateSlider: React.FC<{
  name: string
  initial: number
  hideInput?: boolean
  debounce?: boolean
  commissionPeriod: number
  onChange: (name: string, value: number) => void
}> = ({
  name,
  initial,
  onChange,
  commissionPeriod,
  hideInput = false,
  debounce = true,
}) => {
  const [v, setV] = useState(initial)
  const debounced = useDebounce(v, 250)
  const { customMarks, min, max } = sliderPropsByPeriodType[commissionPeriod]

  useEffect(() => {
    if (debounce) {
      onChange(name, debounced)
    }
  }, [debounced, onChange, name, debounce])

  const handleChange = (value) => {
    if (value in customMarks) {
      vibrate()
    }

    if (debounce) {
      setV(value)
      return
    }

    onChange(name, value)
  }

  const vibrate = () => {
    if (!window) {
      return
    }

    if (!window.navigator) {
      return
    }

    if (!window.navigator.vibrate) {
      return
    }
    window.navigator.vibrate(50)
  }

  return (
    <>
      <SliderStyle />
      <Flex full p="0 0 10px">
        <Flex full p="24px 0" ai="center">
          {min !== 0 && <SliderLine />}
          <InputSlider
            marks={customMarks}
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

export default AllocateSlider
