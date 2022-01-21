import { useState, useRef, useEffect, useCallback, ElementType } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Text, Flex, BaseButton, device, ExternalLink } from "theme"
import { motion } from "framer-motion"
import RadioButton from "components/RadioButton"
import PoolTypeLine from "assets/icons/PoolTypeLine"
import { PoolTypes } from "constants/types"
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
import pencil from "assets/icons/pencil-edit.svg"
import { focusText } from "utils"

export const HintText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  width: 100%;
  line-height: 16px;

  /* icons */

  color: #5a6071;
`

export const ErrorText = styled(motion.div)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
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
  font-family: Gilroy-Bold;
  font-weight: 800;
  font-size: 22px;
  line-height: 41px;

  letter-spacing: 0.5px;

  color: #c5d1dc;
  white-space: normal;
  text-align: center;
  height: 52px;
  width: 100%;
  justify-content: center;
  flex: 1;
`

export const InputLabel = styled(motion.div)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  color: #5a6071;
`

export const Secondary = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
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
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #616a78;

  @media only screen and (${device.sm}) {
    font-size: 12px;
  }
`

const BaseContainer = styled(Flex)<{ width?: string }>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  min-height: 47px;
  margin-top: 15px;
  cursor: pointer;

  background: #20242d;
  /* 5 */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border-radius: 6px;
`

const LabelBase = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: #5a6071;
`

const Label = styled(LabelBase)`
  position: absolute;
  left: 16px;
  top: 18px;
  right: 0;
  max-width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;

  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;

  color: #5a6071;
`

const Input = styled(motion.input)`
  border-radius: 9px;
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  height: 47px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
  padding: 12px 0 0 15px;
  z-index: 2;
  position: relative;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 16px;
  line-height: 41px;
  color: #848a9a;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    transition: 0.2s all ease-in-out;
    transition-delay: 0.1s;

    color: #5a6071;
  }

  &:not(:focus)::placeholder {
    opacity: 0;
  }
  &:focus::placeholder {
    opacity: 1;
  }
`

export const AvatarWrapper = styled.div`
  width: 102px;
  height: 100px;
  position: relative;

  &:after {
    background: #282b31;
    width: 22px;
    height: 22px;
    border-radius: 50px;
    position: absolute;
    top: 5px;
    right: 14px;
    content: "+";
    color: rgb(139, 142, 145);
    font-family: Gilroy;
    font-weight: 600;
    font-size: 22px;
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

export const TextItalic = styled.span`
  color: #767676;
  font-size: 16px;
  font-style: italic;
`

export const InputButton = styled.span`
  font-family: Gilroy;
  font-style: italic;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  white-space: nowrap;
  color: #5a6071;
`

export const InputUI: React.FC<{
  name: string
  label: string
  defaultValue?: any
  onChange?: (name: string, value: string) => void
  onKeyDown?: (e: any) => void
  onFocus?: () => void
  onBlur?: () => void
  onPaste?: (e: any) => void
  icon?: React.ReactElement | boolean | undefined
  onClick?: () => void
  width?: string
  customPlaceholder?: string
  type?: string
}> = ({
  name,
  label,
  defaultValue,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  onPaste,
  type,
  icon,
  onClick,
  width,
  customPlaceholder,
}) => {
  const [active, setActive] = useState(!!defaultValue)

  const handleBlur = ({ target }) => {
    if (!onChange) return

    onChange(name, target.value)

    if (active && !target.value.length) {
      setActive(false)
    }
    onBlur && onBlur()
  }

  const handleFocus = () => {
    if (!onChange) return

    setActive(true)
    setTimeout(() => {
      onFocus && onFocus()
    }, 100)
  }

  return (
    <BaseContainer onClick={onClick} width={width}>
      <Input
        type={type || "text"}
        autoComplete="new-password"
        defaultValue={defaultValue}
        name={name}
        spellCheck={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        placeholder={customPlaceholder ? customPlaceholder : "XXXX"}
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
    </BaseContainer>
  )
}

const DropdownBody = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const DropdownCardButton = styled.p<{ isFirst?: boolean }>`
  padding-top: 0px;
  margin-top: 0;
  margin-bottom: 6px;
`

const DropdownLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  /* body text */

  color: #f7f7f7;

  opacity: 0.7;
`

const DropdownDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding-top: 4px;
  box-sizing: border-box;

  color: #848a9a;
  z-index: 10;
  position: relative;
`

const DropdownItem = styled(Flex)<{ shadow?: boolean }>`
  position: relative;
  width: 100%;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  box-shadow: ${(props) =>
    props.shadow
      ? "0px 4px 4px rgba(0, 0, 0, 0.08)"
      : "0px 4px 4px rgba(0, 0, 0, 0.01)"};
  border-radius: ${(props) => (props.shadow ? "0 10px 10px 0" : "10px")};
  margin: 8px 0;
  padding: 13px 15px 8px;

  &::before {
    content: "";
    position: absolute;
    opacity: ${(props) => (props.shadow ? "1" : "0")};
    width: 3px;
    top: 0;
    bottom: 0;
    left: 0px;
    background: linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px 0 0 10px;
  }
