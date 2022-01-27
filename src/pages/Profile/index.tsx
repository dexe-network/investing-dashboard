import { useState, useEffect, useCallback } from "react"
import MemberMobile from "components/MemberMobile"
import Button, { SecondaryButton } from "components/Button"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import PnlWidget from "components/PnlWidget"
import FundsWidget from "components/FundsWidget"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import NavTabs from "components/NavTabs"
import { selectBasicPoolByAddress } from "state/pools/selectors"
import { Container, ButtonContainer, Details } from "./styled"
import { Flex } from "theme"
import { AppState } from "state"

interface Props {}

const Profile: React.FC<Props> = () => {
  const { poolAddress } = useParams<{ poolAddress: string }>()
  const history = useHistory()
  const poolData = useSelector((state: AppState) =>
    selectBasicPoolByAddress(state, poolAddress)
  )

  const handleBuyRedirect = () => {
    history.push(`/pool/invest/${poolData?.address}`)
  }

  if (!poolData) {
    return <Container>no data</Container>
  }

  return (
    <Container>
      <MemberMobile data={poolData}>
        <ButtonContainer>
          <SecondaryButton size="small">Investing history</SecondaryButton>
          <Button onClick={handleBuyRedirect} m="0" size="small">
            Buy {poolData.ticker}
          </Button>
        </ButtonContainer>
      </MemberMobile>

      <Flex full p="16px 0 6px">
        <PnlWidget
          pnlPeriod={{ m1: 22.2, m3: 12.3, all: 102.38 }}
          pnlChart={[]}
        />
      </Flex>

      <Flex full p="6px 0">
        <FundsWidget />
      </Flex>

      <Details>
        <NavTabs
          tabs={[
            { name: "Details", component: <FundDetailsCard /> },
            { name: "Statistic", component: <FundStatisticsCard /> },
          ]}
        />
      </Details>
    </Container>
  )
}

export default Profile
