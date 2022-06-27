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

const BasicPositionsQuery = `
  query ($address: String!, $closed: Boolean!) {
    basicPool(id: $address) {
      baseToken
      descriptionURL
      ticker
      positions(first: 100, where: { closed: $closed }) {
        id
        positionToken
        closed
        exchanges {
          fromToken
          toToken
          fromVolume
          toVolume
          day {
            day
          }
        }
      }
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
  getPoolsQueryVariables,
}
