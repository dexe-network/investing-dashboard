import React from "react"

export enum AlertType {
  info = "info",
  warning = "warning",
}

interface IAlert {
  type?: AlertType | null
  title?: string | null
  content: React.ReactNode
  hideDuration?: number
}
interface IContext extends IAlert {
  isOpen: boolean
  showAlert: ({}: IAlert) => void
  hideAlert: () => void
}

const defaultState = {
  isOpen: false,
  type: null,
  title: null,
  content: null,
  hideDuration: 0,
}
const defaultContext = {
  ...defaultState,
  showAlert: () => {},
  hideAlert: () => {},
}

export const AlertContextProvider =
  React.createContext<IContext>(defaultContext)

export const useAlertContext = () => React.useContext(AlertContextProvider)

class AlertContext extends React.Component<{
  children: React.ReactNode
}> {
  static contextType = AlertContextProvider

  state = {
    isOpen: false,
    type: null,
    title: null,
    content: null,
    hideDuration: 0,
  }

  show = ({ type = null, title = null, content, hideDuration = 0 }: IAlert) => {
    this.setState({ isOpen: true, type, title, content, hideDuration })

    if (hideDuration && hideDuration > 0) {
      this.hideAfterTimeout(hideDuration)
    }
  }

  hideAfterTimeout = (d?: number) => {
    const timeout = setTimeout(() => {
      this.hide()
      clearTimeout(timeout)
    }, d)
  }

  hide = () => {
    this.setState(defaultState)
  }

  render() {
    const { children } = this.props
    const { isOpen, type, title, content, hideDuration } = this.state

    return (
      <AlertContextProvider.Provider
        value={{
          isOpen,
          type,
          title,
          content,
          hideDuration,
          showAlert: this.show,
          hideAlert: this.hide,
        }}
      >
        {children}
      </AlertContextProvider.Provider>
    )
  }
}

export default AlertContext
