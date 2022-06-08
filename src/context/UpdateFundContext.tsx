import React from "react"
import { arrayDifference, arrayIntersection, arrayIncludes } from "utils/array"

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
  setInitialIpfs: (payload: any) => void
  setDefault: () => void
  poolParametersSaveCallback: () => void
  managersRemoveCallback: () => void
  managersAddCallback: () => void
  investorsRemoveCallback: () => void
  investorsAddCallback: () => void
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
  setInitialIpfs: () => {},
  poolParametersSaveCallback: () => {},
  managersRemoveCallback: () => {},
  managersAddCallback: () => {},
  investorsRemoveCallback: () => {},
  investorsAddCallback: () => {},
  isIpfsDataUpdated: () => false,
  isPoolParametersUpdated: () => false,
  handleValidate: () => false,
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useUpdateFundContext = () => React.useContext(FundContext)

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
    const removedAddress = arrayDifference<string>(this.state[name], value)[0]
    const inInitial = arrayIncludes<string>(this.state[initial], removedAddress)

    // Add in list for removing if address has been in initial list
    if (inInitial) {
      this.setState({
        [removed]: [...this.state[removed], removedAddress],
      })
    }

    // Clear added list from removed address
    this.setState({
      [added]: arrayIntersection<string>(this.state[added], value),
    })
  }

  updateAddingList = (name: string, value: any) => {
    const { initial, removed, added } = propertiesMapping[name]
    // Who added
    const addedAddress = arrayDifference<string>(value, this.state[name])[0]
    const inInitial = arrayIncludes<string>(this.state[initial], addedAddress)

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

  // Set initial pool data
  setInitial = (payload: any) => {
    this.setState({
      loading: false,
      investorsInitial: payload.investors,
      managersInitial: payload.managers,
      totalLPEmissionInitial: payload.totalLPEmission,
      minimalInvestmentInitial: payload.minimalInvestment,
      ...payload,
    })
  }

  // Set initial data from IPFS
  setInitialIpfs = (payload: any) => {
    this.setState({
      descriptionInitial: payload.description,
      strategyInitial: payload.strategy,
      ...payload,
    })
  }

  setDefault = () => {
    this.setState(defaultState)
  }

  // Clean pool parameters state after saving
  poolParametersSaveCallback = () => {
    this.setState({
      avatarBlobString: "",
      assets: [...this.state.assets, this.state.avatarBlobString],
      descriptionInitial: this.state.description,
      strategyInitial: this.state.strategy,
      totalLPEmissionInitial: this.state.totalLPEmission,
      minimalInvestmentInitial: this.state.minimalInvestment,
    })
  }

  // Clean managers state after removing
  managersRemoveCallback = () => {
    const newManagersInitial = arrayDifference(
      this.state.managersInitial,
      this.state.managersRemoved
    )

    this.setState({
      managersInitial: newManagersInitial,
      managersRemoved: [],
    })
  }

  // Clean managers state after adding
  managersAddCallback = () => {
    const newManagersInitial = [
      ...this.state.managersInitial,
      ...this.state.managersAdded,
    ]

    this.setState({
      managersInitial: newManagersInitial,
      managersAdded: [],
    })
  }

  // Clean investors state after removing
  investorsRemoveCallback = () => {
    const newInvestorsInitial = arrayDifference(
      this.state.investorsInitial,
      this.state.investorsRemoved
    )

    this.setState({
      investorsInitial: newInvestorsInitial,
      investorsRemoved: [],
    })
  }

  // Clean investors state after adding
  investorsAddCallback = () => {
    const newInvestorsInitial = [
      ...this.state.investorsInitial,
      ...this.state.investorsAdded,
    ]

    this.setState({
      investorsInitial: newInvestorsInitial,
      investorsAdded: [],
    })
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
          setInitialIpfs: this.setInitialIpfs,
          setDefault: this.setDefault,
          poolParametersSaveCallback: this.poolParametersSaveCallback,
          managersRemoveCallback: this.managersRemoveCallback,
          managersAddCallback: this.managersAddCallback,
          investorsRemoveCallback: this.investorsRemoveCallback,
          investorsAddCallback: this.investorsAddCallback,
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
