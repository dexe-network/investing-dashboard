import { lazy, Suspense, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom"
import Div100vh from "react-div-100vh"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import theme, { External } from "theme"
import { ThemeProvider } from "styled-components"
import { ModalProvider } from "styled-react-modal"
import Menu, { BottomMenu } from "components/Menu"
import ProfileHeader from "components/ProfileHeader"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

import CreateFundContext from "context/CreateFundContext"
import ConnectWalletContext from "context/ConnectWalletContext"

const TopMembers = lazy(() => import("pages/TopMembers"))
const NewFund = lazy(() => import("pages/NewFund"))
const Invest = lazy(() => import("pages/Invest"))
const Welcome = lazy(() => import("pages/Welcome"))
const Investor = lazy(() => import("pages/Investor"))
const Trader = lazy(() => import("pages/Trader"))
const Swap = lazy(() => import("pages/Swap"))
const Trades = lazy(() => import("pages/Trades"))

import NotificationsContext from "context/NotificationsContext"

import {
  SpecialModalBackground,
  AppWrapper,
  Overlay,
  Content,
  Unsupported,
  RestrictedContainer,
} from "theme/GlobalStyle"

const App = () => {
  const eager = useEagerConnect()
  const location = useLocation()
  const { error } = useWeb3React()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  useInactiveListener(eager)

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
                <Menu />
                <Content>
                  <Suspense fallback={null}>
                    <CreateFundContext>
                      <AnimatePresence exitBeforeEnter initial>
                        <Switch location={location} key={location.pathname}>
                          {/* INVESTOR */}
                          <Route path="/me">
                            <RestrictedContainer>
                              <ProfileHeader />

                              <Route exact path="/me/investor">
                                <Investor />
                              </Route>

                              <Route exact path="/me/trader/:poolAddress">
                                <Trader />
                              </Route>
                              <Route exact path="/me">
                                <Welcome />
                              </Route>
                            </RestrictedContainer>
                          </Route>

                          <Route path="/new-fund">
                            <NewFund />
                          </Route>

                          {/* POOLS */}
                          <Route exact path="/">
                            <TopMembers />
                          </Route>

                          {/* INVESTOR */}
                          <Route exact path="/investor/history/:type/:account">
                            <Trades />
                          </Route>

                          {/* Trader info */}
                          <Route exact path="/pool/history/:type/:address">
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
                          {/* <Route exact path="/">
                            <Redirect to="/pools" />
                          </Route> */}
                        </Switch>
                      </AnimatePresence>
                    </CreateFundContext>
                  </Suspense>
                </Content>
                <BottomMenu />
              </NotificationsContext>
            </ConnectWalletContext>
          </AppWrapper>
        </Div100vh>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
