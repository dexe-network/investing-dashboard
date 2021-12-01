import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Flex, Text } from "theme"
import { commonsTokensList } from "constants/index"
import { List } from "react-virtualized"

import TokenIcon from "components/TokenIcon"

import {
  Input,
  CommonsList,
  CommonItem,
  FullList,
  FullItem,
  Price,
  Title,
  CommonContainer,
} from "./styled"

const defaultTokensList = [
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2500,
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  },
  {
    symbol: "SBNB",
    name: "Synth BNB",
    price: 300,
    address: "0x617aecb6137b5108d1e7d4918e3725c8cebdb848",
  },
  {
    symbol: "BUSD",
    name: "B-USD token",
    price: 1,
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
  },
  {
    symbol: "USDT",
    name: "Tether",
    price: 1,
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    symbol: "IBTC",
    name: "BITCOIN",
    price: 32493,
    address: "0xd6014ea05bde904448b743833ddf07c3c7837481",
  },
  {
    symbol: "DAI",
    name: "DAI",
    price: 253,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  {
    symbol: "WETH",
    name: "WETH",
    price: 281,
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  {
    symbol: "MASK",
    name: "MASK",
    price: 0,
    address: "0x69af81e73a73b40adf4f3d4223cd9b1ece623074",
  },
  {
    symbol: "1INCH",
    name: "1INCH",
    price: 0,
    address: "0x111111111117dc0aa78b770fa6a738034120c302",
  },
  {
    symbol: "FTM",
    name: "FTM",
    price: 0,
    address: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
  },
  {
    symbol: "LINK",
    name: "LINK",
    price: 0,
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
  },
]

const TokenSelect: React.FC<{ bodyRef?: any }> = ({ bodyRef }) => {
  return (
    <>
      <Input placeholder="Search name or address" />

      <CommonContainer>
        <Title>Common bases</Title>
        <CommonsList onTouchMove={() => {}}>
          {commonsTokensList.map((item) => (
            <CommonItem
              onClick={() => console.log(item.address)}
              key={item.address}
            >
              <TokenIcon
                src={`https://tokens.1inch.exchange/${item.address}.png`}
                size={28}
              />
              <Text color="#F7F7F7" fz={16}>
                {item.symbol}
              </Text>
            </CommonItem>
          ))}
        </CommonsList>
      </CommonContainer>

      <FullList ref={bodyRef}>
        {defaultTokensList.map((token) => (
          <FullItem
            key={token.address}
            onClick={() => console.log(token.address)}
            full
          >
            <TokenIcon
              src={`https://tokens.1inch.exchange/${token.address}.png`}
              size={28}
            />
            <Flex dir="column" ai="flex-start" p="3px 0 0">
              <Text color="#F7F7F7" fz={16}>
                {token.symbol}
              </Text>
              <Text color="#999999" fz={14}>
                {token.name}
              </Text>
            </Flex>
            <Price>{token.price}</Price>
          </FullItem>
        ))}
      </FullList>
    </>
  )
}

export default TokenSelect
