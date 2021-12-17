import React from "react"
import Popover from "components/Popover"

interface IContext {
  isOpen: boolean
  toggle: (v?: boolean) => void
}

const defaultContext = {
  isOpen: false,
  toggle: () => {},
}

export const PopoverContextProvider = React.createContext<IContext>(
  defaultContext
)

export const usePopoverContext = () => React.useContext(PopoverContextProvider)

class PopoverContext extends React.Component<{
  children: React.ReactNode
}> {
  static contextType = PopoverContextProvider

  state = {
    isOpen: false,
  }

  toggleModal = (value = !this.state.isOpen) => {
    this.setState({ isOpen: value })
  }

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    return (
      <PopoverContextProvider.Provider
        value={{
          isOpen,
          toggle: this.toggleModal,
        }}
      >
        <Popover
          title="Connect Wallet"
          isOpen={isOpen}
          toggle={this.toggleModal}
        />
        {children}
      </PopoverContextProvider.Provider>
    )
  }
}

export default PopoverContext
