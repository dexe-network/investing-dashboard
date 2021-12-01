import styled from "styled-components"
import { Flex } from "theme"
import { useSwipeable } from "react-swipeable"
import { Redirect, useHistory } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"

import Button from "components/Button"
import PnlWidget from "components/PnlWidget"
import NotificationsWidget from "components/NotificationsWidget"
import InvestorMobile from "components/InvestorMobile"
import InvestingHistory from "assets/custom-buttons/InvestingHistory"

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
  const { account } = useWeb3React()

  // const [portfolioModalOpen, setPortfolioModal] = useState(false)

  const redirectToTrader = () => {
    history.push("/me/trader/0x...")
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => redirectToTrader(),
  })

  // if (!account || !account.length) {
  //   return <Redirect to="/me" />
  // }

  return (
    <Container
      {...handlers}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...handlers}
    >
      <Section>
        {/* <FundsList /> */}
        <InvestorMobile onArrowClick={() => {}} />
      </Section>

      <Section>
        <PnlWidget pnlPeriod={{ m1: 0, m3: 0, all: 0 }} pnlChart={[]} />
        <NotificationsWidget notifications={[{}]} />
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
