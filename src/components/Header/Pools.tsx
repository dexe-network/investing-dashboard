import { useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { useNavigate } from "react-router-dom"
import { CircleSpinner } from "react-spinners-kit"
import { createClient, Provider as GraphProvider } from "urql"

import Icon from "components/Icon"
import OwnedPoolsList from "modals/OwnedPoolsList"

import { useOwnedPools } from "state/pools/hooks"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import AddFund from "assets/icons/AddFund"

import { PortraitsPlus, Funds, FundWrapper } from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundItem = ({ pool }) => {
  const [{ poolMetadata }] = usePoolMetadata(pool.id, pool.descriptionURL)

  return (
    <FundWrapper>
      <Icon
        size={24}
        source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
        address={pool.id}
      />
    </FundWrapper>
  )
}

interface IPortaitsProps {}
const Pools = ({}: IPortaitsProps) => {
  const navigate = useNavigate()
  const { account } = useWeb3React()

  const [isModalOpen, setModal] = useState(false)
  const [pools, isPoolsLoading] = useOwnedPools(account?.toLocaleLowerCase())

  const createFund = () => {
    navigate("/create-fund")
  }

  if (isPoolsLoading) {
    return (
      <PortraitsPlus>
        <CircleSpinner color="#A4EBD4" size={16} loading />
      </PortraitsPlus>
    )
  }

  if (pools.length > 0) {
    return (
      <>
        <OwnedPoolsList
          pools={pools}
          isOpen={isModalOpen}
          toggle={() => setModal(false)}
        />
        <Funds onClick={() => setModal(true)}>
          {pools.slice(pools.length - 2).map((pool) => (
            <FundItem key={pool.id} pool={pool} />
          ))}
        </Funds>
      </>
    )
  }

  return (
    <Funds>
      <AddFund onClick={createFund} />
    </Funds>
  )
}

const PoolsWithProvider = () => {
  return (
    <GraphProvider value={poolsClient}>
      <Pools />
    </GraphProvider>
  )
}

export default PoolsWithProvider
