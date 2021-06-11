import styled from "styled-components"
import { Header, Tab, Flex } from "theme"
import { Switch, Route, useLocation } from "react-router-dom"
import Statistics from "pages/Portfolio/Statistics"

interface Props {}

const StyledPortfolio = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding: 0 0 50px;
`

function Portfolio(props: Props) {
  const {} = props
  const {} = props
  const { pathname } = useLocation()

  const STATISTICS = `/portfolio`
  const HISTORY = `/portfolio/history`
  const NEWS = `/portfolio/news`
  const VOTING = `/portfolio/voting`

  return (
    <StyledPortfolio>
      <Flex p="20px 0" jc="center" full>
        <Header>
          <Tab active={pathname === STATISTICS} to={STATISTICS}>
            Statistics
          </Tab>
          <Tab active={pathname === HISTORY} to={HISTORY}>
            History
          </Tab>
          <Tab active={pathname === NEWS} to={NEWS}>
            News
          </Tab>
          <Tab active={pathname === VOTING} to={VOTING}>
            Voting
          </Tab>
        </Header>
      </Flex>

      <Switch>
        <Route exact path={STATISTICS}>
          <Statistics />
        </Route>
        <Route exact path={HISTORY}>
          History
        </Route>
        <Route exact path={NEWS}>
          News
        </Route>
        <Route exact path={VOTING}>
          voting
        </Route>
      </Switch>
    </StyledPortfolio>
  )
}

export default Portfolio
