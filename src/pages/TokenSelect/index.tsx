import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import Search from "components/Search"
import IconButton from "components/IconButton"

import { selectWhitelist } from "state/pricefeed/selectors"

import back from "assets/icons/angle-left.svg"

import {
  Container,
  Card,
  CardHeader,
  Title,
  TitleContainer,
  CardList,
  TokenItem,
} from "./styled"
import { useNavigate, useParams } from "react-router-dom"
import Header, { EHeaderTitles } from "components/Header"

const TokenSelect: React.FC = () => {
  const navigate = useNavigate()
  const { type, poolAddress } = useParams()
  const [q, setQuery] = useState("")
  const whitelisted = useSelector(selectWhitelist)

  const onSelect = (tokenAddress) => {
    const rootPath = `/pool/swap/${type}`

    navigate(`${rootPath}/${poolAddress}/${tokenAddress}`)
  }

  return (
    <>
      <Header title={EHeaderTitles.myTraderProfile} />
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card>
          <CardHeader>
            <TitleContainer>
              <IconButton media={back} onClick={() => {}} />
              <Title>Select token</Title>
            </TitleContainer>
            <Search
              placeholder="Name, ticker, address"
              value={q}
              handleChange={setQuery}
              height="38px"
            />
          </CardHeader>
          <CardList>
            {whitelisted.map((token) => (
              <TokenItem
                onClick={onSelect}
                key={token.address}
                tokenData={token}
              />
            ))}
          </CardList>
        </Card>
      </Container>
    </>
  )
}

export default TokenSelect
