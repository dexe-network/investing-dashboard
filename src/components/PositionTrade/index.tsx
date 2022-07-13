import { useMemo } from "react"
import { ethers } from "ethers"
import { format } from "date-fns"
import { FixedNumber } from "@ethersproject/bignumber"

import { expandTimestamp, normalizeBigNumber } from "utils"
import { useERC20 } from "hooks/useContract"

import S from "./styled"

interface Props {
  data: any
  baseTokenSymbol?: string
}

const PositionTrade: React.FC<Props> = ({ data, baseTokenSymbol, ...rest }) => {
  const [, fromTokenData] = useERC20(data.fromToken)
  const [, toTokenData] = useERC20(data.toToken)

  const isBuy = useMemo(() => {
    return data.isInvest ?? data.opening
  }, [data])

  const date = useMemo(() => {
    if (!data.timestamp) return "0"
    return format(expandTimestamp(data.timestamp), "MMM dd, y HH:mm")
  }, [data])

  const volume = useMemo(() => {
    if (!data.toVolume) return "0"
    return normalizeBigNumber(isBuy ? data.toVolume : data.fromVolume, 18, 5)
  }, [data.fromVolume, data.toVolume, isBuy])

  const priceBase = useMemo(() => {
    if (!data.toVolume || !data.fromVolume) return "0"

    const toFixed = FixedNumber.fromValue(data.toVolume, 18)
    const fromFixed = FixedNumber.fromValue(data.fromVolume, 18)

    if (isBuy) {
      return normalizeBigNumber(
        ethers.utils.parseEther(fromFixed.divUnsafe(toFixed)._value),
        18,
        5
      )
    }
    return normalizeBigNumber(
      ethers.utils.parseEther(toFixed.divUnsafe(fromFixed)._value),
      18,
      5
    )
  }, [data.fromVolume, data.toVolume, isBuy])

  const priceUsd = useMemo(() => {
    if (!data || !data.usdVolume) return "0"

    const usdVolumeFixed = FixedNumber.fromValue(data.usdVolume, 18)

    let res

    if (isBuy) {
      res = ethers.utils.parseEther(
        usdVolumeFixed.divUnsafe(FixedNumber.fromValue(data.toVolume, 18))
          ._value
      )
    } else {
      res = ethers.utils.parseEther(
        usdVolumeFixed.divUnsafe(FixedNumber.fromValue(data.fromVolume, 18))
          ._value
      )
    }

    return normalizeBigNumber(res, 18, 2)
  }, [data, isBuy])

  const PositionDirection = (
    <S.Direction isBuy={isBuy}>{isBuy ? <>&uarr;</> : <>&darr;</>}</S.Direction>
  )

  return (
    <S.Container {...rest}>
      <S.Content>
        <S.Item>
          <S.Label>{date}</S.Label>
          <S.Value>
            {PositionDirection} {volume} {fromTokenData?.symbol} /{" "}
            {toTokenData?.symbol}
          </S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price {baseTokenSymbol ?? ""}</S.Label>
          <S.Value>{priceBase}</S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price USD</S.Label>
          <S.Value>${priceUsd}</S.Value>
        </S.Item>
      </S.Content>
    </S.Container>
  )
}

export default PositionTrade
