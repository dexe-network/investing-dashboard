// import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Token as IToken } from "constants/interfaces"

import Search from "components/Search"

import useContract from "hooks/useContract"
import { selectPriceFeedAddress } from "state/contracts/selectors"

import { PriceFeed } from "abi"

import Token from "./Token"

import { Card, CardHeader, TitleContainer, CardList } from "./styled"

interface Props {
  tokens: IToken[]
  query: string
  onSelect: (token: IToken) => void
  handleChange: (v: string) => void
}

const TokensList: React.FC<Props> = ({
  children,
  tokens,
  query,
  onSelect,
  handleChange,
}) => {
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  return (
    <Card>
      <CardHeader>
        <TitleContainer>{children}</TitleContainer>
        <Search
          placeholder="Name, ticker, address"
          value={query}
          handleChange={handleChange}
          height="38px"
        />
      </CardHeader>
      <CardList>
        {tokens.map((token) => (
          <Token
            priceFeed={priceFeed}
            onClick={onSelect}
            key={token.address}
            tokenData={token}
          />
        ))}
      </CardList>
    </Card>
  )
}

export default TokensList
