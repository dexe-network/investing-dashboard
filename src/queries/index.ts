const BasicPoolQuery = `
  query {
    basicPools(first: 100 orderBy: creationTime) {
      id
      baseToken
      name
      ticker
      creationTime
      priceHistory {
        price
        supply
        poolBase
        seconds
        loss
      }
      investors {
        id
      }
    }
  }
`

const BasicPoolQueryByName = `
  query ($q: String!) {
    basicPools(where: {name: $q} first: 100 orderBy: creationTime) {
      id
      baseToken
      name
      ticker
      creationTime
      priceHistory {
        price
        supply
        poolBase
        seconds
        loss
      }
      investors {
        id
      }
    }
  }
`

const BasicPoolQueryByTicker = `
  query ($q: String!) {
    basicPools(where: { ticker_contains: $q } first: 100 orderBy: creationTime) {
      id
      baseToken
      name
      ticker
      creationTime
      priceHistory {
        price
        supply
        poolBase
        seconds
        loss
      }
      investors {
        id
      }
    }
  }
`

const InvestPoolQuery = `
  query InvestPool{
    investPools(first: 100 orderBy: creationTime) {
      id
      baseToken
      name
      ticker
      creationTime
      priceHistory {
        price
        supply
        poolBase
        seconds
        loss
      }
      investors {
        id
      }
    }
  }
`

export {
  BasicPoolQuery,
  BasicPoolQueryByName,
  BasicPoolQueryByTicker,
  InvestPoolQuery,
}
