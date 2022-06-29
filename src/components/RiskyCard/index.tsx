import { FC } from "react"

import { useERC20 } from "hooks/useContract"

import RiskyCardTrader from "components/RiskyCard/RiskyCardTrader"
import RiskyCardInvestor from "components/RiskyCard/RiskyCardInvestor"

interface Props {
  positionAddress: string
  poolAddress: string

  onInvest: () => void
  isPoolTrader: boolean
  poolMetadata: any
  poolTicker: string
}

const RiskyCard: FC<Props> = ({
  isPoolTrader,
  positionAddress,
  poolAddress,
  onInvest,
  poolMetadata,
  poolTicker,
}) => {
  const [, positionTokenData] = useERC20(positionAddress)

  return isPoolTrader ? (
    <RiskyCardTrader
      onInvest={onInvest}
      positionAddress={positionAddress}
      positionTokenData={positionTokenData}
    />
  ) : (
    <RiskyCardInvestor
      poolMetadata={poolMetadata}
      onInvest={onInvest}
      positionAddress={positionAddress}
      poolAddress={poolAddress}
      poolTicker={poolTicker}
      positionTokenData={positionTokenData}
    />
  )
}

export default RiskyCard
