import { Routes, Route } from "react-router-dom"
import Proposals from "./Proposals"
import S from "./styled"

const FundProposalsInvest = () => {
  return (
    <>
      <S.Content>
        <Routes>
          <Route path="open" element={<Proposals />}></Route>
        </Routes>
      </S.Content>
    </>
  )
}

export default FundProposalsInvest
