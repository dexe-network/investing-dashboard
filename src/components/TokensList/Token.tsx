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
import { getUSDPrice } from "utils/formulas"

const Token: FC<{
  priceFeed: Contract | null
  tokenData: IToken
  onClick: (token: IToken) => void
}> = ({ tokenData, priceFeed, onClick }) => {
  const { symbol, name, address } = tokenData

  const [price, setPrice] = useState(BigNumber.from("0"))
  const [, data, balance] = useERC20(address)
  const balanceFormated = formatBigNumber(balance, data?.decimals)

  useEffect(() => {
    if (!priceFeed || !address) return

    const getPrice = async () => {
      const baseTokenPrice = await priceFeed.getNormalizedPriceOutUSD(
        address,
        ethers.utils.parseUnits("1", 18).toHexString(),
        []
      )
      setPrice(baseTokenPrice)
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
