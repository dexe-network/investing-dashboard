import { Flex } from "theme"
import { useSwipeable } from "react-swipeable"
import { useWeb3React } from "@web3-react/core"
import { Redirect, useHistory } from "react-router-dom"

import Button, { BorderedButton } from "components/Button"
import InvestorMobile from "components/InvestorMobile"

import Chart from "./Chart"
import BarChart from "./Bar"
import { Container, Tab, TabCard, Row, MainText, Buttons } from "./styled"

interface Props {}

function Investor(props: Props) {
  const {} = props

  const history = useHistory()
  const { account } = useWeb3React()

  const redirectToTrader = () => {
    history.push("/me/trader/0x...")
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => redirectToTrader(),
  })

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <InvestorMobile account={account} />
      <TabCard>
        <Tab>Profit & Loss</Tab>
        <Chart />
        <BarChart />
        <Row>
          <MainText>P&L LP - $ETH</MainText>
          <MainText>+ 13.1% (+112.132 ETH)</MainText>
        </Row>
        <Row>
          <MainText>P&L LP - USD% - USD</MainText>
          <MainText>+ 19.1% - 19.1 USD </MainText>
        </Row>
      </TabCard>
      <Buttons>
        <Flex full p="0 20px 0 0">
          <BorderedButton>History</BorderedButton>
        </Flex>
        <Flex full>
          <Button full>New investment</Button>
        </Flex>
      </Buttons>
    </Container>
  )
}

export default Investor
