import React from "react"
import ReactDOM from "react-dom"
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core"
import { Normalize } from "styled-normalize"
import { createTheme } from "react-data-table-component"

import { Provider } from "react-redux"
import { ModalProvider } from "styled-react-modal"
import { BrowserRouter } from "react-router-dom"
import store from "state"

import App from "pages/App"
import SideBar from "components/Sidebar"
import Alert from "components/Alert"

import SideBarContext from "context/SideBarContext"
import AlertContext from "context/AlertContext"

import GlobalStyle from "theme/GlobalStyle"

import getLibrary from "utils/getLibrary"

import { ContractsRegistryUpdater } from "state/contracts/updater"
import { PriceFeedUpdater } from "state/pricefeed/updater"
import { UserPoolsUpdater } from "state/user/updater"
import "react-virtualized/styles.css"

const Web3ProviderNetwork = createWeb3ReactRoot("NETWORK")

// THEMING
createTheme("dexe", {
  text: {
    primary: "#F5F5F5",
    secondary: "#2aa198",
  },
  background: {
    default: "transparent",
  },
  divider: {
    default: "transparent",
  },
  sortFocus: {
    default: "#F5F5F5",
  },
})

const GlobalComponents = () => (
  <>
    <ContractsRegistryUpdater />
    <UserPoolsUpdater />
    <PriceFeedUpdater />
    <Normalize />
    <GlobalStyle />
    <SideBar />
    <Alert />
  </>
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <SideBarContext>
          <AlertContext>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Web3ProviderNetwork getLibrary={getLibrary}>
                <Provider store={store}>
                  <>
                    <GlobalComponents />
                    <App />
                  </>
                </Provider>
              </Web3ProviderNetwork>
            </Web3ReactProvider>
          </AlertContext>
        </SideBarContext>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
