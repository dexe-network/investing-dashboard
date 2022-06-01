import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Flex } from "theme"
import { PriceFeed } from "abi"
import { BigNumber, ethers } from "ethers"

import TokenIcon from "components/TokenIcon"
import IpfsIcon from "components/IpfsIcon"

import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import useContract, { useERC20 } from "hooks/useContract"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import { IPosition } from "constants/interfaces_v2"

import { normalizeBigNumber } from "utils"

import {
  Card,
  Head,
  Body,
  PositionSymbol,
  FundSymbol,
  Amount,
  Label,
  Value,
  StablePrice,
  PNL,
} from "./styled"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

interface Props {
  baseToken?: string
  baseSymbol?: string
  ticker?: string
  description?: string
  poolAddress?: string
  position: IPosition
}

const PositionCard: React.FC<Props> = ({
  baseToken,
  baseSymbol,
  ticker,
  description,
  poolAddress,
  position,
}) => {
  const [, tokenData] = useERC20(position.positionToken)
  const [, baseData] = useERC20(baseToken)
  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [markPrice, setMarkPrice] = useState(BigNumber.from(0))

  const markPriceUSD = useTokenPriceOutUSD({
    tokenAddress: position.positionToken,
  })

  const [{ poolMetadata }] = usePoolMetadata(poolAddress, description)

  useEffect(() => {
    if (!tokenData) return

    const buy = position.exchanges.filter((exchange) => {
      return exchange.fromToken === baseToken
    })
    const sell = position.exchanges.filter((exchange) => {
      return exchange.toToken === baseToken
    })

    buy.map((exchange) => {
      const from = ethers.utils.formatEther(exchange.fromVolume)
      const to = ethers.utils.formatEther(exchange.toVolume)

      const price = Number(from) / Number(to)
      return price
    })
  }, [baseToken, position.exchanges, tokenData])

  // get mark price
  useEffect(() => {
    if (!priceFeed) return

    const getMarkPrice = async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      // without extended
      const price = await priceFeed.getNormalizedExtendedPriceOut(
        position.positionToken,
        baseToken,
        amount,
        []
      )
      setMarkPrice(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, baseToken, position.positionToken])

  if (baseToken === position.positionToken) {
    return null
  }

  return (
    <Card>
      <Head>
        <Flex>
          <TokenIcon address={position.positionToken} m="0" size={24} />
          <Amount>5</Amount>
          <PositionSymbol>{tokenData?.symbol}</PositionSymbol>
        </Flex>
        <Flex>
          <FundSymbol>{ticker}</FundSymbol>
          <IpfsIcon
            source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
            m="0"
            size={24}
          />
        </Flex>
      </Head>
      <Body>
        <Label>Entry Price</Label>
        <Label>Mark price</Label>
        <Label>P&L LP</Label>

        <Flex>
          <Value>0.1</Value>
          <Label>{baseSymbol}</Label>
        </Flex>
        <Flex>
          <Value>{normalizeBigNumber(markPrice, 18, 4)}</Value>
          <Label>{baseSymbol}</Label>
        </Flex>
        <Flex>
          <Value>+0.0012</Value>
          <PNL>+0.38%</PNL>
        </Flex>

        <StablePrice>$57</StablePrice>
        <StablePrice>${normalizeBigNumber(markPriceUSD, 18, 2)}</StablePrice>
        <StablePrice>+$30</StablePrice>
      </Body>
    </Card>
  )
}

export default PositionCard
