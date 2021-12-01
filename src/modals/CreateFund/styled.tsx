import { useState, useRef, useEffect, useCallback, ElementType } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Text, Flex, BaseButton, device, ExternalLink } from "theme"
import { motion } from "framer-motion"
import { StageSpinner } from "react-spinners-kit"
import { List } from "react-virtualized"
import arrowDown from "assets/icons/angle-down.svg"

import angleDown from "assets/icons/angle-down.svg"
import { useClickAway } from "react-use"
import { ITokenBase } from "constants/interfaces"

import useTokensList from "hooks/useTokensList"
import useNetworkConfig from "hooks/useNetworkConfig"

import TokenIcon from "components/TokenIcon"

import InputSlider from "rc-slider"

import useDebounce from "hooks/useDebounce"

export const Title = styled(Flex)`
  font-size: 24px;
  font-weight: bold;
  color: #f5f5f5;
  white-space: normal;
  text-align: center;
  height: 52px;
  width: 100%;
  justify-content: center;
  flex: 1;
  /* margin-bottom: 15px; */
`

export const Secondary = styled(Text)`
  font-size: 14px;
  color: #f7f7f7;
  font-weight: 400;
  letter-spacing: 0.25px;
  white-space: normal;
  margin-top: 20px;

  @media only screen and (${device.sm}) {
    font-size: 14px;
  }
`

export const Warn = styled(Text)`
  font-size: 16px;
  color: #ff7f7fb9;
  white-space: normal;
  font-style: italic;
  padding-top: 4px;

  @media only screen and (${device.sm}) {
    font-size: 12px;
  }
`

const Container = styled(Flex)`
  position: relative;
  border: 1px solid #2f2f2f;
  width: 100%;
  min-height: 61px;
  transition: all 0.3s cubic-bezier(0.63, 0.08, 0.49, 0.84);
  border-radius: 10px;
  margin-top: 15px;
  background: #373b45;
  cursor: pointer;

  &:hover {
    background: #3e4250;
    border: 1px solid #3e4250;
  }

  @media only screen and (${device.sm}) {
    min-height: 51px;
  }
`

const LabelBase = styled(Text)`
  color: #999999;
  font-weight: 300;
  user-select: none;
  font-size: 18px;
`

const Label = styled(LabelBase)`
  position: absolute;
  left: 15px;
  top: 18px;
  right: 0;
  max-width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;
`

const Input = styled(motion.input)`
  border-radius: 9px;
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  height: 59px;
  width: 100%;
  outline: none;
  transition: all 0.5s;
  box-sizing: border-box;
  padding: 15px 15px 0;
  z-index: 2;
  position: relative;
  color: #549680;

  &::placeholder {
    vertical-align: middle;
    line-height: 16px;
    font-size: 16px;
    color: #53575a;
  }

  &:focus {
    color: #707070;
    /* border: 1px solid #2f2f2f; */
  }

  @media only screen and (${device.sm}) {
    height: 51px;
  }
`

export const BaseTokenWrapper = styled.div`
  height: 61px;
  width: 100%;
  position: relative;
`

const labelVariants = {
  visible: {
    fontSize: "16px",
    y: -10,
  },
  hidden: {
    fontSize: "18px",
    y: 0,
    transition: { delay: 0.4 },
  },
}

const inputVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

export const TextItalic = styled.span`
  color: #767676;
  font-size: 16px;
  font-style: italic;
`

export const InputButton = styled.span`
  color: #767676;
  font-size: 16px;
  font-style: italic;
  white-space: nowrap;
`

