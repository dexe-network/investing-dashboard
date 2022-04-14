import Div100vh from "react-div-100vh"
import theme from "theme"
import { ThemeProvider } from "styled-components"
import { ModalProvider } from "styled-react-modal"
import UnsupportedChain from "components/UnsupportedChain"

import { useEagerConnect } from "hooks/useEagerConnect"
import { useInactiveListener } from "hooks/useInactiveListener"

import ConnectWalletContext from "context/ConnectWalletContext"

import NotificationsContext from "context/NotificationsContext"

import Routes from "pages/Routes"

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
                <Routes />
              </NotificationsContext>
            </ConnectWalletContext>
          </AppWrapper>
        </Div100vh>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
