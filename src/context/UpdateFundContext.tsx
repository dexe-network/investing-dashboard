import React from "react"

interface IState {
  loading: boolean

  avatarBlobString: string
  assets: string[]

  description: string
  strategy: string

  totalLPEmission: string
  minimalInvestment: string

  managers: string[]
  investors: string[]
}

interface IContext extends IState {
  handleChange: (name: string, value: any) => void
  setInitial: (payload: any) => void
}

const defaultState = {
  loading: true,

  avatarBlobString: "",
  assets: [],

  description: "",
  strategy: "",

  totalLPEmission: "",
  minimalInvestment: "",

  managers: [],
  investors: [],
}

const defaultContext = {
  ...defaultState,
  handleChange: () => {},
  setInitial: () => {},
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useUpdateFundContext = () => React.useContext(FundContext)

class UpdateFundContext extends React.Component {
  static contextType = FundContext

  state = {
    loading: true,

    avatarBlobString: "",
    assets: [],

    description: "",
    strategy: "",

    totalLPEmission: "",
    minimalInvestment: "",

    managers: [],
    investors: [],
  }

  handleChange = (name: string, value: any) => {
    if (Object.prototype.toString.call(value) === "[object Array]") {
      this.setState({
        [name]: [...value],
      })
      return
    }

    this.setState({ [name]: value })
  }

  setInitial = (payload: any) => {
    this.setState({ loading: false, ...payload })
  }

  render() {
    const { children } = this.props

    return (
      <FundContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          setInitial: this.setInitial,
        }}
      >
        {children}
      </FundContext.Provider>
    )
  }
}

export default UpdateFundContext
