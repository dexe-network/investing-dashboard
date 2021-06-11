import React from "react"

import CreateFund from "modals/CreateFund"

interface IContext {
  isCreateFundOpen: boolean
  toggleCreateFund: (v?: boolean) => void
}

const defaultContext = {
  isCreateFundOpen: false,
  toggleCreateFund: () => {},
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useCreateFundContext = () => React.useContext(FundContext)

class CreateFundContext extends React.Component<{ children: React.ReactNode }> {
  static contextType = FundContext

  state = {
    isCreateFundOpen: false,
  }

  toggleModal = (value = !this.state.isCreateFundOpen) => {
    this.setState({ isCreateFundOpen: value })
  }

  render() {
    const { children } = this.props
    const { isCreateFundOpen } = this.state

    return (
      <FundContext.Provider
        value={{
          isCreateFundOpen,
          toggleCreateFund: this.toggleModal,
        }}
      >
        {children}
        <CreateFund
          isOpen={isCreateFundOpen}
          onRequestClose={() => this.toggleModal(false)}
        />
      </FundContext.Provider>
    )
  }
}

export default CreateFundContext
