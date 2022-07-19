import { FC, useMemo } from "react"
import { PulseSpinner } from "react-spinners-kit"
import { createClient, Provider as GraphProvider } from "urql"

import useInvestorRiskyPositions from "hooks/useInvestorRiskyPositions"

import RiskyPositionCard from "components/cards/position/Risky"

import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

interface IProps {
  activePools: string[]
  closed: boolean
}

const InvestmentRiskyPositionsList: FC<IProps> = ({ activePools, closed }) => {
  const data = useInvestorRiskyPositions(activePools, closed)

  const positions = useMemo(() => {
    if (!data) return null

    return data.reduce((acc, p) => {
      if (p.positions.length) {
        const positionBase = {
          proposal: p.id,
          token: p.token,
          pool: p.basicPool,
        }

        const positions = p.positions.map((_p) => ({ ...positionBase, ..._p }))

        return [...acc, ...positions]
      }
      return acc
    }, [] as any[])
  }, [data])

  if (!positions) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (positions && positions.length === 0) {
    return (
      <S.Content>
        <S.WithoutData>
          No {closed ? "closed" : "open"} positions yet
        </S.WithoutData>
      </S.Content>
    )
  }

  return (
    <>
      <S.List>
        {positions.map((p) => (
          <RiskyPositionCard key={p.id} position={p} />
        ))}
      </S.List>
    </>
  )
}

const InvestmentRiskyPositionsListWithProvider = (props) => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestmentRiskyPositionsList {...props} />
    </GraphProvider>
  )
}

export default InvestmentRiskyPositionsListWithProvider
