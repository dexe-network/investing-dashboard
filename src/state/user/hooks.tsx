import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../index"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import { IFund, IUserData } from "constants/interfaces"
import { updateUserProMode, addOwnedPools, addUserData } from "../user/actions"

export function useUserProMode(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()

  const userSlippageTolerance = useSelector<
    AppState,
    AppState["user"]["userProMode"]
  >((state) => {
    return state.user.userProMode
  })

  const setUserProMode = useCallback(() => {
    dispatch(updateUserProMode())
  }, [dispatch])

  return [userSlippageTolerance, setUserProMode]
}

export function OwnedPoolsUpdater(): null {
  const dispatch = useDispatch<AppDispatch>()

  const { account } = useWeb3React()

  useEffect(() => {
    if (!account || !account.length) return

    const getPoolsByAddress = async () => {
      const {
        data: { data },
      } = await axios.get<null, { data: { data: IFund[] } }>(
        `${process.env.REACT_APP_STATS_API_URL}/pools/${account}`
      )
      dispatch(addOwnedPools({ data }))
    }

    getPoolsByAddress()
  }, [account, dispatch])

  return null
}

export function UserDataUpdater(): null {
  const dispatch = useDispatch<AppDispatch>()

  const { account } = useWeb3React()

  useEffect(() => {
    if (!account || !account.length) return

    const getUserData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get<null, { data: { data: IUserData } }>(
          `${process.env.REACT_APP_STATS_API_URL}/user/${account}`
        )
        // console.log(data)
        dispatch(addUserData({ data }))
      } catch (err) {
        dispatch(addUserData({ data: false }))
      }
    }

    getUserData()
  }, [account, dispatch])

  return null
}

// selectors

export function useSelectOwnedPools(): IFund[] | null {
  const ownedFunds = useSelector<AppState, AppState["user"]["ownedPools"]>(
    (state) => {
      return state.user.ownedPools
    }
  )

  return ownedFunds
}

export function useSelectUserData(): IUserData | null | false {
  return useSelector<AppState, AppState["user"]["data"]>((state) => {
    return state.user.data
  })
}
