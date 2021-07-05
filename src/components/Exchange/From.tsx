import React, { useState, useEffect, useContext } from "react"
import { useERC20 } from "hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import { Flex, Text } from "theme"
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import lock from "assets/icons/lock-solid.svg"

import {
  Container,
  Price,
  Balance,
  Max,
  Input,
  TokenIcon,
  ActiveSymbol,
  SymbolLabel,
  Unlock,
} from "./styled"

const ExchangeFrom: React.FC<{
  context: any
  amount: BigNumber
  onInputChange: (input: string) => void
  setMaxAmount: () => void
}> = ({ context, amount, onInputChange, setMaxAmount }) => {
  const { state, setFrom } = useContext(context)

  const [ERC20, baseData] = useERC20(state.from.address)

  useEffect(() => {
    if (!baseData) return

    setFrom("symbol", baseData.symbol)
    setFrom("decimals", baseData.decimals)
    setFrom("balance", baseData.balance)
  }, [baseData, setFrom])

  return (
    <Container full>
      <Flex full dir="column">
        <Flex p="0 0 5px" full>
          <Price>≈${state.from.price.toString()}</Price>
          <Balance>
            <Text color="#F7F7F7">
              {ethers.utils.formatUnits(
                state.from.balance,
                state.from.decimals
              )}
            </Text>
            <Text color="#999999">{state.from.symbol}</Text>
            <Max onClick={setMaxAmount}>(Max)</Max>
          </Balance>
        </Flex>
        <Flex full ai="center">
          <Input
            onChange={(e) => onInputChange(e.target.value)}
            value={ethers.utils.formatUnits(amount, state.from.decimals)}
            type="text"
            placeholder="0"
          />
          <ActiveSymbol>
            <TokenIcon
              src={`https://tokens.1inch.exchange/${state.from.address.toLowerCase()}.png`}
            />
            <SymbolLabel>{state.from.symbol}</SymbolLabel>
          </ActiveSymbol>
        </Flex>
      </Flex>
      {amount.gt(state.allowance) && state.direction === "deposit" && (
        <Unlock>
          <img src={lock} alt="" />
        </Unlock>
      )}
    </Container>
  )
}

export default ExchangeFrom
