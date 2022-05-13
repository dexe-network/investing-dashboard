import { Token } from "constants/interfaces"
import React from "react"

interface IState {
  loading: boolean
  assets: string[]
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
  ownInvestments: string
  minimalInvestment: string
  commissionPeriod: number
  commissionPercentage: number
  managers: string[]
  investors: string[]
}

interface IContext extends IState {
  handleChange: (name: string, value: any) => void
  setInitial: (payload: any) => void
}

const defaultState = {
  loading: true,
  assets: [],
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
  ownInvestments: "",
  minimalInvestment: "",
  commissionPeriod: 0,
  commissionPercentage: 30,
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
    assets: [],
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
    ownInvestments: "",
    minimalInvestment: "",
    commissionPeriod: 0,
    commissionPercentage: 30,
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
