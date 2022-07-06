import { FC } from "react"

import InvestPositionCard from "components/cards/position/Invest"

import { List } from "./styled"

interface IProps {
  closed: boolean
}

const getPositions = (closed) =>
  closed
    ? [
        {
          id: "jakldfu9132-0ufjasl",
          closed: true,
          positionToken: "913204kjdlf",
          totalUSDCloseVolume: "0",
          totalUSDOpenVolume: "68474",
          exchanges: [],
        },
      ]
    : [
        {
          id: "jakldfu91142370129384klhjh23lk4",
          closed: false,
          positionToken: "9132af.asdfn04kjdlf",
          totalUSDCloseVolume: "0",
          totalUSDOpenVolume: "68474",
          exchanges: [],
        },
      ]

const InvestmentPositionsList: FC<IProps> = ({ closed }) => {
  // TODO: get investment positions using closed flag
  const data = {
    positions: getPositions(closed),
  }

  return (
    <>
      <List>
        {(data?.positions || []).map((position) => (
          <InvestPositionCard key={position.id} position={position} />
        ))}
      </List>
    </>
  )
}

export default InvestmentPositionsList
