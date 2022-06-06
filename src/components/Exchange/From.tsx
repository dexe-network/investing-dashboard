import React from "react"
import { Flex } from "theme"
import { BigNumber } from "@ethersproject/bignumber"
import TokenIcon from "components/TokenIcon"
import Ripple from "components/Ripple"
import { BigNumberInput } from "big-number-input"
import angleIcon from "assets/icons/angle-down.svg"
import locker from "assets/icons/locker.svg"
import {
  FromContainer,
  Price,
  Balance,
  Max,
  Input,
  ActiveSymbol,
  SelectToken,
  SymbolLabel,
  Tokens,
  Icon,
} from "./styled"
import { formatBigNumber, cutDecimalPlaces } from "utils"

interface IFromProps {
  price: BigNumber
  amount: string
  balance: BigNumber
  address?: string
  symbol?: string
  decimal?: number
  onChange: (amount: string) => void
  onSelect?: () => void
}

const ExchangeFrom: React.FC<IFromProps> = ({
  price,
  amount,
  balance,
  address,
  symbol,
  decimal,
  onChange,
  onSelect,
}) => {
  const noData = !decimal || !symbol

  const select = onSelect ? onSelect : () => {}

  const setMaxAmount = () => {
    onChange(balance.toString())
  }

  const handleInputChange = (value) => {
    const fixedAmount = cutDecimalPlaces(value, decimal)
    onChange(fixedAmount.toString() || "0")
  }

  if (!onSelect && noData) {
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
          <Price>≈${formatBigNumber(price, 18, 2)}</Price>
          <Balance onClick={setMaxAmount}>
            <Tokens>{formatBigNumber(balance, decimal, 6)}</Tokens>
            <Max>Max</Max>
          </Balance>
        </Flex>
        <Flex full ai="center" p="21px 0 0">
          <BigNumberInput
            decimals={18}
            onChange={handleInputChange}
            value={amount}
            renderInput={(props: any) => <Input {...props} />}
          />
          <ActiveSymbol onClick={select}>
            {!noData && <TokenIcon address={address} size={27} />}
            {noData ? (
              <SelectToken>Select Token</SelectToken>
            ) : (
              <SymbolLabel>{symbol}</SymbolLabel>
            )}
            <Icon src={onSelect ? angleIcon : locker} />
          </ActiveSymbol>
        </Flex>
      </Flex>
    </FromContainer>
  )
}

export default ExchangeFrom
