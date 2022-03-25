import React from "react"

import Notifications from "components/Notifications"

interface IContext {
  isNotificationsOpen: boolean
  toggleNotifications: (v?: boolean) => void
}

const defaultContext = {
  isNotificationsOpen: false,
  toggleNotifications: () => {},
}

export const NotificationsContextProvider =
  React.createContext<IContext>(defaultContext)

export const useNotificationsContext = () =>
  React.useContext(NotificationsContextProvider)

class NotificationsContext extends React.Component<{
  children: React.ReactNode
}> {
  static contextType = NotificationsContextProvider

  state = {
    isNotificationsOpen: false,
  }

  toggleModal = (value = !this.state.isNotificationsOpen) => {
    this.setState({ isNotificationsOpen: value })
  }

  render() {
    const { children } = this.props
    const { isNotificationsOpen } = this.state

    return (
      <NotificationsContextProvider.Provider
        value={{
          isNotificationsOpen,
          toggleNotifications: this.toggleModal,
        }}
      >
        {children}
        <Notifications
          isOpen={isNotificationsOpen}
          onRequestClose={() => this.toggleModal(false)}
        />
      </NotificationsContextProvider.Provider>
    )
  }
}

export default NotificationsContext
