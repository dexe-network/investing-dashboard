import Div100vh from "react-div-100vh"
import theme from "theme"
import { useEffect } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ModalProvider } from "styled-react-modal"
import Menu from "components/Menu"
import TapBar from "components/TapBar"
import UnsupportedChain from "components/UnsupportedChain"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"
import useDefaultConnector from "hooks/useDefaultConnector"

import ConnectWalletContext from "context/ConnectWalletContext"

import NotificationsContext from "context/NotificationsContext"

import Routes from "pages/Routes"
import Welcome from "pages/Welcome"

import { SpecialModalBackground, AppWrapper } from "theme/GlobalStyle"

const App = () => {
  const eager = useEagerConnect()
  useInactiveListener(eager)
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider backgroundComponent={SpecialModalBackground}>
        <UnsupportedChain />
        <Div100vh>
          <AppWrapper>
            <ConnectWalletContext>
              <NotificationsContext>
                <Welcome>
                  <>
                    <Routes />
                    <TapBar />
                  </>
                </Welcome>
              </NotificationsContext>
            </ConnectWalletContext>
          </AppWrapper>
        </Div100vh>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
