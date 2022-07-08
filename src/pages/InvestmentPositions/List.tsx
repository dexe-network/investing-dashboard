import { FC } from "react"
import { PulseSpinner } from "react-spinners-kit"

import useInvestorPositions from "hooks/useInvestorPositions"

import InvestPositionCard from "components/cards/position/Invest"
import S from "./styled"

interface IProps {
  account: string
  closed: boolean
}

const InvestmentPositionsList: FC<IProps> = ({ account, closed }) => {
  const data = useInvestorPositions(String(account).toLowerCase(), closed)

  if (!data) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (data && data.length === 0) {
    return (
      <S.Content>
        <div style={{ color: "white", textAlign: "center" }}>
          No {closed ? "closed" : "open"} positions yet
        </div>
      </S.Content>
    )
  }

  return (
    <>
      <S.List>
        {(data || []).map((p) => (
          <InvestPositionCard key={p.id} position={p} />
        ))}
      </S.List>
    </>
  )
}

export default InvestmentPositionsList
