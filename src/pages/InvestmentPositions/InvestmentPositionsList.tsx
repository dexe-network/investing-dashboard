import { FC } from "react"
import { BigNumber } from "@ethersproject/bignumber"

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
          totalUSDCloseVolume: BigNumber.from("0"),
          totalUSDOpenVolume: BigNumber.from("68474"),
          totalBaseOpenVolume: BigNumber.from("0"),
          totalBaseCloseVolume: BigNumber.from("68474"),
          totalPositionOpenVolume: BigNumber.from("0"),
          totalPositionCloseVolume: BigNumber.from("68474"),
          exchanges: [],
        },
      ]
    : [
        {
          id: "jakldfu91142370129384klhjh23lk4",
          closed: false,
          positionToken: "9132af.asdfn04kjdlf",
          totalUSDCloseVolume: BigNumber.from("0"),
          totalUSDOpenVolume: BigNumber.from("68474"),
          totalBaseOpenVolume: BigNumber.from("0"),
          totalBaseCloseVolume: BigNumber.from("68474"),
          totalPositionOpenVolume: BigNumber.from("0"),
          totalPositionCloseVolume: BigNumber.from("68474"),
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
