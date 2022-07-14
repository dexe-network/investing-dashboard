import { ITopMembersFilters } from "constants/interfaces"
import { PoolType } from "constants/interfaces_v2"
//-----------------------------------------------------------------------------
// # PRICE HISTORY
//-----------------------------------------------------------------------------

const PRICE_HISTORY = `
  usdTVL
  baseTVL
  supply
  absPNL
  percPNL
  timestamp
`

const PRICE_HISTORY_LAST = `
  priceHistory(first: 1, orderBy: timestamp, orderDirection: desc, where: { isLast: true }) {
    ${PRICE_HISTORY}
  }
`

const PRICE_HISTORY_FULL = `
  priceHistory(first: 1000, orderBy: timestamp, orderDirection: desc) {
    ${PRICE_HISTORY}
  }
`

const PriceHistoryQuery = `
  query ($address: String!) {
    traderPool(id: $address) {
      ${PRICE_HISTORY_FULL}
    }
  }
`

//-----------------------------------------------------------------------------
// # POOL
//-----------------------------------------------------------------------------

const POOL = `
  id
  baseToken
  name
  type
  ticker
  trader
  creationTime
  descriptionURL
  maxLoss
  totalTrades
  totalClosedPositions
  averageTrades
  averagePositionTime
  investorsCount
  admins
  privateInvestors {
    id
    insurance
    claimedAmount
    activePools
    allPools
  }
  ${PRICE_HISTORY_LAST}
`

const PoolQuery = `
  query ($address: String!) {
    traderPool(id: $address) {
      ${POOL}
    }
  }
`

const OwnedPoolsQuery = `
  query ($address: String!) {
    traderPools(orderBy: creationTime, first: 100, where: { trader: $address }) {
      ${POOL}
    }
  }
`

const PoolsQuery = `
  query ($q: String!) {
    traderPools(where: { ticker_contains_nocase: $q } first: 100) {
      ${POOL}
    }
  }
`

const PoolsQueryWithSort = `
  query ($q: String!, $orderBy: String!, $orderDirection: String!) {
    traderPools(where: { ticker_contains_nocase: $q } first: 100 orderBy: $orderBy orderDirection: $orderDirection) {
      ${POOL}
    }
  }
`

const PoolsQueryByType = `
  query ($q: String!, $type: String!) {
    traderPools(where: { ticker_contains_nocase: $q, type: $type } first: 100) {
      ${POOL}
    }
  }
`

const PoolsQueryByTypeWithSort = `
  query ($q: String!, $type: String!, $orderBy: String!, $orderDirection: String!) {
    traderPools(where: { ticker_contains_nocase: $q, type: $type } first: 100 orderBy: $orderBy orderDirection: $orderDirection) {
      ${POOL}
    }
  }
`

// Basic pool positions
const POSITION_EXCHANGE = `
  id
  fromToken
  toToken
  fromVolume
  toVolume
  usdVolume
  timestamp
  opening
`

const POSITION = `
  id
  closed
  positionToken
  totalUSDOpenVolume
  totalUSDCloseVolume
  totalBaseOpenVolume
  totalBaseCloseVolume
  totalPositionOpenVolume
  totalPositionCloseVolume
  exchanges {
    ${POSITION_EXCHANGE}
  }
  traderPool {
    trader
    ticker
    baseToken
    descriptionURL
  }
`

const BasicPositionsQuery = `
  query ($address: String!, $closed: Boolean!) {
    traderPool(id: $address) {
      positions(first: 100, where: { closed: $closed }) {
        ${POSITION}
      }
    }
  }
`

// Pool risky proposals
const RISKY_PROPOSAL_EXCHANGE = `
  id
  timestamp
  fromToken
  toToken
  fromVolume
  toVolume
  usdVolume
`
const RISKY_PROPOSAL_POSITION = `
  id
  isClosed
  totalBaseOpenVolume
  totalBaseCloseVolume
  totalPositionOpenVolume
  totalPositionCloseVolume
  totalUSDOpenVolume
  totalUSDCloseVolume
`
const RISKY_PROPOSAL = `
  id
  token
  basicPool {
    id
    baseToken
  }
  positions(first: 100, where: {isClosed: $closed}) {
    ${RISKY_PROPOSAL_POSITION}
  }
`

const RiskyProposalsQuery = `
  query ($address: String!, $closed: Boolean!) {
    basicPool(id: $address) {
      proposals(first: 100) {
        ${RISKY_PROPOSAL}
      }
    }
  }
`

const RiskyProposalExchangesQuery = `
  query ($address: String!) {
    proposalExchangeHistories(where: {proposal_: {basicPool: $address}}) {
      exchanges(first: 100) {
        ${RISKY_PROPOSAL_EXCHANGE}
      }
    }
  }
`

// Pool invnest proposals

// lastSupply {
//   id
//   timestamp
//   dividendsTokens
//   amountDividendsTokens
// }
// lastWithdraw {
//   id
//   timestamp
//   amountBase
// }

