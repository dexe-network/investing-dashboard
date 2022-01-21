import React, { useState, useEffect, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Flex, Text } from "theme"
import { defaultTokensList } from "constants/index"
import { List } from "react-virtualized"

import TokenIcon from "components/TokenIcon"
import Search from "components/Search"
import { InputLabel } from "modals/CreateFund/styled"

import {} from "./styled"

const MIN_LIST_HEIGHT = 250

const TokenSelect: React.FC<{
  bodyRef?: any
}> = ({ bodyRef }) => {
  return <div></div>
}

export default TokenSelect
