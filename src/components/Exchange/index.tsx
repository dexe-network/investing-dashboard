// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"

import { Flex, Text } from "theme"
import ExchangeFrom from "components/Exchange/From"
import ExchangeDivider from "components/Exchange/Divider"
import ExchangeTo from "components/Exchange/To"
import Button from "components/Button"
import tooltip from "assets/icons/tooltip.svg"

import { Label, TooltipIcon, PriceText } from "components/Exchange/styled"

const Exchange: React.FC = () => {
  return (
    <div>
      {/* <ExchangeFrom baseToken="0x4fabb145d64652a948d72533023f6e7a623c7c53" />
      <ExchangeDivider />
      <ExchangeTo />

      <Flex full>
        <Label>Price</Label>
        <Flex p="13px 0 10px" ai="center">
          <PriceText color="#F7F7F7">1 ETH = 2704 DAI</PriceText>
          <PriceText color="#999999">(~2920$)</PriceText>
          <TooltipIcon src={tooltip} />
        </Flex>
      </Flex>

      <Button fz={22} full>
        Buy ISDX
      </Button> */}
    </div>
  )
}

export default Exchange
