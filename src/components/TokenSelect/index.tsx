import React, { useState, useEffect, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Flex, Text } from "theme"
import { commonsTokensList, defaultTokensList } from "constants/index"
import { List } from "react-virtualized"

import TokenIcon from "components/TokenIcon"
import Search from "components/Search"
import { InputLabel } from "modals/CreateFund/styled"

import {
  Input,
  CommonsList,
  CommonItem,
  FullList,
  FullItem,
  Price,
  CommonContainer,
} from "./styled"

const MIN_LIST_HEIGHT = 250

const TokenSelect: React.FC<{ bodyRef?: any }> = ({ bodyRef }) => {
  const headRef = useRef<HTMLDivElement | null>(null)
  const [listHeight, setHeight] = useState(MIN_LIST_HEIGHT)

  // TODO: listen to resize
  useEffect(() => {
    if (!headRef.current) return

    if (listHeight === MIN_LIST_HEIGHT) {
      const h =
        window.innerHeight -
        headRef.current.getBoundingClientRect().height -
        270
      console.log(h)
      setHeight(h)
    }
  }, [headRef, listHeight])
  return (
    <>
      <Flex ref={headRef} dir="column" full>
        <Search placeholder="Name, Ticker, Address" height="40px" />
        <CommonContainer>
          <InputLabel>Common bases</InputLabel>
          <CommonsList onTouchMove={() => {}}>
            {commonsTokensList.map((item) => (
              <CommonItem
                onClick={() => console.log(item.address)}
                key={item.address}
              >
                <TokenIcon
                  src={`https://tokens.1inch.exchange/${item.address}.png`}
                  size={27}
                />
                <Text color="#CFCFCF" fz={16}>
                  {item.symbol}
                </Text>
              </CommonItem>
            ))}
          </CommonsList>
        </CommonContainer>
      </Flex>

      <Flex dir="column" ai="flex-start" full>
        <InputLabel>Your base token</InputLabel>
        <FullList
          animate={listHeight !== 0 ? "visible" : "hidden"}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: [0.29, 0.98, 0.29, 1],
          }}
          variants={{
            visible: { maxHeight: `${listHeight}px` },
            hidden: { maxHeight: `${MIN_LIST_HEIGHT}px` },
          }}
          initial="hidden"
          ref={bodyRef}
        >
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
      </Flex>
    </>
  )
}

export default TokenSelect
