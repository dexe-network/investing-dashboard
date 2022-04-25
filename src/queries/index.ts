//-----------------------------------------------------------------------------
// # PRICE HISTORY
//-----------------------------------------------------------------------------

const PRICE_HISTORY = `
  usdTVL
  baseTVL
  supply
  absPNL
  percPNL
  seconds
`

const PRICE_HISTORY_LAST = `
  priceHistory(first: 1, orderBy: seconds, orderDirection: desc, where: { isLast: true }) {
    ${PRICE_HISTORY}
  }
`

const PRICE_HISTORY_FULL = `
  priceHistory(first: 1000, orderBy: seconds, orderDirection: desc) {
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
  creationTime
  descriptionURL
  maxLoss
  totalTrades
  totalClosedPositions
  averageTrades
  averagePositionTime
  investorsCount
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
    traderPools(where: { ticker_contains: $q } first: 100 orderBy: creationTime) {
      ${POOL}
    }
  }
`

export { PoolQuery, PoolsQuery, PriceHistoryQuery, OwnedPoolsQuery }
