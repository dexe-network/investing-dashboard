import { FC } from "react"

interface IProps {
  closed: boolean
}

const InvestmentPositionsList: FC<IProps> = ({ closed }) => {
  return (
    <>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Positions {closed ? "closed" : "open"}
      </h1>
    </>
  )
}

export default InvestmentPositionsList
