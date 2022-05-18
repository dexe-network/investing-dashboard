import { Routes, Route } from "react-router-dom"

import { Flex } from "theme"
import { EHeaderTitles } from "components/Header"
import Header from "components/Header/Layout"
import { Container } from "./styled"

import FundDetailsEdit from "pages/FundDetailsEdit"

import { ITab } from "constants/interfaces"

const FundDetails = () => {
  const tabs: ITab[] = [
    {
      title: `Fund details`,
      source: "/fund-details/:poolAddress/edit/",
    },
    {
      title: `Performance Fee `,
      source: "/fund-details/:poolAddress/fee/",
    },
  ]

  return (
    <>
      <Header tabs={tabs}>
        <Flex>{EHeaderTitles.myFund}</Flex>
      </Header>
      <Container>
        <Routes>
          <Route path="edit" element={<FundDetailsEdit />}></Route>
          <Route path="fee" element={<FundDetailsEdit />}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default FundDetails
