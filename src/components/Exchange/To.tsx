import { ethers } from "ethers"
import { Flex } from "theme"
import { BigNumber } from "@ethersproject/bignumber"
import { BigNumberInput } from "big-number-input"

import TokenIcon from "components/TokenIcon"
import Ripple from "components/Ripple"

import angleIcon from "assets/icons/angle-down.svg"
import locker from "assets/icons/locker.svg"

import { formatBigNumber } from "utils"

import {
  ToContainer,
  Price,
  Balance,
  Input,
  Tokens,
  Symbol,
  ActiveSymbol,
  SelectToken,
  SymbolLabel,
  Icon,
} from "./styled"

interface IToProps {
  price: BigNumber
  amount: string
  balance: BigNumber
  address?: string
  symbol?: string
  decimal?: number
  priceImpact?: string
  onChange: (amount: string) => void
  onSelect?: () => void
}

const ExchangeTo: React.FC<IToProps> = ({
  price,
  amount,
  balance,
  address,
  symbol,
  decimal,
  priceImpact,
  onChange,
  onSelect,
}) => {
  const noData = !decimal || !symbol

  const setMaxAmount = () => {
    onChange(balance.toString())
  }

  const handleInputChange = (value) => {
    onChange(value || "000000000000000000")
  }

  if (!onSelect && noData) {
    return (
      <ToContainer dir="column" full>
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
      </ToContainer>
    )
  }

  return (
    <ToContainer dir="column" full>
      <Flex p="0 0 2px" full>
        <Price>
          ≈${formatBigNumber(price, 18, 2)} ({priceImpact}%)
        </Price>
        <Balance onClick={setMaxAmount}>
          <Tokens>{formatBigNumber(balance, decimal, 8)}</Tokens>
          <Symbol>{symbol}</Symbol>
        </Balance>
      </Flex>
      <Flex full ai="center">
        <BigNumberInput
          decimals={18}
          onChange={handleInputChange}
          value={amount}
          renderInput={(props: any) => <Input {...props} />}
        />
        <ActiveSymbol onClick={onSelect}>
          {/* // TODO: create FundIcon component */}
          {!noData && <TokenIcon address={address} size={27} />}
          {noData ? (
            <SelectToken>Select Token</SelectToken>
          ) : (
            <SymbolLabel>{symbol}</SymbolLabel>
          )}
          <Icon src={onSelect ? angleIcon : locker} />
        </ActiveSymbol>
      </Flex>
    </ToContainer>
  )
}

export default ExchangeTo
