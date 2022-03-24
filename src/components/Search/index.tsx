import React, { useState, useRef } from "react"
import styled from "styled-components"
import { Flex, GradientBorder, GradientBorderLight } from "theme"
import search from "assets/icons/search.svg"
import remove from "assets/icons/remove.svg"
import { useFocus } from "hooks"
// import { motion } from "framer-motion"

export const Container = styled(GradientBorder)<{ height: string }>`
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
  border-radius: 32px;
  padding: 0 20px 0 14px;
  width: 100%;
  height: ${(props) => props.height || "30px"};
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
  align-items: center;
`

export const Input = styled.input`
  background: none;
  outline: none;
  border: none;

  flex: 1;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #c5d1dc;
  padding-top: 5px;
  padding-left: 5px;

  &::-webkit-input-placeholder {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #666f87;
  }
  &:-moz-placeholder {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #666f87;
  }
  &::-moz-placeholder {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #666f87;
  }
  &:-ms-input-placeholder {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #666f87;
  }
`

export const Icon = styled.img<{ top?: string }>`
  transform: translateY(${(props) => (props.top ? props.top : 0)});
`

interface Props {
  height: string
  placeholder: string
  value: string
  handleChange: (v: string) => void
}

const Search: React.FC<Props> = ({
  height,
  placeholder,
  handleChange,
  value,
}) => {
  const ref = useRef<any>(null)
  const [isFocused, setFocused] = useState(false)
  return (
    <Container height={height} focused={isFocused}>
      <Icon
        top="1px"
        src={search}
        onClick={() => ref.current && ref.current?.focus && ref.current.focus()}
      />
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        ref={ref}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {!!value && (
        <Icon top="-1px" onClick={() => handleChange("")} src={remove} />
      )}
    </Container>
  )
}

export default Search
