import { Routes, Route } from "react-router-dom"
import Header from "components/Header/Layout"
import Voting from "pages/Voting"

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
        </Routes>
      </Container>
    </>
  )
}

export default Insurance
