import { FC, useEffect, useState } from "react"
import { BigNumber, Contract, ethers } from "ethers"

import TokenIcon from "components/TokenIcon"
import { Token as IToken } from "constants/interfaces"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import { formatBigNumber, normalizeBigNumber } from "utils"

import {
  TokenContainer,
  TokenInfo,
  Symbol,
  Name,
  BalanceInfo,
  TokenBalance,
  TokenPrice,
} from "./styled"

const Token: FC<{
  tokenData: IToken
  balance?: BigNumber
  onClick: (token: IToken) => void
}> = ({ tokenData, balance, onClick }) => {
  const { symbol, name, address } = tokenData

  const price = useTokenPriceOutUSD({ tokenAddress: address })

  const balanceFormated = formatBigNumber(balance || BigNumber.from("0"), 18)

  return (
    <TokenContainer onClick={() => onClick(tokenData)}>
      <TokenIcon address={address} size={30} />
      <TokenInfo>
        <Symbol>{symbol}</Symbol>
        <Name>{name}</Name>
      </TokenInfo>
      <BalanceInfo>
        <TokenBalance>{balanceFormated}</TokenBalance>
        <TokenPrice>${normalizeBigNumber(price, 18, 2)}</TokenPrice>
      </BalanceInfo>
    </TokenContainer>
  )
}

export default Token
