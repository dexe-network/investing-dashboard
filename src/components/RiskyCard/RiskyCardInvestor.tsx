import { FC } from "react"

import { Flex } from "theme"
import Icon from "components/Icon"

import RiskyCardHeader from "./Header"
import RiskyCardBody from "./Body"

import { Card, HeaderStyled as HeaderS } from "./styled"
import Button from "components/Button"

const InvestorSubHeader = ({ poolMetadata, poolAddress, poolTicker }) => {
  return (
    <Flex>
      <HeaderS.Ticker>{poolTicker}</HeaderS.Ticker>
      <Icon
        size={24}
        m="0 0 0 4px"
        source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
        address={poolAddress}
      />
    </Flex>
  )
}

interface Props {
  positionAddress: string
  poolAddress: string
  poolMetadata: any
  positionTokenData: any
  poolTicker: string
  onInvest: () => void
}

const RiskyCardInvestor: FC<Props> = ({
  positionAddress,
  poolAddress,
  onInvest,

  poolMetadata,
  poolTicker,
  positionTokenData,
}) => {
  return (
    <Card>
      <>
        <RiskyCardHeader
          positionAddress={positionAddress}
          positionTokenData={positionTokenData}
        >
          <InvestorSubHeader
            poolAddress={poolAddress}
            poolTicker={poolTicker}
            poolMetadata={poolMetadata}
          />
        </RiskyCardHeader>
        <RiskyCardBody>
          <Button full size="small" onClick={onInvest}>
            Stake LP
          </Button>
        </RiskyCardBody>
      </>
    </Card>
  )
}

export default RiskyCardInvestor
