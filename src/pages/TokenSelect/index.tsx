import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { TraderPool } from "abi"

import IconButton from "components/IconButton"
import TokensList from "components/TokensList"
import Header, { EHeaderTitles } from "components/Header"

import { selectWhitelist } from "state/pricefeed/selectors"
import { Token } from "constants/interfaces"
import useContract from "hooks/useContract"

import back from "assets/icons/angle-left.svg"

import { Title, Container, TitleContainer, CardHeader, Card } from "./styled"

const TokenSelect: React.FC = () => {
  const navigate = useNavigate()
  const { type, poolAddress } = useParams()
  const [q, setQuery] = useState("")
  const [balances, setBalances] = useState({})
  const whitelisted = useSelector(selectWhitelist)
  const traderPool = useContract(poolAddress, TraderPool)

  const onSelect = (token: Token) => {
    // if (
    //   type === "BASIC_POOL" &&
    //   token.address === "0x8babbb98678facc7342735486c851abd7a0d17ca"
    // ) {
    //   navigate(`/create-risky-proposal/${poolAddress}/${token.address}/1`)
    //   return
    // }

    const rootPath = `/pool/swap/${type}`

    navigate(`${rootPath}/${poolAddress}/${token.address}`)
  }

  useEffect(() => {
    if (!traderPool) return

    const fetchBalances = async () => {
      const info = await traderPool?.getPoolInfo()
      const balance = {}

      info.openPositions.map((address: string, index) => {
        balance[address.toLocaleLowerCase()] =
          info.baseAndPositionBalances[index + 1]
      })

      setBalances(balance)
    }

    fetchBalances().catch(console.error)
  }, [traderPool])

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
              <IconButton media={back} onClick={() => navigate(-1)} />
              <Title>Select token</Title>
            </TitleContainer>
          </CardHeader>
          <TokensList
            balances={balances}
            handleChange={setQuery}
            tokens={whitelisted}
            onSelect={onSelect}
            query={q}
          />
        </Card>
      </Container>
    </>
  )
}

export default TokenSelect
