// import { PoolTypes } from "constants/types"
import { Token } from "constants/interfaces"
import React from "react"

interface IState {
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
}

const defaultState = {
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
}

export const FundContext = React.createContext<IContext>(defaultContext)

export const useCreateFundContext = () => React.useContext(FundContext)

class CreateFundContext extends React.Component {
  static contextType = FundContext

  state = {
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

  render() {
    const { children } = this.props

    return (
      <FundContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
        }}
      >
        {children}
      </FundContext.Provider>
    )
  }
}

export default CreateFundContext
