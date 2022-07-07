import { FC } from "react"

import useInvestorPositions from "hooks/useInvestorPositions"

import InvestPositionCard from "components/cards/position/Invest"
import { List } from "./styled"

interface IProps {
  account: string
  closed: boolean
}

const InvestmentPositionsList: FC<IProps> = ({ account, closed }) => {
  const data = useInvestorPositions(String(account).toLowerCase(), closed)

  console.log("data", data)

  if (!data) {
    return <div style={{ color: "white", textAlign: "center" }}>Loading</div>
  }

  if (data && data.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        No positions yet
      </div>
    )
  }

  return (
    <>
      <List>
        {(data || []).map((p) => (
          <InvestPositionCard key={p.id} position={p} />
        ))}
      </List>
    </>
  )
}

export default InvestmentPositionsList
