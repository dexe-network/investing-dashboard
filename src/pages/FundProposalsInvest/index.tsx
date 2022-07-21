import { Routes, Route } from "react-router-dom"
import Proposals from "./Proposals"

const FundProposalsInvest = () => {
  return (
    <>
      <Routes>
        <Route path="open" element={<Proposals />}></Route>
      </Routes>
    </>
  )
}

export default FundProposalsInvest
