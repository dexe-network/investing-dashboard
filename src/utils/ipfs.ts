import axios from "axios"
import { create } from "ipfs-http-client"
import { Buffer } from "buffer"

export interface AddResult {
  cid: any
  size: number
  path: string
  mode?: number
  mtime?: any
}

// @params assets - base64 string array. last item represents current avatar
interface FundMetadataAdder {
  (
    assets: string[],
    description: string,
    strategy: string,
    account: string
  ): Promise<AddResult>
}

const auth =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_IPFS_PROJECT_ID +
      ":" +
      process.env.REACT_APP_IPFS_PROJECT_SECRET
  ).toString("base64")

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
})

export const blobToBase64 = (blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      resolve(reader.result)
    }
  })
}

const stringify = (json) => {
  try {
    return JSON.stringify(json)
  } catch (e) {
    return ""
  }
}

export const parsePoolData = async (hash) => {
  try {
    if (!!hash && hash.length === 46) {
      const res = await axios.post(
        `https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}`
      )
      return res.data
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

export const parseUserData = async (hash) => {
  try {
    if (!!hash && hash.length === 46) {
      const res = await axios.post(
        `https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}`
      )
      return res.data
    }
    return false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const addFundMetadata: FundMetadataAdder = (
  assets,
  description,
  strategy,
  account
) => {
  const data = {
    timestamp: new Date().getTime() / 1000,
    account,
    description,
    strategy,
    assets,
  }
  const dataString = stringify(data)

  return client.add(dataString)
}

export const addInvestProposalMetadata = (ticker, description, account) => {
  const data = {
    timestamp: new Date().getTime() / 1000,
    account,
    description,
    ticker,
  }
  const dataString = stringify(data)

  return client.add(dataString)
}

export const addUserMetadata = (name, assets, account) => {
  const data = {
    timestamp: new Date().getTime() / 1000,
    account,
    name,
    assets,
  }
  const dataString = stringify(data)

  return client.add(dataString)
}
