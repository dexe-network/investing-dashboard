import { FC } from "react"
import { createClient, Provider as GraphProvider } from "urql"
import { PulseSpinner } from "react-spinners-kit"

import useInvestorInvestProposals from "hooks/useInvestorInvestProposals"

import InvestProposalCard from "components/cards/proposal/Invest"
import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_INVEST_POOLS_API_URL || "",
})

interface IProps {
  activePools: string[]
  invested: boolean
}

const InvestmentInvestProposalsList: FC<IProps> = ({
  activePools,
  invested,
}) => {
  const data = useInvestorInvestProposals(activePools, invested)

  if (!data) {
    return (
      <S.Content>
        <PulseSpinner />
      </S.Content>
    )
  }

  if (data && data.length === 0) {
    return (
      <S.Content>
        <div style={{ color: "white", textAlign: "center" }}>
          No proposals yet
        </div>
      </S.Content>
    )
  }

  return (
    <>
      <S.List>
        {(data || []).map((p) => (
          <InvestProposalCard
            key={p.id}
            proposal={p}
            poolAddress={p.investPool.id}
            onInvest={() => console.log("onInvest")}
          />
        ))}
      </S.List>
    </>
  )
}

const InvestmentInvestProposalsListWithProvider = (props) => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestmentInvestProposalsList {...props} />
    </GraphProvider>
  )
}

export default InvestmentInvestProposalsListWithProvider
