import React, { useState, useRef } from "react"
import styled from "styled-components"
import { Flex } from "theme"
import search from "assets/icons/search.svg"
import remove from "assets/icons/remove.svg"
import { useFocus } from "hooks"
// import { motion } from "framer-motion"

export const Container = styled(Flex)<{ height: string; bg?: string }>`
  background: ${(props) =>
    !!props.bg
      ? props.bg
      : "linear-gradient(0deg,rgba(29, 33, 41, 0.7),rgba(29, 33, 41, 0.7))"};
  border-radius: 10px;
  padding: 0 10px;
  width: 100%;
  height: ${(props) => props.height || "30px"};
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
`

export const Input = styled.input`
  background: none;
  outline: none;
  border: none;

  flex: 1;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #c5d1dc;

  &::-webkit-input-placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;

    color: #5a6071;

    opacity: 0.5;
  }
  &:-moz-placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;

    color: #5a6071;

    opacity: 0.5;
  }
  &::-moz-placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;

    color: #5a6071;

    opacity: 0.5;
  }
  &:-ms-input-placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;

    color: #5a6071;

    opacity: 0.5;
  }
`

export const Icon = styled.img<{ top?: string }>`
  transform: translateY(${(props) => (props.top ? props.top : 0)});
`

interface Props {
  customBG?: string
  height: string
  placeholder: string
  value: string
  handleChange: (v: string) => void
}

const Search: React.FC<Props> = ({
  customBG,
  height,
  placeholder,
  handleChange,
  value,
}) => {
  const [ref, setFocus] = useFocus()
  return (
    <Container bg={customBG} height={height}>
      <Input
        value={value}
        ref={ref}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {!!value ? (
        <Icon top="-1px" onClick={() => handleChange("")} src={remove} />
      ) : (
        <Icon
          top="1px"
          src={search}
          onClick={() =>
            ref.current && ref.current?.focus && ref.current.focus()
          }
        />
      )}
    </Container>
  )
}

export default Search