export const InputUI: React.FC<{
  name: string
  label: string
  onChange?: (name: string, value: string) => void
  onKeyDown?: (e: any) => void
  onPaste?: (e: any) => void
  icon?: React.ReactElement | boolean | undefined
  onClick?: () => void
}> = ({ name, label, onChange, onKeyDown, onPaste, icon, onClick }) => {
  const [active, setActive] = useState(false)

  const handleBlur = ({ target }) => {
    if (!onChange) return

    onChange(name, target.value)

    if (active && !target.value.length) {
      setActive(false)
    }
  }

  const handleFocus = () => {
    if (!onChange) return

    setActive(true)
  }

  return (
    <Container onClick={onClick}>
      <Input
        spellCheck={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        placeholder="XXX"
        initial="hidden"
        variants={inputVariants}
        animate={active ? "visible" : "hidden"}
        transition={{ duration: 0.1 }}
      />
      <Label
        initial="hidden"
        variants={labelVariants}
        animate={active ? "visible" : "hidden"}
      >
        {label}
      </Label>
      <Flex jc="center" ai="center" p="15px">
        {icon}
      </Flex>
    </Container>
  )
}

const DropdownBody = styled(Flex)`
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  /* position: absolute; */
  min-height: 235px;
  /* margin: auto; */
  /* top: 65px; */
  background: linear-gradient(
    90deg,
    rgba(71, 72, 82, 1) 0%,
    rgba(55, 59, 69, 1) 100%
  );
  /* left: 0px; */
  /* right: 0px; */
  width: 100%;
  z-index: 100;
  border-radius: 10px;
  -webkit-box-shadow: inset 0px 3px 6px 5px rgba(0, 0, 0, 0.16);
  box-shadow: inset 0px 3px 6px 5px rgba(0, 0, 0, 0.16);
`

const DropdownLabel = styled.div<{ active?: boolean }>`
  transition: all 0.5s ease-in-out;
  color: #ffffff;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? 800 : 500)};
  position: relative;
  z-index: 10;
`

const DropdownDescription = styled.div`
  font-size: 12px;
  color: #c2c3c4;
  z-index: 10;
  position: relative;
`

const DropdownItem = styled.div<{ active?: boolean }>`
  position: relative;
  flex: 1;
  width: 100%;
  padding: 15px 15px;
  border-bottom: 1px solid #312b46;

  &:nth-child(1) {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${(props) =>
        props.active &&
        "linear-gradient(101deg, rgba(57,95,78,1) 0%, rgba(76,57,95,1) 100%)"};

      filter: blur(2px);
      z-index: 5;
    }
  }
  &:nth-child(2) {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${(props) =>
        props.active &&
        "linear-gradient(101deg, rgba(135,53,71,1) 0%, rgba(76,57,95,1) 100%)"};
      filter: blur(2px);
      z-index: 5;
    }
  }
  &:nth-child(3) {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${(props) =>
        props.active &&
        "linear-gradient(101deg, rgba(55,77,133,1) 0%, rgba(76,57,95,1) 100%)"};

      filter: blur(2px);
      z-index: 5;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`

export const SelectUI = ({ label }) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState("")

  const handleSelect = (v) => {
    setActive(false)
    setValue(v)
  }
  return (
    <>
      {/* <Container onClick={() => setActive(!active)}>
        <div></div>
        <Label initial="hidden" animate="visible">
          {value || label}
        </Label>
        <Flex
          animate={
            active
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
          jc="center"
          ai="center"
          p="15px"
        >
          <img src={angleDown} alt="select" />
        </Flex>
      </Container> */}
      <DropdownBody>
        <DropdownItem
          active={value === "Standard"}
          onClick={() => handleSelect("Standard")}
        >
          <DropdownLabel active={value === "Standard"}>Standard</DropdownLabel>
          <DropdownDescription>
            <p>
              Trading on assets from the <Text color="#47BEF9">white list</Text>{" "}
              + Trading of
            </p>
            <p>non-whitelisted assets through the proposals (low risk)</p>
            <p>
              <ExternalLink
                onClick={(e) => e.stopPropagation()}
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </ExternalLink>
            </p>
          </DropdownDescription>
        </DropdownItem>
        <DropdownItem
          active={value === "Risky"}
          onClick={() => handleSelect("Risky")}
        >
          <DropdownLabel active={value === "Risky"}>Risky</DropdownLabel>
          <DropdownDescription>
            <p>Trading of non-whitelisted assets.</p>
            <p>suspended for 20 days</p>
            <p>
              (High risk){" "}
              <ExternalLink
                onClick={(e) => e.stopPropagation()}
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </ExternalLink>
            </p>
          </DropdownDescription>
        </DropdownItem>
        <DropdownItem
          active={value === "Investment"}
          onClick={() => handleSelect("Investment")}
        >
          <DropdownLabel active={value === "Investment"}>
            Investment
          </DropdownLabel>
          <DropdownDescription>
            <p>Manage the assets on your own</p>
            <p>
              (High risk){" "}
              <ExternalLink
                onClick={(e) => e.stopPropagation()}
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </ExternalLink>
            </p>
          </DropdownDescription>
        </DropdownItem>
      </DropdownBody>
    </>
  )
}

export const BaseTokenSelect = styled(Flex)`
  border-radius: 5px;
  border: 1px solid #2f2f2f;
  flex-direction: row;
  justify-content: space-between;
  background: linear-gradient(
    243deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
`

export const CommonBasesGroup = styled(Flex)`
  width: calc(100% - 127px);
  padding: 5px 25px 7px 45px;
  overflow-x: auto;
  justify-content: flex-start;
  position: relative;
`

export const TokenWrapper = styled.div`
  margin-right: 10px;
`

const TextArea = styled.textarea`
  resize: none;
  height: 78px;
  width: 434px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid transparent;
  transition: all 0.5s;
  border-radius: 9px;
  background: ${(props) => props.theme.bgPrimary};
  padding: 13px 16px;
  color: #549680;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    color: #707070;
    border: 1px solid #2f2f2f;
  }
`

const MaxLength = styled(Text)`
  position: absolute;
  right: 15px;
  bottom: 15px;
  max-width: 50px;
  font-style: italic;
`

export const Area = ({ name, onChange }) => {
  const [description, setDescription] = useState("")

  const handleChange = ({ target }) => {
    setDescription(target.value)
  }

  const handleBlur = ({ target }) => {
    onChange(name, target.value)
  }

  const left = 255 - description.length
  return (
    <Container>
      <TextArea
        placeholder="Description"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <MaxLength color={left >= 0 ? "#767676" : "#D73231"} fz={16}>
        {left} left
      </MaxLength>
    </Container>
  )
}

