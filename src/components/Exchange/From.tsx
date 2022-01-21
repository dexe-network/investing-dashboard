import React from "react"
import { Flex, Text } from "theme"
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import lock from "assets/icons/lock-solid.svg"
import TokenIcon from "components/TokenIcon"
import Ripple from "components/Ripple"
import { DebounceInput } from "react-debounce-input"
import angleIcon from "assets/icons/angle-down.svg"
import {
  FromContainer,
  Price,
  Balance,
  Max,
  Input,
  ActiveSymbol,
  SymbolLabel,
  Unlock,
  IconDown,
} from "./styled"

interface IFromProps {
  price: number
  amount: number
  balance: BigNumber
  address: string
  symbol?: string
  decimal?: number
  isAlloved: boolean
  isPool?: boolean
  isStable?: boolean
  onChange: (amount: number) => void
  onSelect: () => void
}

const ExchangeFrom: React.FC<IFromProps> = ({
  price,
  amount,
  balance,
  address,
  symbol,
  decimal,
  isAlloved,
  isPool = false,
  isStable = false,
  onChange,
  onSelect,
}) => {
  const setMaxAmount = () => {
    onChange(parseFloat(ethers.utils.formatUnits(balance, decimal)))
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    const rgx = /^[0-9]*\.?[0-9]*$/

    if (value.match(rgx)) {
      onChange(value)
    } else {
      onChange(parseFloat(value.replace(/[^0-9.]/g, "")) || 0.0)
    }
  }

  if (!decimal || !symbol) {
    return (
      <FromContainer dir="column" full>
        <Flex p="0 0 5px" full>
          <Price>
            <Ripple width="67px" />
          </Price>
          <Balance>
            <Ripple width="80px" />
          </Balance>
        </Flex>
        <Flex full ai="center">
          <Ripple width="120px" />
          <Ripple width="60px" />
        </Flex>
      </FromContainer>
    )
  }
  return (
    <FromContainer full>
      <Flex full dir="column">
        <Flex p="0 0 2px" full>
          <Price>
            ≈$
            {isStable ? amount.toFixed(2) : price.toFixed(2)}
          </Price>
          <Balance>
            <Text fw={600} color="#DADADA">
              {parseFloat(ethers.utils.formatUnits(balance, decimal))}
            </Text>
            <Text fw={600} color="#616A78">
              {symbol}
            </Text>
            <Max onClick={setMaxAmount}>(Max)</Max>
          </Balance>
        </Flex>
        <Flex full ai="center">
          <DebounceInput
            element={Input}
            minLength={0}
            debounceTimeout={500}
            onChange={handleInputChange}
            value={amount}
          />
          <ActiveSymbol onClick={onSelect}>
            <TokenIcon size={27} address={address} />
            <SymbolLabel>{symbol}</SymbolLabel>
            <IconDown src={angleIcon} />
          </ActiveSymbol>
        </Flex>
      </Flex>
      {!isAlloved && (
        <Unlock>
          <img src={lock} alt="" />
        </Unlock>
      )}
    </FromContainer>
  )
}

export default ExchangeFrom