`

const DropdownContent = styled.div`
  flex: 1;
`

const DropdownText = styled.p`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  padding: 0 5px 0 0;
  max-width: 288px;
  margin: 0;
  /* icons */

  color: #5a6071;
`

export const MainText = styled(DropdownText)`
  padding: 0;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  // white-space: nowrap;
`

const LineWrapper = styled.div`
  position: absolute;
  right: 1px;
  bottom: -5px;
`

const SelectCustomIcon = styled.img`
  width: 40px;
  height: 40px;
`

export const SelectUI: React.FC<{
  handleSelect: (value: any) => void
  type: string
  showSelected?: boolean
}> = ({ handleSelect, type, showSelected }) => {
  if (showSelected) {
    return type === "basic" ? (
      <DropdownItem
        shadow={type === "basic" || showSelected}
        onClick={() => handleSelect("basic")}
      >
        <Flex p={showSelected ? "0 10px 0 0" : "0 17px"}>
          {showSelected ? (
            <SelectCustomIcon src={pencil} />
          ) : (
            <RadioButton
              selected={type}
              onChange={handleSelect}
              value="basic"
            />
          )}
        </Flex>
        <DropdownContent>
          <DropdownLabel>Standard</DropdownLabel>
          <DropdownDescription>
            <MainText>
              Trading on assets from the <Text color="#47BEF9">white list</Text>{" "}
              + Trading of non-whitelisted assets through the proposals
            </MainText>
            {!showSelected && (
              <DropdownCardButton isFirst>
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
            )}
          </DropdownDescription>
        </DropdownContent>
        <LineWrapper>
          <PoolTypeLine active={type === "basic"} />
        </LineWrapper>
      </DropdownItem>
    ) : (
      <DropdownItem
        shadow={type === "investment" || showSelected}
        onClick={() => handleSelect("investment")}
      >
        <Flex p={showSelected ? "0 10px 0 0" : "0 17px"}>
          {showSelected ? (
            <SelectCustomIcon src={pencil} />
          ) : (
            <RadioButton
              selected={type}
              onChange={handleSelect}
              value="investment"
            />
          )}
        </Flex>
        <DropdownContent>
          <DropdownLabel>Investment</DropdownLabel>
          <DropdownDescription>
            <MainText>Manage the assets on your own.</MainText>
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
        <LineWrapper>
          <PoolTypeLine active={type === "investment"} />
        </LineWrapper>
      </DropdownItem>
    )
  }

  return (
    <>
      <DropdownBody>
        <DropdownItem onClick={() => handleSelect("basic")}>
          <Flex p="0 17px">
            <RadioButton
              selected={type}
              onChange={handleSelect}
              value="basic"
            />
          </Flex>
          <DropdownContent>
            <DropdownLabel>Standard</DropdownLabel>
            <DropdownDescription>
              <MainText>
                Trading on assets from the{" "}
                <Text color="#47BEF9">white list</Text> + Trading of
                non-whitelisted assets through the proposals
              </MainText>
              <DropdownCardButton isFirst>
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
          <LineWrapper>
            <PoolTypeLine active={type === "basic"} />
          </LineWrapper>
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("investment")}>
          <Flex p="0 17px">
            <RadioButton
              selected={type}
              onChange={handleSelect}
              value="investment"
            />
          </Flex>
          <DropdownContent>
            <DropdownLabel>Investment</DropdownLabel>
            <DropdownDescription>
              <MainText>Manage the assets on your own.</MainText>
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
          <LineWrapper>
            <PoolTypeLine active={type === "investment"} />
          </LineWrapper>
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

export const TextArea = styled.textarea`
  resize: none;
  width: 434px;
  box-sizing: border-box;
  position: relative;
  border: none;
  transition: all 0.2s;
  background: transparent;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  // border-radius: 6px;
  padding: 0px 40px 0px 16px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.5px;
  color: #848a9a;
  height: 47px;

  &::placeholder {
    transition: all 0.2s;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #5a6071;
  }

  &:focus {
    outline: none;
    height: auto;
    height: 78px;

    &::placeholder {
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 0.5px;
      color: #5a6071;
    }
  }
`

export const MaxLength = styled(Text)`
  position: absolute;
  right: 10px;
  bottom: 6px;
  max-width: 50px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: rgba(115, 146, 198, 0.2);
  text-align: right;
