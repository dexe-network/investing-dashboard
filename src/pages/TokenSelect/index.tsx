import React, { useCallback, useEffect, useState } from "react"
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
  const { type, poolAddress, field, address } = useParams()
  const [q, setQuery] = useState("")
  const [balances, setBalances] = useState({})
  const whitelisted = useSelector(selectWhitelist)
  const traderPool = useContract(poolAddress, TraderPool)

  const onSelect = useCallback(
    (token: Token) => {
      const rootPath = `/pool/swap/${type}/${poolAddress}`

      if (field === "from") {
        navigate(`${rootPath}/${token.address}/${address}`)
      }

      if (field === "to") {
        navigate(`${rootPath}/${address}/${token.address}`)
      }
    },
    [navigate, poolAddress, type, field, address]
  )

  useEffect(() => {
    if (!traderPool) return

    const fetchBalances = async () => {
      const info = await traderPool?.getPoolInfo()
      const balance = {}

      console.log(info)
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
