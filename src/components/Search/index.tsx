// import React, { useState, useRef } from "react"
import styled from "styled-components"
// import { motion } from "framer-motion"

import search from "assets/icons/search.svg"

const StyledSearch = styled.div`
  position: relative;
  height: 37px;
  width: 225px;
  overflow: hidden;
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

const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 9px;
  top: 9px;
`

const Search: React.FC = () => {
  return (
    <StyledSearch>
      <Input placeholder="Names, Ticker, Address" />
      <Icon src={search} />
    </StyledSearch>
  )
}

export default Search
