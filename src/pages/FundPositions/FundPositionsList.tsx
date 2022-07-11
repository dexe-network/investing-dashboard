import { FC, useMemo } from "react"
import { useParams } from "react-router-dom"
import { PulseSpinner } from "react-spinners-kit"

import PoolPositionCard from "components/cards/position/Pool"

import { usePoolPositions } from "state/pools/hooks"
import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"

import S from "./styled"

const FundPositionsList: FC<{ closed: boolean }> = ({ closed }) => {
  const { account } = useActiveWeb3React()
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, closed)
  const [, poolInfo] = usePoolContract(poolAddress)

  const isPoolTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo.parameters.trader
  }, [account, poolInfo])

  if (!data || !data.positions) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (data.positions && data.positions.length === 0) {
    return (
      <S.Content>
        <S.WithoutData>No {closed ? "closed" : "open"} positions</S.WithoutData>
      </S.Content>
    )
  }

  return (
    <>
      <S.List>
        {(data?.positions || []).map((position) => (
          <PoolPositionCard
            baseTokenAddress={data?.baseToken}
            key={position.id}
            position={position}
            isTrader={isPoolTrader}
          />
        ))}
      </S.List>
    </>
  )
}

export default FundPositionsList