`

export const Area = ({ name, onChange, placeholder, defaultValue }) => {
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(!!defaultValue)

  const handleChange = ({ target }) => {
    setDescription(target.value)
  }

  const handleBlur = ({ target }) => {
    onChange(name, target.value)
    if (target.value === "") {
      setActive(false)
    }
  }

  const left = 1000 - description.length
  return (
    <BaseContainer>
      <TextArea
        onFocus={() => setActive(true)}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Label
        initial="hidden"
        variants={{
          hidden: {
            y: -2,
            fontSize: "16px",
            transition: { delay: 0.2 },
          },
          visible: {
            y: -10,
            fontSize: "12px",
          },
        }}
        animate={active ? "visible" : "hidden"}
      >
        {placeholder}
      </Label>
      <MaxLength color={left >= 0 ? "#5A6071" : "#D73231"} fz={16}>
        {left} left
      </MaxLength>
    </BaseContainer>
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
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 41px;
  color: #9ae2cb;
`

export const PrevButton = styled(StepperBaseButton)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
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

const labelVariants = {
  hidden: {
    y: 2,
    fontSize: "16px",
    transition: { delay: 0.2 },
  },
  visible: {
    y: -14,
    fontSize: "12px",
  },
}

export const PerformanceCard = styled(Flex)<{ shadow?: boolean }>`
  position: relative;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  mix-blend-mode: normal;
  width: 100%;
  min-height: 75px;
  margin: 4px 0;

  box-shadow: ${(props) =>
    props.shadow
      ? "0px 4px 4px rgba(0, 0, 0, 0.08)"
      : "0px 4px 4px rgba(0, 0, 0, 0.01)"};
  border-radius: ${(props) => (props.shadow ? "0 10px 10px 0" : "10px")};

  &::before {
    content: "";
    position: absolute;
    opacity: ${(props) => (props.shadow ? "1" : "0")};
    width: 3px;
    top: 0;
    bottom: 0;
    left: 0px;
    background: linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px 0 0 10px;
  }
`

export const PerformanceContent = styled.div`
  flex: 1;
`

export const PerformanceTitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #c5d1dc;
`

export const PerformanceDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #5a6071;
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
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: -4px;
  margin-left: 3px;
  letter-spacing: 0.5px;
  white-space: normal;
  color: #5a6071;
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
          <NumberInput
            onClick={focusText}
            onChange={handleChange}
            value={debounce ? v : initial}
          />
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
  z-index: 100;
  position: relative;
`

export const CardsRow = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;

  & > div:nth-child(2) {
    margin-left: 22px;
  }
`

export const WhitelistTokensContainer = styled.div`
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  box-shadow: 0px -4px 5px rgba(0, 0, 0, 0.05);
  border-radius: 30px 30px 0px 0px;
  width: 100%;
  padding: 26px 0 150px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

export const BaseInput = styled.input`
  border-radius: 7px;
  appearance: none;
  border: none;
  background: linear-gradient(
    261deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(128, 128, 128, 0.5) 100%
  );
  height: 48px;
  width: 100%;
  outline: none;
  padding: 18px 14px 14px;
  transition: all 0.5s;
  color: #c2c3c4;

  &::placeholder {
    vertical-align: middle;
    line-height: 16px;
    font-size: 16px;
    color: #c2c3c4;
  }

  &:focus {
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
    -webkit-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
    -moz-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;

    &::placeholder {
      color: #999999;
    }
  }
`

export const BaseFullList = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  overflow-y: auto;
`

export const BaseFullItem = styled(Flex)<{ active?: boolean }>`
  user-select: none;
  cursor: pointer;
  height: 50px;
  min-height: 50px;
  padding: 10px 15px;
  justify-content: flex-start;
  border-radius: 5px;
  transition: all 0.3s;
  margin: 2px 0;
  background: ${(props) =>
    props.active
      ? "linear-gradient(89.66deg,rgba(254, 254, 255, 0.04) 0.07%,rgba(239, 247, 255, 0.05) 98.45%),#232731;"
      : "transparent"}

  &:hover {
    background: linear-gradient(
        89.66deg,
        rgba(254, 254, 255, 0.04) 0.07%,
        rgba(239, 247, 255, 0.05) 98.45%
      ),
      #232731;
  }
`

export const BaseTokenSymbol = styled(Text)`
  white-space: normal;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  /* or 24px */

  display: flex;
  align-items: center;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;

  /* White / 100% */

  color: #ffffff;
`

export const BaseTokenName = styled(Text)`
  white-space: normal;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 142%;
  /* or 17px */

  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;

  /* icons */

  color: #5a6071;
`

export const BasePrice = styled(Text)`
  white-space: normal;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;

  text-align: right;
  letter-spacing: 0.03em;
  color: #68d2b6;
`

export const BaseBalance = styled(Text)`
  white-space: normal;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 142%;
  /* identical to box height, or 20px */

  text-align: right;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;

  color: #ffffff;
`

export const BaseTitle = styled(Text)`
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #acb3b8;
  margin-bottom: 12px;
`

export const NoTokensPlaceholder = styled(Flex)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 37px;
`

export const HintTextCentered = styled(HintText)`
  text-align: center;
  margin: 30px 16px 0;
`

export const PopoverText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 144%;
  text-align: center;
  letter-spacing: 0.5px;
  color: #c5d1dc;
  white-space: normal;
`
