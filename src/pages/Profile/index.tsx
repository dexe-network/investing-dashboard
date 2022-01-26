import { useState, useEffect, useCallback } from "react"
import MemberMobile from "components/MemberMobile"
import Button, { SecondaryButton } from "components/Button"
import { useSelector } from "react-redux"
import { AppState } from "state"
import { useParams } from "react-router-dom"
import PnlWidget from "components/PnlWidget"
import FundsWidget from "components/FundsWidget"
import FundDetailsCard from "components/FundDetailsCard"
import FundStatisticsCard from "components/FundStatisticsCard"
import NavTabs from "components/NavTabs"
import { Container, ButtonContainer, Details } from "./styled"
import { Flex } from "theme"

interface Props {}

const Profile: React.FC<Props> = () => {
  const { poolAddress } = useParams<{ poolAddress: string }>()
  // TODO: refactor to normalized state
  const poolData = useSelector((state: AppState) => {
    const pool = state.pools.list.filter(
      (value) => value.address === poolAddress
    )
    return pool.length ? pool[0] : null
  })

  if (!poolData) {
    return <Container>no data</Container>
  }

  return (
    <Container>
      <MemberMobile data={poolData}>
        <ButtonContainer>
          <SecondaryButton size="small">Investing history</SecondaryButton>
          <Button m="0" size="small">
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
