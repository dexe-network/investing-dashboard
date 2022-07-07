import { FC, useMemo } from "react"
import { useParams } from "react-router-dom"

import RiskyPositionCard from "components/cards/position/Risky"

import S from "./styled"
import { PulseSpinner } from "react-spinners-kit"

interface IProps {
  data: any[]
  closed: boolean
}

const FundPositionsRisky: FC<IProps> = ({ data, closed }) => {
  const { poolAddress } = useParams()

  const positions = useMemo(() => {
    if (!data) return null

    return data.reduce((acc, p) => {
      if (p.positions.length) {
        const positions = p.positions.filter((_p) => _p.isClosed === closed)
        return [...acc, ...positions]
      }
      return acc
    }, [])
  }, [data, closed])

  if (!positions) {
    return (
      <S.ListLoading full ai="center" jc="center">
        <PulseSpinner />
      </S.ListLoading>
    )
  }

  return (
    <>
      {positions.map((p) => (
        <RiskyPositionCard key={p.id} position={p} poolAddress={poolAddress} />
      ))}
    </>
  )
}

export default FundPositionsRisky
