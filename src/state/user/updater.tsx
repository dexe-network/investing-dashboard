import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { useSelector, useDispatch } from "react-redux"
import useContract from "hooks/useContract"
import { ContractsState } from "state/contracts/reducer"
import { addOwnedPools } from "state/user/actions"
import { TraderPoolRegistry } from "abi"
import { AppState, AppDispatch } from "state"

export const UserPoolsUpdater: React.FC = () => {
  const { account } = useWeb3React()

  const dispatch = useDispatch<AppDispatch>()

  const traderPoolRegistryAddress = useSelector<
    AppState,
    ContractsState["TraderPoolRegistry"]
  >((state) => {
    return state.contracts.TraderPoolRegistry
  })

  const traderPoolRegistry = useContract(
    traderPoolRegistryAddress,
    TraderPoolRegistry
  )

  useEffect(() => {
    if (!traderPoolRegistry || !account) return
    ;(async () => {
      try {
        // get pool type names
        const basicPoolName = await traderPoolRegistry.BASIC_POOL_NAME()
        const investPoolName = await traderPoolRegistry.INVEST_POOL_NAME()

        // get user owned pools
        const traderBasicPools = await traderPoolRegistry.listTraderPools(
          account,
          basicPoolName,
          0,
          25
        )
        const traderInvestPools = await traderPoolRegistry.listTraderPools(
          account,
          investPoolName,
          0,
          25
        )
        dispatch(
          addOwnedPools({ basic: traderBasicPools, invest: traderInvestPools })
        )
      } catch (e) {
        // TODO: handle error
      }
    })()
  }, [traderPoolRegistry, account, dispatch])

  return null
}
