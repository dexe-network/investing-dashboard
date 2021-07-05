import { useContext } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { ethers } from "ethers"

import { Flex, Text } from "theme"
import {
  Container,
  Price,
  Balance,
  Max,
  Input,
  TokenIcon,
  ActiveSymbol,
  SymbolLabel,
} from "./styled"
import { fromBig } from "utils"
import { BigNumber } from "@ethersproject/bignumber"

const ExchangeTo: React.FC<{
  context: any
  openSelector: () => void
  amount: BigNumber
}> = ({ context, openSelector, amount }) => {
  const { state, setTo } = useContext(context)

  return (
    <Container dir="column" full>
      <Flex p="0 0 5px" full>
        <Price>≈$0</Price>
        <Balance>
          <Text color="#F7F7F7">
            {fromBig(state.to.balance, state.to.decimals)}
          </Text>
          <Text color="#999999">{state.to.symbol}</Text>
        </Balance>
      </Flex>
      <Flex full ai="center">
        <Input
          value={ethers.utils.formatUnits(amount, state.to.decimals).toString()}
          type="text"
          placeholder="0"
        />
        <ActiveSymbol onClick={openSelector}>
          {/* <TokenIcon src="https://tokens.1inch.exchange/0x4fabb145d64652a948d72533023f6e7a623c7c53.png" /> */}
          <SymbolLabel>{state.to.symbol}</SymbolLabel>
        </ActiveSymbol>
      </Flex>
    </Container>
  )
}

export default ExchangeTo
