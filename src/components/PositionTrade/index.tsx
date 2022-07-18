import { useMemo } from "react"
import { ethers } from "ethers"
import { format } from "date-fns"
import { BigNumber, FixedNumber } from "@ethersproject/bignumber"

import { useActiveWeb3React } from "hooks"
import { useERC20 } from "hooks/useContract"
import { expandTimestamp, normalizeBigNumber } from "utils"
import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"

import S from "./styled"

import externalLinkIcon from "assets/icons/external-link.svg"

interface Props {
  data: any
  id?: string
  baseTokenSymbol?: string
  timestamp?: string
  isBuy?: boolean
  amount?: BigNumber
  priceBase?: BigNumber
  priceUsd?: BigNumber
}

const PositionTrade: React.FC<Props> = ({
  data,
  id,
  baseTokenSymbol,
  timestamp,
  isBuy,
  amount,
  priceBase,
  priceUsd,
  ...rest
}) => {
  const { chainId } = useActiveWeb3React()
  const [, fromTokenData] = useERC20(data.fromToken)
  const [, toTokenData] = useERC20(data.toToken)

  const href = useMemo(() => {
    if (!id || !data.id || !chainId) {
      return ""
    }

    return getExplorerLink(chainId, id ?? data.id, ExplorerDataType.TRANSACTION)
  }, [chainId, data.id, id])

  const date = useMemo(() => {
    if (!timestamp) return "0"
    return format(expandTimestamp(Number(timestamp)), "MMM dd, y HH:mm")
  }, [timestamp])

  const volume = useMemo(() => {
    if (!amount) return "0"
    return normalizeBigNumber(amount, 18, 5)
  }, [amount])

  const priceBaseToken = useMemo(() => {
    if (priceBase) {
      return normalizeBigNumber(priceBase, 18, 5)
    }
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
  }, [data.fromVolume, data.toVolume, isBuy, priceBase])

  const _priceUsd = useMemo(() => {
    if (priceUsd) return normalizeBigNumber(priceUsd, 18, 2)
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
  }, [data, isBuy, priceUsd])

  const PositionDirection = (
    <S.Direction isBuy={isBuy}>{isBuy ? <>&uarr;</> : <>&darr;</>}</S.Direction>
  )

  return (
    <S.Container
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <S.Content>
        <S.Item>
          <S.Label>
            {date}
            <S.ExternalLinkIcon src={externalLinkIcon} />
          </S.Label>
          <S.Value>
            {PositionDirection} {volume}
          </S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price ({baseTokenSymbol ?? ""})</S.Label>
          <S.Value>{priceBaseToken}</S.Value>
        </S.Item>
        <S.Item>
          <S.Label>Price USD</S.Label>
          <S.Value>${_priceUsd}</S.Value>
        </S.Item>
      </S.Content>
    </S.Container>
  )
}

export default PositionTrade
