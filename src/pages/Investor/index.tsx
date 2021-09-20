import { useState } from "react"
import styled from "styled-components"
import { Flex } from "theme"
import { useSwipeable } from "react-swipeable"
import { Redirect, useHistory } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"

import Button from "components/Button"
import PnlWidget from "components/PnlWidget"
import FundsList from "components/FundsList"
import InvestorMobile from "components/InvestorMobile"
import { useSelectOwnedPools } from "state/user/hooks"
import InvestingHistory from "assets/custom-buttons/InvestingHistory"

import { useSelectUserData } from "state/user/hooks"

import { Section, Buttons } from "pages/Trader/styled"

const Container = styled(Flex)`
  width: 100%;
  padding: 33px 22px;
  flex-direction: column;
  justify-content: space-between;
  min-height: fill-available;
  max-height: fill-available;
  overflow-y: auto;
`

interface Props {}

function Investor(props: Props) {
  const {} = props

  const history = useHistory()
  const user = useSelectUserData()
  const { account } = useWeb3React()
  const ownedPools = useSelectOwnedPools()

  const [portfolioModalOpen, setPortfolioModal] = useState(false)

  const redirectToTrader = () => {
    if (ownedPools && ownedPools.length) {
      history.push(`/pool/${ownedPools[0].poolAdr}`)
      return
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => redirectToTrader(),
  })

  if (!account || !account.length) {
    return <Redirect to="/me" />
  }

  return (
    <Container {...handlers}>
      <Section>
        <FundsList />
        <InvestorMobile onArrowClick={() => {}} />
      </Section>

      <Section>
        <PnlWidget pnlPeriod={{ m1: 0, m3: 0, all: 0 }} pnlChart={[]} />

        <Buttons>
          <InvestingHistory />
          <Button theme="primary" onClick={() => {}} fz={16} full>
            New investment
          </Button>
        </Buttons>
      </Section>
    </Container>
  )
}

export default Investor
