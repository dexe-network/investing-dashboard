import { useState, useRef, useEffect, useCallback, ElementType } from "react"
import styled from "styled-components"
import { Text, Flex, BaseButton } from "theme"
import { motion } from "framer-motion"
import { StageSpinner } from "react-spinners-kit"
import { List } from "react-virtualized"

import angleDown from "assets/icons/angle-down.svg"
import { useClickAway } from "react-use"
import { ITokenBase } from "constants/interfaces"

import useTokensList from "hooks/useTokensList"
import useNetworkConfig from "hooks/useNetworkConfig"

import TokenIcon from "components/TokenIcon"

import InputSlider from "rc-slider"

import useDebounce from "hooks/useDebounce"

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #f5f5f5;
`

export const Secondary = styled(Text)`
  font-size: 16px;
  color: #999999;
  white-space: normal;
`

const Container = styled(Flex)`
  position: relative;
  border: 1px solid #2f2f2f;
  width: 100%;
  min-height: 61px;
  transition: all 0.5s;
  border-radius: 10px;
  margin-top: 15px;
  background: ${(props) => props.theme.bgPrimary};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.bgPrimaryHovered};
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
    border: 1px solid #2f2f2f;
  }
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
  white-space: nowrap;
`

export const InputUI: React.FC<{
  name: string
  label: string
  onChange: (name: string, value: string) => void
  onKeyDown?: (e: any) => void
  onPaste?: (e: any) => void
  icon?: React.ReactElement | boolean
}> = ({ name, label, onChange, onKeyDown, onPaste, icon }) => {
  const [active, setActive] = useState(false)

  const handleBlur = ({ target }) => {
    onChange(name, target.value)

    if (active && !target.value.length) {
      setActive(false)
    }
  }

  return (
    <Container>
      <Input
        spellCheck={false}
        onBlur={handleBlur}
        onFocus={() => setActive(true)}
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

const Icon = styled(motion.img)<{ rotate: string }>`
  transition: all 0.2s ease-in-out;
  transform: rotate(${(props) => props?.rotate || "0deg"});
`

const DropdownContainer = styled(motion.div)`
  height: 0px;
  z-index: 5;
  position: relative;
`

const DropdownBody = styled.div`
  height: 193px;
  width: 434px;
  border-radius: 10px;
  background: ${(props) => props.theme.bgPrimary};
  position: absolute;
  top: 10px;
  overflow: auto;
  border: 1px solid #2f2f2f;
`

const dropdownVariants = {
  visible: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  hidden: {
    opacity: 0,
    y: -4,
    transitionEnd: {
      display: "none",
    },
  },
}

const DropdownToken = styled(Flex)`
  height: 44px;
  width: 100%;
  background: ${(props) => props.theme.bgPrimary};
  transition: background 0.2s ease-in-out;
  border-radius: 10px;
  padding: 8px 9px;
  cursor: pointer;

  &:hover {
    background: #2b2a3c;
  }
`

const TokenSymbol = styled(Flex)`
  color: #f5f5f5;
  font-size: 14px;
  text-transform: uppercase;
  margin-right: 10px;
`

const TokenName = styled(Text)`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  color: #999999;
`

const DropdownSearch = styled.input`
  color: #999999;
  font-weight: 300;
  user-select: none;
  font-size: 18px;
  outline: none;
  background: transparent;
  border: none;
`

const IconLink = styled.a`
  height: 45px;
  width: 55px;
`

const DropdownWrapper = styled.div`
  width: 100%;
