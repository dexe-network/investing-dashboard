import { useState, useRef, useEffect, useCallback, ElementType } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Text, Flex, BaseButton, device, ExternalLink } from "theme"
import { motion } from "framer-motion"
import RadioButton from "components/RadioButton"
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

export const HintText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  /* icons */

  color: #5a6071;
`

export const ErrorText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  /* identical to box height, or 16px */
  padding: 8px 0 8px 10px;
  color: #5a6071;
  position: relative;

  &:after {
    position: absolute;
    left: 0px;
    top: 13px;
    width: 4px;
    height: 4px;
    background: #5a6071;
    border-radius: 50px;
    content: "";
  }
`

export const Title = styled(Flex)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Bold";
font-weight: 700;;
  font-size: 22px;
  line-height: 41px;

  letter-spacing: 0.5px;

  color: #ffffff;
  white-space: normal;
  text-align: center;
  height: 52px;
  width: 100%;
  justify-content: center;
  flex: 1;
`

export const InputLabel = styled(motion.div)`
  margin-bottom: 7px;
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #acb3b8;
`

export const Secondary = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  white-space: normal;
  color: #878d9d;
`

export const Warn = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #616a78;

  @media only screen and (${device.sm}) {
    font-size: 12px;
  }
`

const Container = styled(Flex)<{ width?: string }>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  min-height: 61px;
  margin-top: 15px;
  cursor: pointer;

  background: #252932;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border-radius: 6px;

  @media only screen and (${device.sm}) {
    min-height: 51px;
  }
`

const LabelBase = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: #5a6071;
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
  box-sizing: border-box;
  padding: 15px 15px 0;
  z-index: 2;
  position: relative;
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 16px;
  line-height: 41px;
  color: #5a6071;

  &::placeholder {
    vertical-align: middle;
    font-family: Gilroy;
    font-style: normal;
    font-family: "Gilroy-Regular";
font-weight: 400;
    font-size: 16px;
    line-height: 41px;
    /* or 256% */

    display: flex;
    align-items: flex-end;

    /* icons */

    color: #5a6071;
  }

  @media only screen and (${device.sm}) {
    height: 51px;
  }
