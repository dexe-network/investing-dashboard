import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { usePoolContract } from "hooks/usePool"

import Icon from "components/Icon"
import { useMemo } from "react"
import { PoolInfo } from "constants/interfaces_v2"

const usePoolIcon = (
  poolAddress: string,
  size = 24
): [JSX.Element, PoolInfo | null] => {
  const [, poolInfo] = usePoolContract(poolAddress)

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )

  const icon = useMemo(() => {
    return (
      <Icon
        size={size}
        source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
        address={poolAddress}
      />
    )
  }, [poolAddress, poolMetadata, size])

  return [icon, poolInfo]
}

export default usePoolIcon
