const BasicPool = `
  id
  baseToken
  name
  ticker
  creationTime
  descriptionURL
  maxLoss
  totalTrades
  totalClosedPositions
  averageTrades
  averagePositionTime
  priceHistory(orderBy: seconds, orderDirection: desc) {
    usdTVL
    baseTVL
    supply
    absPNL
    percPNL
    seconds
  }
  investors {
    id
  }
`

const BasicPoolQuery = `
  query ($address: String!) {
    basicPool(id: $address) {
      ${BasicPool}
    }
  }
`

const BasicPoolsQuery = `
  query {
    basicPools(first: 100 orderBy: creationTime) {
      ${BasicPool}
    }
  }
`

const BasicPoolsQueryByName = `
  query ($q: String!) {
    basicPools(where: {name: $q} first: 100 orderBy: creationTime) {
      ${BasicPool}
    }
  }
`

const BasicPoolsQueryByTicker = `
  query ($q: String!) {
    basicPools(where: { ticker_contains: $q } first: 100 orderBy: creationTime) {
      ${BasicPool}
    }
  }
`

const InvestPoolsQuery = `
  query InvestPool{
    investPools(first: 100 orderBy: creationTime) {
      ${BasicPool}
    }
  }
`

export {
  BasicPoolQuery,
  BasicPoolsQuery,
  BasicPoolsQueryByName,
  BasicPoolsQueryByTicker,
  InvestPoolsQuery,
}
