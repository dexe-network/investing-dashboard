import React from "react"
import ReactDOM from "react-dom"
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core"
import { Normalize } from "styled-normalize"
import { createTheme } from "react-data-table-component"
import { BrowserRouter as Router } from "react-router-dom"

import { Provider } from "react-redux"
import { ModalProvider } from "styled-react-modal"
import store from "state"

import App from "pages/App"

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
  </>
)

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Provider store={store}>
            <Router>
              <>
                <GlobalComponents />
                <App />
              </>
            </Router>
          </Provider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