// TODO: Add lastSupply and lastWithdraw fields (declared above)
const INVEST_PROPOSAL = `
  id
  timestampLimit
  investLPLimit
  leftTokens
  leftAmounts
  totalUSDSupply
  firstSupplyTimestamp
  APR
  investPool {
    id
  }
`

const InvestProposalsQuery = `
  query ($address: String!) {
    investPool(id: $address) {
      id
      baseToken
      proposals(first: 100) {
        ${INVEST_PROPOSAL}
      }
    }
  }
`

// Investor positions
const INVESTOR_POSITION_VEST = `
  id
  isInvest
  timestamp
  volumeBase
  volumeLP
  volumeUSD
`

const InvestorPositionsQuery = `
  query ($address: String!, $closed: Boolean!) {
    investorPoolPositions(where: {investor: $address, isClosed: $closed}) {
      id
      isClosed
      totalBaseInvestVolume
      totalBaseDivestVolume
      totalLPInvestVolume
      totalLPDivestVolume
      totalUSDInvestVolume
      totalUSDDivestVolume
      pool {
        id
        type
        token
      }
      vest(first: 100) {
        ${INVESTOR_POSITION_VEST}
      }
    }
  }
`

// Investor proposals
const InvestorPoolsInvestedForQuery = `
  query ($address: String!, $poolType: String!) {
    investors(where: { id: $address, allPools_: { type: $poolType }}) {
      activePools { id }
    }
  }
`

const InvestorRiskyProposalsQuery = `
  query ($poolAddressList: [String]!) {
    proposals(where: { basicPool_in: $poolAddressList }){
      id
      token
      timestampLimit
      investLPLimit
      maxTokenPriceLimit
      basicPool {
        id
        baseToken
      }
    }
  }
`

const INVESTOR_RISKY_POSITION = `
  id
  isClosed
  totalBaseOpenVolume
  totalBaseCloseVolume
  totalPositionOpenVolume
  totalPositionCloseVolume
  totalUSDOpenVolume
  totalUSDCloseVolume
`
const InvestorRiskyPositionsQuery = `
  query ($poolAddressList: [String]!, $closed: Boolean!) {
    proposals(where: { basicPool_in: $poolAddressList }){
      id
      token
      basicPool {
        id
        baseToken
      }
      positions(where: { isClosed: $closed }) {
        ${INVESTOR_RISKY_POSITION}
      }
    }
  }
`

// lastSupply(first: 100) {
//   id
//   timestamp
//   dividendsTokens
//   amountDividendsTokens
// }
// lastWithdraw(first: 100) {
//   id
//   timestamp
//   amountBase
// }

const INVESTOR_INVEST_PROPOSAL = `
  id
  timestampLimit
  investLPLimit
  leftTokens
  leftAmounts
  totalUSDSupply
  firstSupplyTimestamp
  APR
  
  investPool {
    id
    baseToken
  }
`
const InvestorInvestProposalsQuery = `
  query ($poolAddressList: [String]!) {
    proposals(where: { investPool_in: $poolAddressList }){
      ${INVESTOR_INVEST_PROPOSAL}
    }
  }
`
const InvestorNewInvestProposalsQuery = `
  query ($poolAddressList: [String]!) {
    proposals(where: { investPool_not_in: $poolAddressList }){
      ${INVESTOR_INVEST_PROPOSAL}
    }
  }
`

const getPoolsQueryVariables = (
  isAllPools: boolean,
  filters: ITopMembersFilters,
  poolType: PoolType
) => {
  const isSorting = filters.sort.direction !== ""

  if (!isAllPools && !isSorting) {
    return {
      query: PoolsQueryByType,
      variables: { q: filters.query, type: poolType },
    }
  }

  if (isAllPools && isSorting) {
    return {
      query: PoolsQueryWithSort,
      variables: {
        q: filters.query,
        orderBy: filters.sort.key,
        orderDirection: filters.sort.direction,
      },
    }
  }

  if (!isAllPools && isSorting) {
    return {
      query: PoolsQueryByTypeWithSort,
      variables: {
        q: filters.query,
        type: poolType,
        orderBy: filters.sort.key,
        orderDirection: filters.sort.direction,
      },
    }
  }

  return {
    query: PoolsQuery,
    variables: { q: filters.query },
  }
}

export {
  PoolQuery,
  PoolsQuery,
  PoolsQueryByType,
  PriceHistoryQuery,
  OwnedPoolsQuery,
  BasicPositionsQuery,
  PoolsQueryWithSort,
  PoolsQueryByTypeWithSort,
  RiskyProposalsQuery,
  InvestProposalsQuery,
  InvestorPositionsQuery,
  InvestorPoolsInvestedForQuery,
  InvestorRiskyProposalsQuery,
  InvestorRiskyPositionsQuery,
  InvestorInvestProposalsQuery,
  InvestorNewInvestProposalsQuery,
  RiskyProposalExchangesQuery,
  getPoolsQueryVariables,
}
