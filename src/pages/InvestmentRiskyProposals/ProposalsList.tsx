import { FC } from "react"
import { createClient, Provider as GraphProvider } from "urql"
import { PulseSpinner } from "react-spinners-kit"

import useInvestorRiskyProposals from "hooks/useInvestorRiskyProposals"

import RiskyProposalCard from "components/cards/proposal/Risky"
import S from "./styled"

const poolsClient = createClient({
  url: process.env.REACT_APP_BASIC_POOLS_API_URL || "",
})

interface IProps {
  activePools: string[]
}

const InvestmentRiskyProposalsList: FC<IProps> = ({ activePools }) => {
  const data = useInvestorRiskyProposals(activePools)

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
        <S.WithoutData>No proposal yet</S.WithoutData>
      </S.Content>
    )
  }

  return (
    <>
      <S.List>
        <S.WithoutData>proposals will be here soon</S.WithoutData>

        {/* {(data || []).map((p) => (
          <RiskyProposalCard
            key={p.id}
            proposal={p}
            onInvest={() => console.log("onInvest")}
          />
        ))} */}
      </S.List>
    </>
  )
}

const InvestmentRiskyProposalsListWithProvider = (props) => {
  return (
    <GraphProvider value={poolsClient}>
      <InvestmentRiskyProposalsList {...props} />
    </GraphProvider>
  )
}

export default InvestmentRiskyProposalsListWithProvider
