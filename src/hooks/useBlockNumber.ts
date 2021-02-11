import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from "@web3-react/core"

import useDebounce from "hooks/useDebounce"

export default function useBlockNumber() {
  const { library } = useWeb3React()
  const [blockNumber, setBlockNumber] = useState(null)
  const debounced = useDebounce(blockNumber, 100)

  const blockNumberCallback = useCallback(
    (b) => {
      setBlockNumber(b)
    },
    [setBlockNumber]
  )

  useEffect(() => {
    if (!library) return undefined

    library.getBlockNumber().then(blockNumberCallback)

    library.on("block", blockNumberCallback)

    return () => {
      if (library) {
        library.removeListener("block", blockNumberCallback)
      }
    }
  }, [library, blockNumberCallback])

  return debounced
}
