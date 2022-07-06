import { BigNumber } from "@ethersproject/bignumber"

export interface IDivestAmountsAndCommissions {
  comissions: {
    dexeBaseCommission: BigNumber
    dexeDexeCommission: BigNumber
    traderBaseCommission: BigNumber
  }
  receptions: {
    baseAmount: BigNumber
    givenAmounts: BigNumber[]
    lpAmount: BigNumber
    positions: string[]
    receivedAmounts: BigNumber[]
  }
}

export interface IPoolInvestTokens {
  baseAmount: BigNumber
  givenAmounts: BigNumber[]
  lpAmount: BigNumber
  positions: string[]
  receivedAmounts: BigNumber[]
}
