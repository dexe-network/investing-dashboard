import { lazy, Suspense, useEffect } from "react"
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import theme, { External } from "theme"
import styled, { ThemeProvider } from "styled-components"
import Menu from "components/Menu"

import background from "assets/background/dashboard-overlay.png"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

import CreateFundContext from "context/CreateFundContext"
import ConnectWalletContext from "context/ConnectWalletContext"

const TopMembers = lazy(() => import("pages/TopMembers"))
const Profile = lazy(() => import("pages/Profile"))
const Portfolio = lazy(() => import("pages/Portfolio"))
import NotificationsContext from "context/NotificationsContext"

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
`

const Unsupported = styled.div`
  background: rgb(252, 14, 14);
  color: #fff;
  padding: 5px;
  text-align: center;
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const resizeListener = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

const App = () => {
  const eager = useEagerConnect()
  useInactiveListener(eager)

  const { error } = useWeb3React()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  useEffect(() => {
    resizeListener()
    window.addEventListener("resize", resizeListener)

    return () => {
      window.removeEventListener("resize", resizeListener)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {isUnsupportedChainIdError && (
        <Unsupported>
          Unsupported network selected. See{" "}
          <External href="https://dexe.network">
            how to setup network connection
          </External>
        </Unsupported>
      )}
      <AppWrapper>
        <Overlay />
        <ConnectWalletContext>
          <NotificationsContext>
            <Router>
              <Menu />
              <Content>
                <Suspense fallback={null}>
                  <CreateFundContext>
                    <Switch>
                      <Route path="/top-members">
                        <TopMembers />
                      </Route>
                      <Route path="/profile">
                        <Profile />
                      </Route>
                      <Route path="/portfolio">
                        <Portfolio />
                      </Route>
                      <Route exact path="/">
                        <Redirect to="/top-members" />
                      </Route>
                    </Switch>
                  </CreateFundContext>
                </Suspense>
              </Content>
            </Router>
          </NotificationsContext>
        </ConnectWalletContext>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
