/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import useContract, { useERC20 } from "hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import { PriceFeed } from "abi"
import { AppDispatch, AppState } from "state"
import { useDispatch, useSelector } from "react-redux"
import { ContractsState } from "state/contracts/reducer"
import whitelist from "pages/NewFund/whitelisted"
import { updateWhitelist } from "./actions"

export const PriceFeedUpdater: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useWeb3React()

  const priceFeedAddress = useSelector<AppState, ContractsState["PriceFeed"]>(
    (state) => {
      return state.contracts.PriceFeed
    }
  )

  const priceFeed = useContract(priceFeedAddress, PriceFeed)

  useEffect(() => {
    if (!priceFeed) {
      return
    }

    // get whitelist tokens list
    ;(async () => {
      try {
        const total: number = await priceFeed.totalBaseTokens()
        const list: string[] = await priceFeed.getBaseTokens(0, total)
        dispatch(updateWhitelist({ params: whitelist[chainId || 0] }))
      } catch (e) {
        console.log(e)
      }
    })()
  }, [priceFeed])
  return null
}

export default {}
