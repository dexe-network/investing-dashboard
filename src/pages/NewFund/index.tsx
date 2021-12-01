import { useEffect } from "react"
import { Route, Switch, Redirect, useLocation } from "react-router-dom"

import { useSwipeable } from "react-swipeable"
import "modals/CreateFund/slider.css"
import { Container } from "./styled"
import {
  BasicInfo,
  SelectToken,
  AboutManagers,
  InvestmentsAndRestrictions,
  Fees,
  HeaderGroup,
  ButtonsGroup,
} from "./SubComponents"

export default function NewFund() {
  const location = useLocation()
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("left"),
    onSwipedDown: () => console.log("right"),
  })

  return (
    <Container {...handlers}>
      <HeaderGroup />
      <Switch location={location} key={location.pathname}>
        <Route path="/new-fund/basic-info">
          <BasicInfo />
        </Route>
        <Route path="/new-fund/select-token">
          <SelectToken />
        </Route>
        <Route path="/new-fund/about-managers">
          <AboutManagers />
        </Route>
        <Route path="/new-fund/restrictions">
          <InvestmentsAndRestrictions />
        </Route>
        <Route path="/new-fund/fees">
          <Fees />
        </Route>
        <Route path="/new-fund/summary">
          <BasicInfo />
        </Route>
        <Route exact path="/new-fund">
          <Redirect to="/new-fund/basic-info" />
        </Route>
      </Switch>

      <ButtonsGroup />
    </Container>
  )
}
