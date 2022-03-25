import React from "react"
import { Flex, Text } from "theme"
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import TokenIcon from "components/TokenIcon"
import Ripple from "components/Ripple"
import { DebounceInput } from "react-debounce-input"
import angleIcon from "assets/icons/angle-down.svg"
import locker from "assets/icons/locker.svg"
import {
  FromContainer,
  Price,
  Balance,
  Max,
  Input,
  ActiveSymbol,
  SymbolLabel,
  Tokens,
  Icon,
} from "./styled"
import { formatBigNumber, calcPrice } from "utils"

interface IFromProps {
  price: number
  amount: number
  balance: BigNumber
  address?: string
  symbol?: string
  decimal?: number
  isPool?: boolean
  isStable?: boolean
  onChange: (amount: number) => void
  onSelect?: () => void
}

const ExchangeFrom: React.FC<IFromProps> = ({
  price,
  amount,
  balance,
  address,
  symbol,
  decimal,
  isPool = false,
  isStable = false,
  onChange,
  onSelect,
}) => {
  const select = onSelect ? onSelect : () => {}

  const setMaxAmount = () => {
    console.log(
      ethers.utils.formatUnits(balance, decimal),
      parseFloat(ethers.utils.formatUnits(balance, decimal))
    )
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
            <Ripple width="70px" />
          </Balance>
        </Flex>
        <Flex p="9px 0 0" full ai="center">
          <Ripple width="120px" />
          <Ripple width="100px" />
        </Flex>
      </FromContainer>
    )
  }

  return (
    <FromContainer full>
      <Flex full dir="column">
        <Flex full>
          <Price>
            ≈$
            {calcPrice(price, amount).toFixed(2)}
          </Price>
          <Balance onClick={setMaxAmount}>
            <Tokens>Balance: {formatBigNumber(balance, decimal, 6)}</Tokens>
            <Max onClick={setMaxAmount}>Max</Max>
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
          <ActiveSymbol onClick={select}>
            <TokenIcon size={26} address={address} />
            <SymbolLabel>{symbol}</SymbolLabel>
            <Icon src={onSelect ? angleIcon : locker} />
          </ActiveSymbol>
        </Flex>
      </Flex>
    </FromContainer>
  )
}

export default ExchangeFrom
