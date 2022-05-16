import React from "react"

interface IState {
  loading: boolean

  avatarBlobString: string
  assets: string[]

  description: string
  descriptionInitial: string
  strategy: string
  strategyInitial: string

  totalLPEmission: string
  minimalInvestment: string

  managers: string[]
  investors: string[]
}

interface IContext extends IState {
  handleChange: (name: string, value: any) => void
  setInitial: (payload: any) => void
  setDefault: () => void
  isIpfsDataUpdated: () => boolean
}

const defaultState = {
  loading: true,

  avatarBlobString: "",
  assets: [],

  description: "",
  descriptionInitial: "",
  strategy: "",
  strategyInitial: "",

  totalLPEmission: "",
  minimalInvestment: "",

  managers: [],
  investors: [],
}

const defaultContext = {
  ...defaultState,
  handleChange: () => {},
  setInitial: () => {},
  setDefault: () => {},
  isIpfsDataUpdated: () => false,
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
    descriptionInitial: "",
    strategy: "",
    strategyInitial: "",

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
    this.setState({
      loading: false,
      descriptionInitial: payload.description,
      strategyInitial: payload.strategy,
      ...payload,
    })
  }

  setDefault = () => {
    this.setState(defaultState)
  }

  isIpfsDataUpdated = () => {
    if (
      this.state.avatarBlobString !== "" ||
      this.state.description !== this.state.descriptionInitial ||
      this.state.strategy !== this.state.strategyInitial
    ) {
      return true
    }
    return false
  }

  render() {
    const { children } = this.props

    return (
      <FundContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          setInitial: this.setInitial,
          setDefault: this.setDefault,
          isIpfsDataUpdated: this.isIpfsDataUpdated,
        }}
      >
        {children}
      </FundContext.Provider>
    )
  }
}

export default UpdateFundContext
