import { BigNumber } from "ethers"

export interface IProposalInvestTokens {
  baseAmount: BigNumber
  lp2Amount: BigNumber
  positionAmount: BigNumber
}

export interface IDivestAmounts {
  baseAmount: BigNumber
  givenAmount: BigNumber[]
  positions: string[]
  receivedAmounts: BigNumber[]
}
