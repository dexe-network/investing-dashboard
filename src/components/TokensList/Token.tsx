import { FC, useEffect, useState } from "react"
import { BigNumber, Contract, ethers } from "ethers"

import TokenIcon from "components/TokenIcon"
import { Token as IToken } from "constants/interfaces"
import { useERC20 } from "hooks/useContract"
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
  priceFeed: Contract | null
  tokenData: IToken
  balance?: BigNumber
  onClick: (token: IToken) => void
}> = ({ tokenData, priceFeed, balance, onClick }) => {
  const { symbol, name, address } = tokenData

  const [price, setPrice] = useState(BigNumber.from("0"))

  const balanceFormated = formatBigNumber(balance || BigNumber.from("0"), 18)

  useEffect(() => {
    if (!priceFeed || !address) return

    const getPrice = async () => {
      const baseTokenPrice = await priceFeed.getNormalizedPriceOutUSD(
        address,
        ethers.utils.parseUnits("1", 18).toHexString()
      )
      setPrice(baseTokenPrice[0])
    }

    getPrice()
  }, [priceFeed, address])

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
