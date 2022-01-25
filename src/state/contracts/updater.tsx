/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import useContract from "hooks/useContract"
import { ContractsRegistry } from "abi"
import { AppDispatch } from "state"
import { useDispatch } from "react-redux"
import { updateContracts } from "./actions"

const contractAddressGetters = [
  "getTraderPoolFactoryContract",
  "getTraderPoolRegistryContract",
  "getDEXEContract",
  "getUSDContract",
  "getPriceFeedContract",
  "getUniswapV2RouterContract",
  "getUniswapV2FactoryContract",
  "getInsuranceContract",
  "getTreasuryContract",
  "getDividendsContract",
  "getCorePropertiesContract",
]

export const ContractsRegistryUpdater: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const contractsRegistry = useContract(
    process.env.REACT_APP_CONTRACTS_REGISTRY_ADDRESS,
    ContractsRegistry
  )

  useEffect(() => {
    if (!contractsRegistry) {
      return
    }

    // get all contracts addresses related to dexe
    try {
      ;(async () => {
        const result = await Promise.all(
          contractAddressGetters.map((funcName) =>
            contractsRegistry[funcName]()
          )
        )
        // TODO: save to redux
        dispatch(
          updateContracts({
            params: result.reduce(
              (arr: string[], v: string, i: number) => ({
                ...arr,
                [contractAddressGetters[i].slice(3, -8)]: v.toLowerCase(),
              }),
              {}
            ),
          })
        )
      })()
    } catch (e) {
      console.log(e)
    }
  }, [contractsRegistry])
  return null
}

export default {}
