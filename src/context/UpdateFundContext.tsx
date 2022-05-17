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

  validationErrors: IValidationError[]
}

interface IValidationError {
  message: string
  field: string
}

interface IContext extends IState {
  handleChange: (name: string, value: any) => void
  setInitial: (payload: any) => void
  setDefault: () => void
  isIpfsDataUpdated: () => boolean
  isPoolParametersUpdated: () => boolean
  handleValidate: () => boolean
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

  validationErrors: [],
}

const defaultContext = {
  ...defaultState,
  handleChange: () => {},
  setInitial: () => {},
  setDefault: () => {},
  isIpfsDataUpdated: () => false,
  isPoolParametersUpdated: () => false,
  handleValidate: () => false,
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useUpdateFundContext = () => React.useContext(FundContext)

const arrayDifference = (a1: string[], a2: string[]): string[] =>
  a1.filter((x) => !a2.includes(x))
const arrayIntersection = (a1: string[], a2: string[]): string[] =>
  a1.filter((x) => a2.includes(x))
const arrayIncludes = (a: string[], value: string): boolean => a.includes(value)

const propertiesMapping = {
  managers: {
    initial: "managersInitial",
    added: "managersAdded",
    removed: "managersRemoved",
  },
  investors: {
    initial: "investorsInitial",
    added: "investorsAdded",
    removed: "investorsRemoved",
  },
}

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

    validationErrors: [],
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
    const { initial, removed, added } = propertiesMapping[name]
    // Who removed
    const removedAddress = arrayDifference(this.state[name], value)[0]
    const inInitial = arrayIncludes(this.state[initial], removedAddress)

    // Add in list for removing if address has been in initial list
    if (inInitial) {
      this.setState({
        [removed]: [...this.state[removed], removedAddress],
      })
    }

    // Clear added list from removed address
    this.setState({
      [added]: arrayIntersection(this.state[added], value),
    })
  }

  updateAddingList = (name: string, value: any) => {
    const { initial, removed, added } = propertiesMapping[name]
    // Who added
    const addedAddress = arrayDifference(value, this.state[name])[0]
    const inInitial = arrayIncludes(this.state[initial], addedAddress)

    // Add in list for adding if address doesnt been in initial list
    if (!inInitial) {
      this.setState({
        [added]: [...this.state[added], addedAddress],
      })
    }

    // Clear removed list from added address
    this.setState({
      [removed]: this.state[removed].filter((x) => x !== addedAddress),
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

  handleValidate = () => {
    const { totalLPEmission, minimalInvestment } = this.state

    const errors: IValidationError[] = []

    // TOTAL LPEmission

    if (totalLPEmission !== "") {
      if (isNaN(Number(totalLPEmission))) {
        errors.push({
          message: "Total LP emission must be a number",
          field: "totalLPEmission",
        })
      }
    }

    // MINIMAL INVESTMENT

    if (minimalInvestment !== "") {
      if (isNaN(Number(minimalInvestment))) {
        errors.push({
          message: "Minimal investment must be a number",
          field: "minimalInvestment",
        })
      }
    }

    this.setState({ validationErrors: errors })

    return !errors.length
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
          handleValidate: this.handleValidate,
        }}
      >
        {children}
      </FundContext.Provider>
    )
  }
}

export default UpdateFundContext
