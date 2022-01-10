import Div100vh from "react-div-100vh"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import theme, { External } from "theme"
import { ThemeProvider } from "styled-components"
import { ModalProvider } from "styled-react-modal"
import Menu from "components/Menu"
import TapBar from "components/TapBar"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

import ConnectWalletContext from "context/ConnectWalletContext"

import NotificationsContext from "context/NotificationsContext"

import Routes from "pages/Routes"

import {
  SpecialModalBackground,
  AppWrapper,
  Unsupported,
} from "theme/GlobalStyle"

const App = () => {
  const eager = useEagerConnect()
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
            <ConnectWalletContext>
              <NotificationsContext>
                <Menu />
                <Routes />
                <TapBar />
              </NotificationsContext>
            </ConnectWalletContext>
          </AppWrapper>
        </Div100vh>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
