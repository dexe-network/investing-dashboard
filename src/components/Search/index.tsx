import { useState } from "react"
import styled from "styled-components"
import { device } from "theme"

import search from "assets/icons/search.svg"

import { CircleSpinner } from "react-spinners-kit"
import { useDebounce } from "react-use"

const StyledSearch = styled.div`
  position: relative;
  height: 37px;
  width: 225px;
  overflow: hidden;
  min-width: 40px;

  @media only screen and (${device.md}) {
    width: fit-content;
  }
`

const Input = styled.input`
  border-radius: 7px;
  appearance: none;
  border: none;
  background: #1a2122;
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 10px;
  padding-top: 5px;
  transition: all 0.5s;

  @media only screen and (${device.md}) {
    background: transparent;
    display: none;
  }

  &::placeholder {
    vertical-align: middle;
    line-height: 16px;
    font-size: 16px;
    color: #53575a;
  }

  &:focus {
    color: #707070;
    background: #000;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  right: 9px;
  top: 9px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const Search: React.FC<{
  onChange: (value: string, name: string) => void
}> = (props) => {
  const [val, setVal] = useState("")
  const [typing, setTyping] = useState(false)

  useDebounce(
    () => {
      props.onChange("query", val)
      setTyping(false)
    },
    800,
    [val]
  )

  return (
    <StyledSearch>
      <Input
        onChange={(e) => {
          setVal(e.target.value)
          setTyping(true)
        }}
        placeholder="Names, Ticker, Address"
      />
      <IconWrapper>
        {typing ? <CircleSpinner size={15} loading /> : <Icon src={search} />}
      </IconWrapper>
    </StyledSearch>
  )
}

export default Search
