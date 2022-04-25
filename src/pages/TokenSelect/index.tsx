import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import IconButton from "components/IconButton"
import TokensList from "components/TokensList"
import Header, { EHeaderTitles } from "components/Header"

import { selectWhitelist } from "state/pricefeed/selectors"
import { Token } from "constants/interfaces"

import back from "assets/icons/angle-left.svg"

import { Title } from "./styled"

const TokenSelect: React.FC = () => {
  const navigate = useNavigate()
  const { type, poolAddress } = useParams()
  const [q, setQuery] = useState("")
  const whitelisted = useSelector(selectWhitelist)

  const onSelect = (token: Token) => {
    const rootPath = `/pool/swap/${type}`

    navigate(`${rootPath}/${poolAddress}/${token.address}`)
  }

  return (
    <>
      <Header title={EHeaderTitles.myTraderProfile} />
      <TokensList
        handleChange={setQuery}
        tokens={whitelisted}
        onSelect={onSelect}
        query={q}
      >
        <IconButton media={back} onClick={() => {}} />
        <Title>Select token</Title>
      </TokensList>

      {/* <Container
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
      </Container> */}
    </>
  )
}

export default TokenSelect