`

const Search: React.FC<{ onChange: (event: any) => void }> = ({ onChange }) => {
  const [q, setQuery] = useState("")
  const debounced = useDebounce(q, 25)

  const handleSearch = ({ target }) => {
    setQuery(target.value)
  }

  useEffect(() => {
    onChange(debounced)
  }, [onChange, debounced])

  return (
    <DropdownSearch
      onClick={(e) => e.stopPropagation()}
      placeholder="Search symbol"
      onChange={handleSearch}
    />
  )
}

export const DropdownUI: React.FC<{
  active: string
  onSelect: (name: string, address: string) => void
  name: string
}> = ({ active, onSelect, name }) => {
  const [list, tokens] = useTokensList()
  const config = useNetworkConfig()
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filteredList, setList] = useState<ITokenBase[]>([])
  const memoSetList = useCallback((v) => {
    setList(v)
  }, [])

  const memoSetQuery = useCallback((v) => {
    setQuery(v)
  }, [])

  useEffect(() => {
    if (!list.length) return
    memoSetList(list)
  }, [list, memoSetList])

  useEffect(() => {
    if (!query.length) {
      memoSetList(list)
    } else {
      const queryLowered = query.toLowerCase()
      const res = list.filter((token) =>
        token.name.toLowerCase().includes(queryLowered)
      )
      memoSetList(res)
    }
  }, [query, memoSetList, list])

  useClickAway(ref, () => {
    if (open) {
      setOpen(false)

      if (query.length) {
        setQuery("")
      }
    }
  })

  const handleClick = () => {
    setOpen(!open)
  }

  const handleTokenClick = (address) => {
    setOpen(false)
    onSelect(name, address)
  }

  const render = ({ index, style }) => {
    const token = filteredList[index]

    return (
      <DropdownToken
        onClick={() => handleTokenClick(token.address)}
        jc="flex-start"
        key={token.address}
        style={style}
      >
        <TokenIcon src={token.logoURI || ""} />
        <TokenSymbol>{token.symbol}</TokenSymbol>
        <TokenName>({token.name})</TokenName>
      </DropdownToken>
    )
  }

  const isSelected = active !== "" && active in tokens

  const leftSide = isSelected ? (
    <Flex dir="column" jc="flex-start" ai="flex-start">
      <TokenName>{tokens[active].name}</TokenName>
      <TokenSymbol>{tokens[active].symbol}</TokenSymbol>
    </Flex>
  ) : (
    <LabelBase>Select major asset</LabelBase>
  )

  return (
    <DropdownWrapper ref={ref}>
      <Container onClick={handleClick}>
        <Flex full p="0 15px" ai="center">
          <Flex>{open ? <Search onChange={memoSetQuery} /> : leftSide}</Flex>
          <Flex p="0 13px 0 0">
            {list?.length === 0 ? (
              <StageSpinner size={20} loading color="#549680" />
            ) : (
              <Flex>
                {isSelected && (
                  <IconLink
                    href={`${config.url}/token/${tokens[active].address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TokenIcon size={45} src={tokens[active].logoURI} />
                  </IconLink>
                )}
                <Icon rotate={open ? "180deg" : "0deg"} src={angleDown} />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Container>
      <DropdownContainer
        variants={dropdownVariants}
        animate={open ? "visible" : "hidden"}
        initial="hidden"
      >
        <DropdownBody>
          {filteredList.length ? (
            <List
              overscanRowCount={1000}
              overscanIndicesGetter={({
                cellCount,
                overscanCellsCount,
                startIndex,
                stopIndex,
              }) => ({
                overscanStartIndex: Math.max(
                  0,
                  startIndex - overscanCellsCount
                ),
                overscanStopIndex: Math.min(
                  cellCount - 1,
                  stopIndex + overscanCellsCount
                ),
              })}
              height={191}
              rowCount={filteredList.length}
              rowHeight={44}
              rowRenderer={render}
              width={432}
            />
          ) : null}
        </DropdownBody>
      </DropdownContainer>
    </DropdownWrapper>
  )
}

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
`

export const PrevButton = styled(StepperBaseButton)`
  border: 1px solid #767676;
  background: transparent;
  margin-right: 15px;
`

export const DotsWrapper = styled(Flex)`
  max-width: 165px;
  min-width: 165px;
  position: relative;

  &:after {
    content: "";
    background: #595b6c;
    height: 2px;
    position: absolute;
    left: 15px;
    right: 15px;
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

export const StepperDot = styled.div<{
  type?: "CHECKED" | "DEFAULT" | "ACTIVE" | "NEXT"
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
`

export const SliderItem = styled(motion.div)`
  padding: 30px 30px 0;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  width: 100%;
`

const slideVariants = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    display: "flex",
    transition: { delay: 0.3 },
  },
  hidden: {
    opacity: 0,
    x: -5,
    y: -3,
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
  outline: none;
  border: none;
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
  onChange: (name: string, value: number) => void
}> = ({ name, initial, onChange }) => {
  const [v, setV] = useState(initial)
  const debounced = useDebounce(v, 550)

  useEffect(() => {
    onChange(name, debounced)
  }, [debounced, onChange, name])

  return (
    <Flex full p="0 0 10px">
      <Flex full p="24px 0" ai="center">
        <SliderLine />
        <InputSlider
          marks={{
            30: "30%",
            40: "40%",
            50: "50%",
            60: "60%",
            70: "70%",
          }}
          min={30}
          max={70}
          value={v}
          onChange={(value) => setV(value)}
        />
        <SliderLine />
      </Flex>
      <Flex>
        <NumberInput onChange={setV} value={v} />
      </Flex>
    </Flex>
  )
}

export const Arrow = styled.img`
  transform: rotate(90deg);
`
