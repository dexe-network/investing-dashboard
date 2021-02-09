import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import Menu from "components/Menu"
import Portfolio from "pages/Portfolio"
import TopMembers from "pages/TopMembers"
import Profile from "pages/Profile"

import background from "assets/background/dashboard-overlay.png"

import theme from "theme"

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
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Overlay />
        <Router>
          <Menu />
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
        </Router>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
