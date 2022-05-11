import { Routes, Route } from "react-router-dom"
import Header from "components/Header/Layout"
import Voting from "pages/Voting"
import Management from "pages/Management"

import { Container } from "./styled"

const Insurance = () => {
  return (
    <>
      <Header
        tabs={[
          {
            title: "Voting",
            source: "/insurance/voting",
          },
          {
            title: "Management",
            source: "/insurance/management",
          },
          {
            title: "Proposals",
            source: "/insurance/proposals",
          },
        ]}
      >
        Insurance
      </Header>

      <Container>
        <Routes>
          <Route path="voting" element={<Voting />}></Route>
          <Route path="management" element={<Management />}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default Insurance
