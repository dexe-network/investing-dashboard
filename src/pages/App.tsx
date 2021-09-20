import { lazy, Suspense, useEffect } from "react"
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom"
import Div100vh from "react-div-100vh"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import theme, { External, device } from "theme"
import styled, { ThemeProvider } from "styled-components"
import { ModalProvider } from "styled-react-modal"
import Menu, { BottomMenu } from "components/Menu"

import background from "assets/background/dashboard-overlay.png"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

import CreateFundContext from "context/CreateFundContext"
import ConnectWalletContext from "context/ConnectWalletContext"

const TopMembers = lazy(() => import("pages/TopMembers"))
const Portfolio = lazy(() => import("pages/Portfolio"))
const Invest = lazy(() => import("pages/Invest"))
const ProfileSwitcher = lazy(() => import("pages/ProfileSwitcher"))
const Investor = lazy(() => import("pages/Investor"))
const Trader = lazy(() => import("pages/Trader"))
const Swap = lazy(() => import("pages/Swap"))
const Trades = lazy(() => import("pages/Trades"))

import NotificationsContext from "context/NotificationsContext"
import { usePools } from "state/pools/hooks"

const SpecialModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: linear-gradient(
    214deg,
    rgba(41, 49, 52, 0.6) -50%,
    rgba(53, 52, 75, 0.6) 100%
  );
  backdrop-filter: blur(3px);
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;

  @media only screen and (${device.sm}) {
    bottom: 62px;
    height: auto;
  }
`

const AppWrapper = styled.div`
  display: grid;
  min-height: -webkit-fill-available;
  background: #202020;
  grid-template-columns: 50px 1fr;
  grid-template-areas: "menu content";
  height: inherit;

  @media only screen and (${device.sm}) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 62px;
    grid-template-areas: "content" "bottom";
    gap: 0px 0px;
    justify-items: stretch;
    align-items: stretch;
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
  grid-area: content;

  @media only screen and (${device.xs}) {
    /* padding-bottom: 62px; */
  }
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
      <ModalProvider backgroundComponent={SpecialModalBackground}>
        {isUnsupportedChainIdError && (
          <Unsupported>
            Unsupported network selected. See{" "}
            <External href="https://dexe.network">
              how to setup network connection
            </External>
          </Unsupported>
        )}
        <Div100vh>
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
                          {/* INVESTOR */}
                          <Route path="/portfolio">
                            <Portfolio />
                          </Route>
                          <Route path="/me">
                            <ProfileSwitcher />
                          </Route>
                          <Route path="/investor">
                            <Investor />
                          </Route>

                          {/* POOLS */}
                          <Route exact path="/pools">
                            <TopMembers />
                          </Route>

                          {/* Trader info */}
                          <Route exact path="/pool/:poolAddress">
                            <Trader />
                          </Route>
                          <Route exact path="/pool/:poolAddress/trades">
                            <Trades />
                          </Route>

                          {/* Trader/Investor operations */}
                          <Route exact path="/pool/:poolAddress/invest">
                            <Invest />
                          </Route>
                          <Route exact path="/pool/:poolAddress/exchange">
                            <Swap />
                          </Route>

                          {/* MAIN page */}
                          <Route exact path="/">
                            <Redirect to="/pools" />
                          </Route>
                        </Switch>
                      </CreateFundContext>
                    </Suspense>
                  </Content>
                  <BottomMenu />
                </Router>
              </NotificationsContext>
            </ConnectWalletContext>
          </AppWrapper>
        </Div100vh>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
