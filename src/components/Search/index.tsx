// import React, { useState, useRef } from "react"
import styled from "styled-components"
import { Flex } from "theme"
import search from "assets/icons/search.svg"
// import { motion } from "framer-motion"

export const Container = styled(Flex)<{ height: string }>`
  background: rgba(90, 96, 113, 0.15);
  box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 0 10px;
  width: 100%;
  height: ${(props) => props.height || "30px"};
`

export const Input = styled.input`
  background: none;
  outline: none;
  border: none;

  flex: 1;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #5a6071;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #5a6071;
  }
`

export const Icon = styled.img``

interface Props {
  height: string
  placeholder: string
}

const Search: React.FC<Props> = ({ height, placeholder }) => {
  return (
    <Container height={height}>
      <Input placeholder={placeholder} />
      <Icon src={search} />
    </Container>
  )
}

export default Search
