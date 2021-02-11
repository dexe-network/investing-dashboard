import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom"
import theme from "theme"
import styled, { ThemeProvider } from "styled-components"
import Menu from "components/Menu"
import Portfolio from "pages/Portfolio"
import TopMembers from "pages/TopMembers"
import Profile from "pages/Profile"

import background from "assets/background/dashboard-overlay.png"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  background: #202020;
`

const Overlay = styled.div`
  background: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Content = styled.div`
  z-index: 5;
  padding-top: 75px;
`

const App = () => {
  const eager = useEagerConnect()
  useInactiveListener(eager)

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Overlay />
        <Router>
          <Menu />
          <Content>
            <Switch>
              <Route exact path="/portfolio">
                <Portfolio />
              </Route>
              <Route exact path="/top-members">
                <TopMembers />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/">
                <Redirect to="/top-members" />
              </Route>
            </Switch>
          </Content>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
