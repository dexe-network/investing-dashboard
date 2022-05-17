import { Token } from "constants/interfaces"
import { sliderPropsByPeriodType, performanceFees } from "constants/index"
import React from "react"

interface IState {
  avatarBlobString: string
  fundType: string
  fundName: string
  fundSymbol: string
  ipfsHash: string
  description: string
  strategy: string
  trader: string
  privatePool: boolean
  totalLPEmission: string
  baseToken: Token
  minimalInvestment: string
  commissionPeriod: number
  commissionPercentage: number
  managers: string[]
  investors: string[]
  validationErrors: IValidationError[]
}

interface IValidationError {
  message: string
  field: string
}

interface IContext extends IState {
  handleChange: (name: string, value: any) => void
  handleValidate: () => boolean
}

const defaultState = {
  avatarBlobString: "",
  fundType: "basic",
  fundName: "",
  fundSymbol: "",
  ipfsHash: "",
  description: "",
  strategy: "",
  trader: "",
  privatePool: false,
  totalLPEmission: "",
  baseToken: {
    address: "",
    name: "",
    symbol: "",
    decimals: 0,
  },
  minimalInvestment: "",
  commissionPeriod: 0,
  commissionPercentage: 30,
  managers: [],
  investors: [],
  validationErrors: [],
}

const defaultContext = {
  ...defaultState,
  handleChange: () => {},
  handleValidate: () => false,
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useCreateFundContext = () => React.useContext(FundContext)

class CreateFundContext extends React.Component {
  static contextType = FundContext

  state = {
    avatarBlobString: "",
    fundType: "basic",
    fundName: "",
    fundSymbol: "",
    ipfsHash: "",
    description: "",
    strategy: "",
    trader: "",
    privatePool: false,
    totalLPEmission: "",
    baseToken: {
      address: "",
      name: "",
      symbol: "",
      decimals: 0,
    },
    minimalInvestment: "",
    commissionPeriod: 0,
    commissionPercentage: 30,
    managers: [],
    investors: [],
    validationErrors: [],
  }

  // TODO: useCallback
  handleChange = (name: string, value: any) => {
    if (Object.prototype.toString.call(value) === "[object Array]") {
      this.setState({
        [name]: [...value],
      })
      return
    }

    this.setState({ [name]: value })
  }

  handleValidate = () => {
    const {
      fundName,
      fundSymbol,
      baseToken,
      totalLPEmission,
      minimalInvestment,
      commissionPeriod,
      commissionPercentage,
    } = this.state

    const errors: IValidationError[] = []

    // FUND NAME
    if (fundName === "") {
      errors.push({
        message: "Fund name is required",
        field: "fundName",
      })
    }

    if (fundName.length > 15) {
      errors.push({
        message: "Fund name must be less than 15 characters",
        field: "fundName",
      })
    }

    // FUND SYMBOL
    if (fundSymbol === "") {
      errors.push({
        message: "Fund symbol is required",
        field: "fundSymbol",
      })
    }

    if (fundSymbol.length > 8) {
      errors.push({
        message: "Fund symbol must be less than 8 characters",
        field: "fundSymbol",
      })
    }

    // BASE TOKEN

    if (baseToken.address === "") {
      errors.push({
        message: "Base token is required",
        field: "baseToken",
      })
    }

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

    // COMMISSION PERIOD PERCENTAGE

    if (sliderPropsByPeriodType[commissionPeriod].min > commissionPercentage) {
      errors.push({
        message: "Commission percentage must be greater than minimum value",
        field: "commissionPercentage",
      })
    }

    if (sliderPropsByPeriodType[commissionPeriod].max < commissionPercentage) {
      errors.push({
        message: "Commission percentage must be less than maximum value",
        field: "commissionPercentage",
      })
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
          handleValidate: this.handleValidate,
        }}
      >
        {children}
      </FundContext.Provider>
    )
  }
}

export default CreateFundContext
