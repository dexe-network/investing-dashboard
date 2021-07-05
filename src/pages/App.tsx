import { lazy, Suspense, useEffect } from "react"
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import theme, { External, device } from "theme"
import styled, { ThemeProvider } from "styled-components"
import Menu from "components/Menu"

import background from "assets/background/dashboard-overlay.png"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

import CreateFundContext from "context/CreateFundContext"
import ConnectWalletContext from "context/ConnectWalletContext"

const TopMembers = lazy(() => import("pages/TopMembers"))
const Portfolio = lazy(() => import("pages/Portfolio"))
const Invest = lazy(() => import("pages/Invest"))
const Profile = lazy(() => import("pages/Profile"))
import NotificationsContext from "context/NotificationsContext"
import { usePools } from "state/pools/hooks"

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  background: #202020;

  @media only screen and (${device.sm}) {
    grid-template-columns: 1fr;
  }
`

const Overlay = styled.div`
  background: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  usePools()

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
                      <Route exact path="/pools">
                        <TopMembers />
                      </Route>
                      <Route path="/portfolio">
                        <Portfolio />
                      </Route>
                      <Route path="/pools/invest/:address">
                        <Invest />
                      </Route>
                      <Route exact path="/">
                        <Redirect to="/pools" />
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
