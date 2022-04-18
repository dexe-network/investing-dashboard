import React from "react"

interface IContext {
  isWalletOpen: boolean
  toggleConnectWallet: (v?: boolean) => void
}

const defaultContext = {
  isWalletOpen: false,
  toggleConnectWallet: () => {},
}

export const WalletContext = React.createContext<IContext>(defaultContext)

export const useConnectWalletContext = () => React.useContext(WalletContext)

class ConnectWalletContext extends React.Component<{
  children: React.ReactNode
}> {
  static contextType = WalletContext

  state = {
    isWalletOpen: false,
  }

  toggleModal = (value = !this.state.isWalletOpen) => {
    this.setState({ isWalletOpen: value })
  }

  render() {
    const { children } = this.props
    const { isWalletOpen } = this.state

    return (
      <WalletContext.Provider
        value={{
          isWalletOpen,
          toggleConnectWallet: this.toggleModal,
        }}
      >
        {children}
      </WalletContext.Provider>
    )
  }
}

export default ConnectWalletContext
