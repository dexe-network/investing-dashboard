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
  totalLPEmissionInitial: string
  minimalInvestment: string
  minimalInvestmentInitial: string

  managers: string[]
  managersInitial: string[]
  managersAdded: string[]
  managersRemoved: string[]

  investors: string[]
  investorsInitial: string[]
  investorsAdded: string[]
  investorsRemoved: string[]
}

interface IContext extends IState {
  handleChange: (name: string, value: any) => void
  setInitial: (payload: any) => void
  setDefault: () => void
  isIpfsDataUpdated: () => boolean
  isPoolParametersUpdated: () => boolean
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
  totalLPEmissionInitial: "",
  minimalInvestment: "",
  minimalInvestmentInitial: "",

  managers: [],
  managersInitial: [],
  managersAdded: [],
  managersRemoved: [],

  investors: [],
  investorsInitial: [],
  investorsAdded: [],
  investorsRemoved: [],
}

const defaultContext = {
  ...defaultState,
  handleChange: () => {},
  setInitial: () => {},
  setDefault: () => {},
  isIpfsDataUpdated: () => false,
  isPoolParametersUpdated: () => false,
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useUpdateFundContext = () => React.useContext(FundContext)

const arrayDifference = (a1: string[], a2: string[]): string[] =>
  a1.filter((x) => !a2.includes(x))
const arrayIntersection = (a1: string[], a2: string[]): string[] =>
  a1.filter((x) => a2.includes(x))
const arrayIncludes = (a: string[], value: string): boolean => a.includes(value)

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
    totalLPEmissionInitial: "",
    minimalInvestment: "",
    minimalInvestmentInitial: "",

    managers: [],
    managersInitial: [],
    managersAdded: [],
    managersRemoved: [],

    investors: [],
    investorsInitial: [],
    investorsAdded: [],
    investorsRemoved: [],
  }

  handleChange = (name: string, value: any) => {
    if (Object.prototype.toString.call(value) === "[object Array]") {
      if (value.length < this.state[name].length) {
        this.updateRemovedList(name, value)
      } else {
        this.updateAddingList(name, value)
      }

      this.setState({
        [name]: [...value],
      })

      return
    }

    this.setState({ [name]: value })
  }

  updateRemovedList = (name: string, value: any) => {
    // Who removed
    const removed = arrayDifference(this.state[name], value)[0]
    const inInitial = arrayIncludes(this.state[`${name}Initial`], removed)

    // Add in list for removing if address has been in initial list
    if (inInitial) {
      this.setState({
        [`${name}Removed`]: [...this.state[`${name}Removed`], removed],
      })
    }

    // Clear added list from removed address
    this.setState({
      [`${name}Added`]: arrayIntersection(this.state[`${name}Added`], value),
    })
  }

  updateAddingList = (name: string, value: any) => {
    // Who added
    const added = arrayDifference(value, this.state[name])[0]
    const inInitial = arrayIncludes(this.state[`${name}Initial`], added)

    // Add in list for adding if address doesnt been in initial list
    if (!inInitial) {
      this.setState({
        [`${name}Added`]: [...this.state[`${name}Added`], added],
      })
    }

    // Clear removed list from added address
    this.setState({
      [`${name}Removed`]: this.state[`${name}Removed`].filter(
        (x) => x !== added
      ),
    })
  }

  setInitial = (payload: any) => {
    this.setState({
      loading: false,
      descriptionInitial: payload.description,
      strategyInitial: payload.strategy,
      investorsInitial: payload.investors,
      managersInitial: payload.managers,
      totalLPEmissionInitial: payload.totalLPEmission,
      minimalInvestmentInitial: payload.minimalInvestment,
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

  isPoolParametersUpdated = () => {
    if (
      this.isIpfsDataUpdated() ||
      this.state.totalLPEmission !== this.state.totalLPEmissionInitial ||
      this.state.minimalInvestment !== this.state.minimalInvestmentInitial
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
          isPoolParametersUpdated: this.isPoolParametersUpdated,
        }}
      >
        {children}
      </FundContext.Provider>
    )
  }
}

export default UpdateFundContext
