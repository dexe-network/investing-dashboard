import { FC, useMemo } from "react"
import { PulseSpinner } from "react-spinners-kit"
import { createClient, Provider as GraphProvider } from "urql"

import useRiskyPositions from "hooks/useRiskyPositions"
import RiskyPositionPoolCard from "components/cards/position/PoolRisky"
import { IRiskyPositionCard } from "constants/interfaces_v2"
import S from "./styled"

const poolClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

interface IProps {
  poolAddress: string
  closed: boolean
}

const FundPositionsRisky: FC<IProps> = ({ poolAddress, closed }) => {
  const proposals = useRiskyPositions(poolAddress, closed)

  const positions = useMemo<IRiskyPositionCard[] | null>(() => {
    if (!proposals) return null

    return proposals.reduce<IRiskyPositionCard[]>((acc, p) => {
      if (p.positions && p.positions.length) {
        const positions = p?.positions.map((_p) => ({
          ..._p,
          token: p.token,
          pool: p.basicPool,
        }))
        return [...acc, ...positions]
      }
      return acc
    }, [])
  }, [proposals])

  if (!positions) {
    return (
      <S.ListLoading full ai="center" jc="center">
        <PulseSpinner />
      </S.ListLoading>
    )
  }

  if (positions && positions.length === 0) {
    return (
      <S.ListLoading full ai="center" jc="center">
        <S.WithoutData>No positions</S.WithoutData>
      </S.ListLoading>
    )
  }

  return (
    <>
      {positions.map((p) => (
        <RiskyPositionPoolCard key={p.id} position={p} />
      ))}
    </>
  )
}

const FundPositionssRiskyWithPorvider = (props) => {
  return (
    <GraphProvider value={poolClient}>
      <FundPositionsRisky {...props} />
    </GraphProvider>
  )
}

export default FundPositionssRiskyWithPorvider
