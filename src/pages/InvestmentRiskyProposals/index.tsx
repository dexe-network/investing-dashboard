import { useMemo, useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { PulseSpinner } from "react-spinners-kit"

import RouteTabs from "components/RouteTabs"
import RiskyProposalsList from "./ProposalsList"
import RiskyPositionsList from "./PositionsList"

import { ITab } from "constants/interfaces"
import { useActiveWeb3React } from "hooks"
import { useRiskyProposalContract } from "hooks/useContract"
import useInvestorProposalPools from "hooks/useInvestorProposalPools"

import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

// TODO: better components naming
const InvestmentRiskyProposals = () => {
  const { account } = useActiveWeb3React()

  const [activePoolId, setActivePoolId] = useState<any>(undefined)
  const [activePool, setActivePool] = useState<any>(undefined)

  const [proposals, setProposals] = useState<any[]>([])

  const preparedAccount = useMemo(() => {
    if (!account) return
    return String(account).toLowerCase()
  }, [account])

  const activePools = useInvestorProposalPools(preparedAccount, "BASIC_POOL")

  console.log("activePools", activePools)
  console.log("activePool", activePool)
  const [riskyProposalContract] = useRiskyProposalContract(activePool)

  useEffect(() => {
    if (activePools.length > 0) {
      setActivePoolId(0)
      setActivePool(activePools[0])
    }
  }, [activePools])

  useEffect(() => {
    console.log("useEffect -> riskyProposalContract", riskyProposalContract)
    if (!riskyProposalContract) {
      return
    }

    ;(async () => {
      const data = await riskyProposalContract.getProposalInfos(0, 100)
      console.log("data", data)
      setProposals([...proposals, ...data])

      const newIndex = activePoolId + 1
      if (!!activePools[newIndex]) {
        setActivePoolId(newIndex)
        setActivePool(activePools[newIndex])
      }
    })()
  }, [activePoolId, activePools, riskyProposalContract])

  console.log("proposals", proposals)

  const tabs: ITab[] = [
    {
      title: "Risk proposals",
      source: `/investment/risk-proposals/open`,
    },
    {
      title: "Risk positions",
      source: `/investment/risk-proposals/positions`,
    },
    {
      title: "Closed",
      source: `/investment/risk-proposals/closed`,
    },
  ]

  if (!activePools) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (activePools && activePools.lenght === 0) {
    return (
      <S.Content>
        <S.WithoutData>There are no risky proposals</S.WithoutData>
      </S.Content>
    )
  }

  return (
    <>
      <RouteTabs tabs={tabs} />
      <Routes>
        <Route
          path="open"
          element={<RiskyProposalsList activePools={activePools} />}
        ></Route>
        <Route
          path="positions"
          element={
            <RiskyPositionsList activePools={activePools} closed={false} />
          }
        ></Route>
        <Route
          path="closed"
          element={
            <RiskyPositionsList activePools={activePools} closed={true} />
          }
        ></Route>
      </Routes>
    </>
  )
}

const InvestmentPositionsWithProvider = () => (
  <GraphProvider value={poolsClient}>
    <InvestmentRiskyProposals />
  </GraphProvider>
)

export default InvestmentPositionsWithProvider
