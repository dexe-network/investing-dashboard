import { ethers } from "ethers"

import { Flex } from "theme"
import {
  ToContainer,
  Price,
  Balance,
  Input,
  Tokens,
  Symbol,
  ActiveSymbol,
  SymbolLabel,
  Icon,
} from "./styled"
import TokenIcon from "components/TokenIcon"
import Ripple from "components/Ripple"
import { BigNumber } from "@ethersproject/bignumber"
import angleIcon from "assets/icons/angle-down.svg"
import { DebounceInput } from "react-debounce-input"
import { calcPrice } from "utils"

interface IToProps {
  customIcon?: any
  price: string
  priceChange24H: number
  amount: number | string
  balance: BigNumber
  address?: string
  symbol?: string
  decimal?: number
  isPool?: boolean
  onChange: (amount: number | string) => void
  onSelect?: () => void
}

const ExchangeTo: React.FC<IToProps> = ({
  customIcon,
  price,
  priceChange24H,
  amount,
  balance,
  address,
  symbol,
  decimal,
  isPool = false,
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
          ≈${calcPrice(price, amount).toFixed(2)} ({priceChange24H.toFixed(2)}%)
        </Price>
        <Balance onClick={setMaxAmount}>
          <Tokens>
            {ethers.utils.formatUnits(balance, decimal).toString()}
          </Tokens>
          <Symbol>{symbol}</Symbol>
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
          {/* // TODO: create FundIcon component */}
          {customIcon ? customIcon : <TokenIcon address={address} size={27} />}
          <SymbolLabel>{symbol}</SymbolLabel>
          {onSelect && <Icon src={angleIcon} />}
        </ActiveSymbol>
      </Flex>
    </ToContainer>
  )
}

export default ExchangeTo