export const ButtonsCoontainer = styled(Flex)`
  padding: 15px 30px;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media screen and (${device.xs}) {
    padding: 0;
    justify-content: flex-end;
  }
`

export const StepperBaseButton = styled(BaseButton)`
  border-radius: 10px;
  padding: 19px 44px 16px;
  font-size: 14px;
  font-weight: bold;
`

export const NextButton = styled(StepperBaseButton)`
  background: #202020;
  width: 100%;
  color: #7fffd4;

  @media screen and (${device.xs}) {
    background: transparent;
    width: fit-content;
    padding: 17px 20px 17px 25px;
  }
`

export const PrevButton = styled(StepperBaseButton)`
  background: transparent;
  margin-right: 15px;
  padding: 17px 15px 17px 25px;
  color: #c2c3c4;
  font-weight: 300;

  @media screen and (${device.xs}) {
    padding: 17px 15px;
    margin-right: 0;
  }
`

export const DotsWrapper = styled(Flex)`
  max-width: 165px;
  min-width: 165px;
  position: relative;
  padding: 10px 0 0;
  margin: 0 auto;
  justify-content: space-evenly;

  &:after {
    content: "";
    background: #595b6c;
    height: 2px;
    position: absolute;
    left: 15px;
    right: 15px;
  }

  @media screen and (${device.xs}) {
    padding: 0;
    margin-left: 15px;
  }
`

const types = {
  CHECKED: "#F7F7F7",
  DEFAULT: "#8F90A0",
  ACTIVE: "#35FFD1",
  NEXT: "#4D9693",
}

const background = {
  CHECKED: "#889393",
  DEFAULT: "#626878",
  ACTIVE: "#419389",
  NEXT: "#496876",
}

export type StepperDotTypes = "CHECKED" | "DEFAULT" | "ACTIVE" | "NEXT"

export const StepperDot = styled(Link)<{
  type?: StepperDotTypes
}>`
  width: 15px;
  height: 15px;
  background: ${(props) =>
    props.type ? background[props.type] : background.DEFAULT};
  border-radius: 50px;
  border: 1px solid
    ${(props) => (props.type ? types[props.type] : types.DEFAULT)};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;

  box-shadow: ${(props) =>
    props.type && props.type === "ACTIVE"
      ? "0 0 6px rgba(127, 255, 212, 0.3)"
      : "none"};

  &:before {
    content: "";
    height: 5px;
    width: 5px;
    display: block;
    background: ${(props) => (props.type ? types[props.type] : types.DEFAULT)};
    border-radius: 50px;
  }
`

export const SliderContainer = styled.div``

export const SliderWrapper = styled.div`
  height: 449px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  @media screen and (${device.xs}) {
    height: 420px;
  }
`

export const SliderItem = styled(motion.div)`
  padding: 30px 30px 0;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  width: 100%;

  @media screen and (${device.xs}) {
    padding: 20px 15px;
  }
`

const slideVariants = {
  visible: {
    opacity: 1,
    display: "flex",
    transition: { delay: 0.3 },
  },
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

export const Slide = ({ item, active }) => {
  return (
    <SliderItem
      initial={active ? "visible" : "hidden"}
      animate={active ? "visible" : "hidden"}
      variants={slideVariants}
    >
      {item.children}
    </SliderItem>
  )
}

export const FormLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #f5f5f5;
  white-space: normal;
`

export const SliderLine = styled.div`
  width: 100%;
  background: rgba(32, 32, 32, 0.33);
  border-radius: 6px;
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
  width: 95px;
  border-bottom: 1px solid #676767;
  color: #dddddd;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
  position: relative;
`

const InputWrapper = styled.div`
  position: relative;
`

const InputSymbol = styled.span`
  position: absolute;
  right: 20px;
  top: 1px;
  color: #dddddd;
  font-size: 18px;
  font-weight: bold;
`

export const NumberInput = ({ value, onChange }) => (
  <InputWrapper>
    <Percent
      onChange={(v) => onChange(v.target.value)}
      type="number"
      value={value}
    />
    <InputSymbol>%</InputSymbol>
  </InputWrapper>
)

export const AllocateSlider: React.FC<{
  name: string
  initial: number
  hideInput?: boolean
  customMarks?: any
  debounce?: boolean
  onChange: (name: string, value: number) => void
  min?: number
  max?: number
}> = ({
  name,
  initial,
  onChange,
  hideInput = false,
  debounce = true,
  min = 30,
  max = 70,
  customMarks = {
    30: "30%",
    40: "40%",
    50: "50%",
    60: "60%",
    70: "70%",
  },
}) => {
  const [v, setV] = useState(initial)
  const debounced = useDebounce(v, 250)

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
          <NumberInput onChange={handleChange} value={debounce ? v : initial} />
        </Flex>
      )}
    </Flex>
  )
}

export const Arrow = styled.img`
  transform: rotate(90deg);
`

export const Footer = styled(Flex)`
  flex-direction: row;
  width: 100%;

  /* @media screen and (${device.xs}) {
    flex-direction: row;
  } */
`