`

export const AvatarWrapper = styled.div`
  width: 82px;
  height: 100px;
  position: relative;

  &:after {
    background: #282b31;
    width: 18px;
    height: 18px;
    border-radius: 50px;
    position: absolute;
    bottom: 35px;
    right: 17px;
    content: "+";
    color: rgb(139, 142, 145);
    font-family: "Gilroy-Heavy";
font-weight: 800;;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
    box-sizing: border-box;
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
  font-family: Gilroy;
  font-style: italic;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  white-space: nowrap;
  color: #5a6071;
`

export const InputUI: React.FC<{
  name: string
  label: string
  onChange?: (name: string, value: string) => void
  onKeyDown?: (e: any) => void
  onPaste?: (e: any) => void
  icon?: React.ReactElement | boolean | undefined
  onClick?: () => void
  width?: string
  customPlaceholder?: string
}> = ({
  name,
  label,
  onChange,
  onKeyDown,
  onPaste,
  icon,
  onClick,
  width,
  customPlaceholder,
}) => {
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
    <Container onClick={onClick} width={width}>
      <Input
        spellCheck={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        placeholder={customPlaceholder ? customPlaceholder : "XXXX"}
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
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const DropdownCardButton = styled.p`
  padding-top: 12px;
`

const DropdownLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 16px;
  line-height: 35px;

  /* body text */

  color: #f7f7f7;

  opacity: 0.7;
`

const DropdownDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #848a9a;
  z-index: 10;
  position: relative;
`

const DropdownItem = styled(Flex)`
  position: relative;
  flex: 1;
  width: 100%;
  background: linear-gradient(64.44deg, #282b31 32.35%, #2f333b 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  margin: 8px 0;
  padding: 5px 15px 10px;
`

const DropdownContent = styled.div`
  flex: 1;
`

const DropdownText = styled.p`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding: 0;
  margin: 0;
  /* icons */

  color: #5a6071;
`

interface TypeCardProps {
  handleSelect?: (v: any) => void
  setValue?: (v: any) => void
  value?: any
}

export const StandardFundTypeCard: React.FC<TypeCardProps> = ({
  handleSelect = (v: any) => {},
  value = true,
  setValue = (v: any) => {},
}) => {
  return (
    <DropdownItem onClick={() => handleSelect("Standard")}>
      <Flex p="0 17px">
        <RadioButton selected={value} onChange={setValue} value="Standard" />
      </Flex>
      <DropdownContent>
        <DropdownLabel>Standard</DropdownLabel>
        <DropdownDescription>
          <DropdownText>
            Trading on assets from the <Text color="#47BEF9">white list</Text> +
            Trading of
          </DropdownText>
          <DropdownText>
            non-whitelisted assets through the proposals
          </DropdownText>
          <DropdownCardButton>
            <DropdownText>
              (low risk){" "}
              <ExternalLink
                onClick={(e) => e.stopPropagation()}
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </ExternalLink>
            </DropdownText>
          </DropdownCardButton>
        </DropdownDescription>
      </DropdownContent>
    </DropdownItem>
  )
}

export const RiskyFundTypeCard: React.FC<TypeCardProps> = ({
  handleSelect = (v: any) => {},
  value = true,
  setValue = (v: any) => {},
}) => {
  return (
    <DropdownItem onClick={() => handleSelect("Risky")}>
      <Flex p="0 17px">
        <RadioButton selected={value} onChange={setValue} value="Risky" />
      </Flex>
      <DropdownContent>
        <DropdownLabel>Risky</DropdownLabel>
        <DropdownDescription>
          <DropdownText>Trading of non-whitelisted assets.</DropdownText>
          <DropdownText>suspended for 20 days</DropdownText>
          <DropdownCardButton>
            <DropdownText>
              (High risk){" "}
              <ExternalLink
                onClick={(e) => e.stopPropagation()}
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </ExternalLink>
            </DropdownText>
          </DropdownCardButton>
        </DropdownDescription>
      </DropdownContent>
    </DropdownItem>
  )
}

export const SelectUI = ({ label }) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState("Standard")

  const handleSelect = (v) => {
    setActive(false)
    setValue(v)
  }
  return (
    <>
      <DropdownBody>
        <StandardFundTypeCard
          handleSelect={handleSelect}
          value={value}
          setValue={setValue}
        />
        <RiskyFundTypeCard
          handleSelect={handleSelect}
          value={value}
          setValue={setValue}
        />
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

export const TextArea = styled.textarea`
  resize: none;
  height: 78px;
  width: 434px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid transparent;
  transition: all 0.5s;
  background: #2f333b;
  border-radius: 6px;
  padding: 13px 16px;
  color: #549680;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-family: "Gilroy-Regular";
font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #5a6071;
  }

  &:focus {
    outline: none;
    color: #707070;
    border: 1px solid #2f2f2f;
  }
`

export const MaxLength = styled(Text)`
  position: absolute;
  right: 15px;
  bottom: 15px;
  max-width: 50px;
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
`

export const Area = ({ name, onChange }) => {
  const [description, setDescription] = useState("")

  const handleChange = ({ target }) => {
    setDescription(target.value)
  }

  const handleBlur = ({ target }) => {
    onChange(name, target.value)
  }

  const left = 1000 - description.length
  return (
    <Container>
      <TextArea
        placeholder="Fund strategy"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <MaxLength color={left >= 0 ? "#5A6071" : "#D73231"} fz={16}>
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

export const StepperBaseButton = styled(BaseButton)``

export const NextButton = styled(StepperBaseButton)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 41px;
  color: #9ae2cb;
`

export const PrevButton = styled(StepperBaseButton)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 41px;
  color: #9ae2cb;
`

export const DotsWrapper = styled(Flex)`
  max-width: 165px;
  min-width: 165px;
  position: relative;
  margin: 0 auto;
  justify-content: space-around;
`

const types = {
  CHECKED: "#F7F7F7",
  DEFAULT: "#8F90A0",
  ACTIVE: "#35FFD1",
  NEXT: "#4D9693",
}

const background = {
  CHECKED: "#889393",
  DEFAULT: "#636A77",
  ACTIVE: "#419389",
  NEXT: "#496876",
}

export type StepperDotTypes = "CHECKED" | "DEFAULT" | "ACTIVE" | "NEXT"

export const StepperDot = styled(Link)<{
  type?: StepperDotTypes
}>`
  width: 8px;
  height: 8px;
  background: ${(props) =>
    props.type ? background[props.type] : background.DEFAULT};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
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

export const PerformanceCard = styled(Flex)`
  background: linear-gradient(64.44deg, #282b31 32.35%, #2f333b 100%);
  mix-blend-mode: normal;
  width: 100%;
  min-height: 65px;
  margin: 4px 0;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
`

export const PerformanceContent = styled.div`
  flex: 1;
`

export const PerformanceTitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #f7f7f7;
`

export const PerformanceDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */

  color: #7a8085;
`

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
  font-family: "Gilroy-Bold";
font-weight: 700;;
  color: #f5f5f5;
  white-space: normal;
`

export const SliderLine = styled.div`
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
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 16px;
  line-height: 41px;
  color: #c2c3c4;
  position: relative;
`

const InputWrapper = styled(Flex)`
  position: relative;
  /* width: 55px; */
`

const InputSymbol = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #c2c3c4;
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
  padding: 20px 0;
`

export const CardsRow = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;

  & > div:nth-child(1) {
    margin-right: 22px;
  }
`
