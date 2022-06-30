import { ReactNode, FC, useMemo } from "react"
import { BigNumber } from "@ethersproject/bignumber"
import { BigNumberInput } from "big-number-input"

import TokenIcon from "components/TokenIcon"
import Ripple from "components/Ripple"

import { RiskyInvestInfo } from "constants/interfaces_v2"

import { cutDecimalPlaces, formatBigNumber } from "utils"

import {
  RiskyContainer,
  InputTop,
  InputBottom,
  Price,
  Balance,
  Input,
  Tokens,
  Max,
  ActiveSymbol,
  SymbolLabel,
  TokensContainer,
  TokenContainer,
  TokenText,
  TokenInfo,
} from "./styled"
import { useERC20 } from "hooks/useContract"
import { dropdownVariants } from "motion/variants"

interface ReceivedTokenProps {
  address: string
  amount: BigNumber
}

const ReceivedToken: FC<ReceivedTokenProps> = ({ address, amount }) => {
  const [, token] = useERC20(address)

  return (
    <TokenContainer>
      <TokenText>{formatBigNumber(amount)}</TokenText>
      <TokenInfo>
        <TokenIcon address={address} size={15} />
        <TokenText>{token?.symbol}</TokenText>
      </TokenInfo>
    </TokenContainer>
  )
}

interface RiskyInvestProps {
  price: BigNumber
  amount: string
  balance: BigNumber
  address?: string
  symbol?: string
  decimal?: number
  customIcon?: ReactNode
  isLocked?: boolean
  info?: RiskyInvestInfo
  onChange?: (amount: string) => void
}

const RiskyInvestInput: React.FC<RiskyInvestProps> = ({
  price,
  amount,
  balance,
  address,
  symbol,
  decimal,
  customIcon,
  info,
  onChange,
}) => {
  const noData = !decimal || !symbol

  const setMaxAmount = () => {
    !!onChange && onChange(balance.toString())
  }

  const handleInputChange = (value) => {
    !!onChange && onChange(value || "0")
  }

  const receivedTokens = useMemo(() => {
    if (!info) return

    if (!info.amounts || !info.tokens) return

    const isZero = info.amounts[0].isZero() && info.amounts[1].isZero()

    return (
      <TokensContainer
        initial="hidden"
        animate={isZero ? "hidden" : "visible"}
        variants={dropdownVariants}
      >
        <ReceivedToken address={info.tokens[0]} amount={info.amounts[0]} />
        <ReceivedToken address={info.tokens[1]} amount={info.amounts[1]} />
      </TokensContainer>
    )
  }, [info])

  if (noData) {
    return (
      <RiskyContainer>
        <InputTop>
          <Price>
            <Ripple width="67px" />
          </Price>
          <Balance>
            <Ripple width="80px" />
          </Balance>
        </InputTop>
        <InputBottom>
          <Ripple width="120px" />
          <Ripple width="60px" />
        </InputBottom>
      </RiskyContainer>
    )
  }

  const icon = customIcon ? (
    customIcon
  ) : (
    <TokenIcon m="0" address={address} size={26} />
  )

  return (
    <RiskyContainer>
      <InputTop>
        <Price>≈${formatBigNumber(price, 18, 2)} </Price>

        <Balance onClick={setMaxAmount}>
          <Tokens>
            staked: {formatBigNumber(balance, decimal, 6)}/
            {formatBigNumber(info?.stakeLimit, 18, 6)}
          </Tokens>
          {!!onChange && <Max>Max</Max>}
        </Balance>
      </InputTop>

      <InputBottom>
        <BigNumberInput
          decimals={decimal || 18}
          onChange={handleInputChange}
          value={cutDecimalPlaces(amount, decimal, false, 6).toString()}
          renderInput={(props: any) => (
            <Input disabled={!onChange} inputMode="decimal" {...props} />
          )}
        />

        <ActiveSymbol>
          {!noData && icon}
          <SymbolLabel>{symbol}</SymbolLabel>
        </ActiveSymbol>
      </InputBottom>

      {receivedTokens}
    </RiskyContainer>
  )
}

export default RiskyInvestInput
