import React from "react"

interface IContext {
  isSideBarOpen: boolean
  toggleSideBar: () => void
}

const defaultContext = {
  isSideBarOpen: false,
  toggleSideBar: () => {},
}

export const SideBarContextProvider =
  React.createContext<IContext>(defaultContext)

export const useSideBarContext = () => React.useContext(SideBarContextProvider)

class SideBarContext extends React.Component<{
  children: React.ReactNode
}> {
  static contextType = SideBarContextProvider

  state = {
    isSideBarOpen: false,
  }

  toggle = () => {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen })
  }

  render() {
    const { children } = this.props
    const { isSideBarOpen } = this.state

    return (
      <SideBarContextProvider.Provider
        value={{
          isSideBarOpen,
          toggleSideBar: this.toggle,
        }}
      >
        {children}
      </SideBarContextProvider.Provider>
    )
  }
}

export default SideBarContext
