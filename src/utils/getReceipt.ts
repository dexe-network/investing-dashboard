import { delay } from "utils"

function getReceipt(library, hash, requestCount = 0): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (requestCount < 30) {
      try {
        const receipt = await library.waitForTransaction(hash)

        if (!receipt || !receipt.logs || !receipt.logs.length) {
          await delay(2000)
          const newReceipt = await getReceipt(hash, requestCount + 1)
          resolve(newReceipt)
        } else {
          resolve(receipt)
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      reject("Request limits overload")
    }
  })
}

export default getReceipt
