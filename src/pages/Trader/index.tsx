import { Block, Center, To } from "theme"
import { useSwipeable } from "react-swipeable"
import { useHistory, useParams } from "react-router-dom"
import FundsList from "components/FundsList"
import TraderMobile from "components/TraderMobile"
import Button from "components/Button"
import { useState } from "react"
import { GuardSpinner } from "react-spinners-kit"
import { formatNumber } from "utils"
import { ethers } from "ethers"
import PnlWidget from "components/PnlWidget"

import OpenNewTrade from "assets/custom-buttons/OpenNewTrade"

interface Props {}

import {
  Container,
  Buttons,
  Section,
  HalfBlock,
  Label,
  Value,
  Pnl,
} from "./styled"

function Trader(props: Props) {
  const {} = props

  const { poolAddress } = useParams<{ poolAddress: string }>()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const redirectToInvestor = () => {
    history.push("/me/investor")
  }

  const handlers = useSwipeable({
    onSwipedRight: () => redirectToInvestor(),
  })

  if (loading) {
    return (
      <Center>
        <GuardSpinner size={20} loading />
      </Center>
    )
  }

  // if (!data) {
  //   return (
  //     <Center>
  //       <Text>Data not available</Text>
  //     </Center>
  //   )
  // }

  return (
    <Container {...handlers}>
      <Section>
        {/* <FundsList /> */}
        <TraderMobile />
      </Section>

      <Section>
        <PnlWidget
          pnlPeriod={{ m1: 22.2, m3: 12.3, all: 102.38 }}
          pnlChart={[]}
        />
        <Block>
          <HalfBlock>
            <Label>Personal funds locked</Label>
            <Value>${formatNumber("32880", 2)}</Value>
            <Pnl side="BUY">{formatNumber("12.342", 2)}%</Pnl>
          </HalfBlock>
          <HalfBlock>
            <Label>Investor’s funds locked</Label>
            <Value>
              {"$"}
              {formatNumber("240123", 2)}
            </Value>
            <Pnl side="SELL">{formatNumber("-2.28", 2)}%</Pnl>
          </HalfBlock>
        </Block>
        <Buttons>
          <To to={`/pool/exchange/${poolAddress}`}>
            <OpenNewTrade />
          </To>
          <Button
            theme="primary"
            onClick={() => history.push(`/pool/${poolAddress}/trades`)}
            fz={16}
            full
          >
            Fund Positions
          </Button>
        </Buttons>
      </Section>
    </Container>
  )
}

export default Trader
