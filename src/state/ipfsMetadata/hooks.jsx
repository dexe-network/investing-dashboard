import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import { parsePoolData, parseUserData } from "utils/ipfs"

import { selectPoolMetadata, selectUserMetadata } from "./selectors"
import { addPool, addUser } from "./actions"

export function usePoolMetadata(poolId, hash) {
  const dispatch = useDispatch()
  const poolMetadata = useSelector(selectPoolMetadata(poolId, hash))
  const [loading, setLoading] = useState(false)

  const fetchPoolMetadata = useCallback(async () => {
    try {
      setLoading(true)
      const data = await parsePoolData(hash)
      if (data) {
        dispatch(addPool({ params: { poolId, hash, ...data } }))
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [dispatch, hash, poolId])

  useEffect(() => {
    if (!poolId || !hash) return
    else if (poolMetadata === null) {
      fetchPoolMetadata()
    }
  }, [poolId, hash, poolMetadata, dispatch, fetchPoolMetadata])

  return [{ poolMetadata, loading }, { fetchPoolMetadata }]
}

export function useUserMetadata(hash) {
  const dispatch = useDispatch()
  const userMetadata = useSelector(selectUserMetadata(hash))
  const [loading, setLoading] = useState(false)

  const fetchUserMetadata = useCallback(async () => {
    try {
      setLoading(true)
      const data = await parseUserData(hash)
      if (data) {
        dispatch(addUser({ params: { ...data } }))
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [dispatch, hash])

  useEffect(() => {
    if (!poolId || !hash) return
    else if (userMetadata === null) {
      fetchUserMetadata()
    }
  }, [hash, userMetadata, dispatch, fetchUserMetadata])

  return [{ userMetadata, loading }, { fetchUserMetadata }]
}
