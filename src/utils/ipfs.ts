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

const projectId = "22KLJOk3vVydhC8Uh0jr3SMEqxI"
const projectSecret = "bc66dc46a6d50e884dce16faa2a393ea"
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

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
    if (hash.length === 46) {
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
    if (hash.length === 46) {
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

export const addFundMetadata = (
  b64,
  description,
  strategy,
  account
): Promise<AddResult> => {
  const data = {
    timestamp: new Date().getTime() / 1000,
    account,
    description,
    strategy,
    assets: [b64],
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
