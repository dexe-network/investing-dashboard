import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BigNumber, ethers } from "ethers"

import { PriceFeed } from "abi"
import useTokenPriceOutUSD from "hooks/useTokenPriceOutUSD"
import useContract, { useERC20 } from "hooks/useContract"
import { selectPriceFeedAddress } from "state/contracts/selectors"
import { IPosition } from "constants/interfaces_v2"
import { normalizeBigNumber } from "utils"

import PositionCardInvestor from "./PositionCardInvestor"
import PositionCardTrader from "./PositionCardTrader"

interface Props {
  baseTokenAddress?: string

  baseSymbol?: string
  ticker?: string
  descriptionURL?: string
  poolAddress?: string
  position: IPosition
  isPoolTrader: boolean
}

const PositionCard: React.FC<Props> = ({
  baseTokenAddress,
  ticker,
  descriptionURL,
  poolAddress,
  position,
  isPoolTrader,
}) => {
  const [, tokenData] = useERC20(position.positionToken)
  const [, baseToken] = useERC20(baseTokenAddress)

  const priceFeedAddress = useSelector(selectPriceFeedAddress)
  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  const [markPrice, setMarkPrice] = useState(BigNumber.from(0))
  const markPriceUSD = useTokenPriceOutUSD({
    tokenAddress: position.positionToken,
  })

  useEffect(() => {
    if (!tokenData) return

    const buy = position.exchanges.filter((exchange) => {
      return exchange.fromToken === baseTokenAddress
    })
    const sell = position.exchanges.filter((exchange) => {
      return exchange.toToken === baseTokenAddress
    })

    buy.map((exchange) => {
      const from = ethers.utils.formatEther(exchange.fromVolume)
      const to = ethers.utils.formatEther(exchange.toVolume)

      const price = Number(from) / Number(to)
      return price
    })
    console.log({ buy })
  }, [baseTokenAddress, position.exchanges, tokenData])

  // get mark price
  useEffect(() => {
    if (!priceFeed) return

    const getMarkPrice = async () => {
      const amount = ethers.utils.parseUnits("1", 18)

      // without extended
      const price = await priceFeed.getNormalizedExtendedPriceOut(
        position.positionToken,
        baseTokenAddress,
        amount,
        []
      )
      setMarkPrice(price.amountOut)
    }

    getMarkPrice().catch(console.error)
  }, [priceFeed, baseTokenAddress, position.positionToken])

  if (baseTokenAddress === position.positionToken) {
    return null
  }

  return isPoolTrader ? (
    <PositionCardTrader
      position={position}
      markPrice={markPrice}
      markPriceUSD={markPriceUSD}
      baseTokenAddress={baseTokenAddress}
    />
  ) : (
    <PositionCardInvestor
      ticker={ticker}
      position={position}
      markPrice={markPrice}
      markPriceUSD={markPriceUSD}
      poolAddress={poolAddress}
      descriptionURL={descriptionURL}
      baseTokenAddress={baseTokenAddress}
    />
  )
}

export default PositionCard
