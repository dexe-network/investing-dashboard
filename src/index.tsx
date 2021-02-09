import React from "react"
import ReactDOM from "react-dom"
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core"
import { Normalize } from "styled-normalize"

import { Provider } from "react-redux"

import store from "state"

import App from "pages/App"

import GlobalStyle from "theme/GlobalStyle"

import getLibrary from "utils/getLibrary"

const Web3ProviderNetwork = createWeb3ReactRoot("NETWORK")

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Normalize />
          <GlobalStyle />
          <App />
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
