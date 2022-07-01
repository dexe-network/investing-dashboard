import { FC, useMemo } from "react"
import { useParams } from "react-router-dom"

import PoolPositionCard from "components/cards/position/Pool"

import { usePoolPositions } from "state/pools/hooks"
import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"

import { List } from "./styled"

const FundPositionsList: FC<{ closed: boolean }> = ({ closed }) => {
  const { account } = useActiveWeb3React()
  const { poolAddress } = useParams()
  const data = usePoolPositions(poolAddress, closed)
  const [, poolInfo] = usePoolContract(poolAddress)

  const isPoolTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo.parameters.trader
  }, [account, poolInfo])

  return (
    <>
      <List>
        {(data?.positions || []).map((position) => (
          <PoolPositionCard
            baseTokenAddress={data?.baseToken}
            key={position.id}
            position={position}
            isTrader={isPoolTrader}
          />
        ))}
      </List>
    </>
  )
}

export default FundPositionsList
