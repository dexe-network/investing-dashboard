// import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Token as IToken } from "constants/interfaces"

import Search from "components/Search"

import useContract from "hooks/useContract"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { BigNumber } from "ethers"
import { PriceFeed } from "abi"

import Token from "./Token"

import { Card, CardHeader, CardList } from "./styled"

interface Props {
  tokens: IToken[]
  query: string
  balances?: { [address: string]: BigNumber }
  onSelect: (token: IToken) => void
  handleChange: (v: string) => void
}

const TokensList: React.FC<Props> = ({
  tokens,
  query,
  balances,
  onSelect,
  handleChange,
}) => {
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const withBalance = balances === undefined || !Object.keys(balances).length

  const sortedTokens = [...tokens].sort((a, b) => {
    if (balances === undefined) return 0

    if (b.address in balances) return 1

    return -1
  })

  const getBalance = (address: string) => {
    if (withBalance) return BigNumber.from("0")

    if (address in balances) {
      return balances[address]
    }

    return BigNumber.from("0")
  }

  return (
    <Card>
      <CardHeader>
        <Search
          placeholder="Name, ticker, address"
          value={query}
          handleChange={handleChange}
          height="38px"
        />
      </CardHeader>
      <CardList>
        {sortedTokens.map((token) => {
          return (
            <Token
              balance={getBalance(token.address)}
              priceFeed={priceFeed}
              onClick={onSelect}
              key={token.address}
              tokenData={token}
            />
          )
        })}
      </CardList>
    </Card>
  )
}

export default TokensList
